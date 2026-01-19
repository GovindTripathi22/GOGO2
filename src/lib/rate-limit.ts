/**
 * Rate Limiter
 * IP-based rate limiting with per-route config and abuse blocking
 */

import { LRUCache } from 'lru-cache';

// ============================================================================
// Configuration
// ============================================================================

interface RateLimitConfig {
    limit: number;      // Max requests
    windowMs: number;   // Time window in ms
}

const routeConfigs: Record<string, RateLimitConfig> = {
    '/api/leads': { limit: 5, windowMs: 60 * 1000 },    // 5 per minute
    '/api': { limit: 30, windowMs: 60 * 1000 },         // 30 per minute
};

const ABUSE_THRESHOLD = 100;      // Failures before ban
const ABUSE_WINDOW_MS = 60 * 60 * 1000;  // 1 hour
const BAN_DURATION_MS = 60 * 60 * 1000;  // 1 hour ban

// ============================================================================
// Caches
// ============================================================================

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

interface AbuseEntry {
    failures: number;
    bannedUntil: number | null;
}

const rateLimitCache = new LRUCache<string, RateLimitEntry>({
    max: 10000,
    ttl: 60 * 60 * 1000, // 1 hour
});

const abuseCache = new LRUCache<string, AbuseEntry>({
    max: 5000,
    ttl: 2 * 60 * 60 * 1000, // 2 hours
});

// ============================================================================
// Rate Limiter Functions
// ============================================================================

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetIn: number;
    banned: boolean;
}

/**
 * Check if request is allowed
 */
export function checkRateLimit(ip: string, route: string): RateLimitResult {
    // Check if IP is banned
    const abuseEntry = abuseCache.get(ip);
    if (abuseEntry?.bannedUntil && Date.now() < abuseEntry.bannedUntil) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: abuseEntry.bannedUntil - Date.now(),
            banned: true,
        };
    }

    // Get config for route
    const config = getRouteConfig(route);
    const key = `${ip}:${route}`;
    const now = Date.now();

    // Get or create entry
    let entry = rateLimitCache.get(key);
    if (!entry || now >= entry.resetTime) {
        entry = {
            count: 0,
            resetTime: now + config.windowMs,
        };
    }

    // Check limit
    const allowed = entry.count < config.limit;

    if (allowed) {
        entry.count++;
        rateLimitCache.set(key, entry);
    } else {
        // Track abuse
        recordFailure(ip);
    }

    return {
        allowed,
        remaining: Math.max(0, config.limit - entry.count),
        resetIn: entry.resetTime - now,
        banned: false,
    };
}

/**
 * Record rate limit failure for abuse tracking
 */
function recordFailure(ip: string): void {
    const entry = abuseCache.get(ip) || { failures: 0, bannedUntil: null };
    entry.failures++;

    if (entry.failures >= ABUSE_THRESHOLD) {
        entry.bannedUntil = Date.now() + BAN_DURATION_MS;
        console.warn(`[RateLimit] IP ${ip} banned for abuse`);
    }

    abuseCache.set(ip, entry);
}

/**
 * Get rate limit config for route
 */
function getRouteConfig(route: string): RateLimitConfig {
    // Check for exact match
    if (routeConfigs[route]) {
        return routeConfigs[route];
    }

    // Check for prefix match
    for (const [prefix, config] of Object.entries(routeConfigs)) {
        if (route.startsWith(prefix)) {
            return config;
        }
    }

    // Default: 60 per minute
    return { limit: 60, windowMs: 60 * 1000 };
}

// ============================================================================
// Middleware Helper
// ============================================================================

export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
    return {
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(result.resetIn / 1000)),
    };
}
