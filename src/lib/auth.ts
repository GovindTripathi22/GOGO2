/**
 * Secure Authentication Library
 * Password Authentication with Bcrypt
 * No third-party auth providers required
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'gogo-secret-key-change-this';
const SESSION_EXPIRY_HOURS = 24;

// Simple in-memory rate limiting (for single instance deployment)
// For distributed, use Redis
const rateLimits = new Map<string, { count: number; lastAttempt: number }>();
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 mins
const MAX_ATTEMPTS = 5;

export interface UserSession {
    email: string;
    role: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * Rate Limiting Check
 */
export function checkRateLimit(email: string): boolean {
    const now = Date.now();
    const record = rateLimits.get(email);

    if (!record) {
        return true;
    }

    if (now - record.lastAttempt > BLOCK_DURATION_MS) {
        // Reset after timeout
        rateLimits.delete(email);
        return true;
    }

    if (record.count >= MAX_ATTEMPTS) {
        return false;
    }

    return true;
}

/**
 * Clear Rate Limit (on success)
 */
export function clearRateLimit(email: string) {
    rateLimits.delete(email);
}

/**
 * Login with email and password
 */
export async function loginWithPassword(email: string, password: string): Promise<{ sessionToken: string; user: { email: string; role: string } } | null> {
    // 0. Update Rate Limit Counter
    const now = Date.now();
    const record = rateLimits.get(email) || { count: 0, lastAttempt: now };
    record.count += 1;
    record.lastAttempt = now;
    rateLimits.set(email, record);

    // 1. Check if user exists
    const userResult = await query(
        `SELECT id, email, password_hash, role FROM admin_users WHERE email = $1`,
        [email.toLowerCase()]
    );

    if (userResult.rows.length === 0) {
        await logAudit(email, 'LOGIN_FAILED', { reason: 'user_not_found', method: 'password' });
        return null;
    }

    const user = userResult.rows[0];

    // 2. Verify Password
    if (!user.password_hash) {
        await logAudit(email, 'LOGIN_FAILED', { reason: 'password_not_set', method: 'password' });
        return null;
    }

    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
        await logAudit(email, 'LOGIN_FAILED', { reason: 'invalid_password', method: 'password' });
        return null;
    }

    // 3. Create Session Token
    const sessionToken = jwt.sign(
        { email: user.email, role: user.role, type: 'admin_session' },
        JWT_SECRET,
        { expiresIn: `${SESSION_EXPIRY_HOURS}h` }
    );

    await logAudit(email, 'LOGIN_SUCCESS', { method: 'password' });
    return { sessionToken, user: { email: user.email, role: user.role } };
}

/**
 * Verify a session token from cookies
 */
export async function verifySession(token: string): Promise<UserSession | null> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (decoded.type !== 'admin_session') return null;

        // Optional: Check if user still exists / hasn't been banned
        const userResult = await query(`SELECT email, role FROM admin_users WHERE email = $1`, [decoded.email]);
        if (userResult.rows.length === 0) return null;

        return { email: decoded.email, role: decoded.role || 'admin' };
    } catch (error) {
        return null;
    }
}

/**
 * Helper to get admin email from request cookies
 */
export async function getAdminFromRequest(cookieStore: any): Promise<string | null> {
    const sessionCookie = cookieStore.get('admin_session');
    if (!sessionCookie?.value) return null;

    // verifySession is already async
    const session = await verifySession(sessionCookie.value);
    return session ? session.email : null;
}

/**
 * Log audit events to database
 */
export async function logAudit(
    userEmail: string,
    action: 'LOGIN_ATTEMPT' | 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGOUT' | 'ACCESS_DENIED' | 'CREATE_PAGE' | 'UPDATE_PAGE' | 'DELETE_PAGE' | 'PUBLISH_PAGE' | 'UPDATE_SEO' | 'UPDATE_SETTINGS',
    details?: Record<string, unknown>,
    ipAddress?: string
): Promise<void> {
    try {
        await query(
            `INSERT INTO audit_logs (user_email, action, details, ip_address) VALUES ($1, $2, $3, $4)`,
            [userEmail, action, JSON.stringify(details || {}), ipAddress || null]
        );
    } catch (err) {
        console.error('Failed to log audit:', err);
    }
}
