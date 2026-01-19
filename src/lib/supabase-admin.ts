/**
 * Supabase Admin Client
 * Server-side only — uses service role key for admin operations
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment validation
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Types for CMS tables
export interface Page {
    id: string;
    slug: string;
    page_type: string;
    fr_required: boolean;
    created_at: string;
    updated_at: string;
}

export interface PageTranslation {
    id: string;
    page_id: string;
    locale: 'en' | 'fr';
    title: string | null;
    body: Record<string, unknown> | null;
    seo_title: string | null;
    seo_description: string | null;
    version: number;
    is_published: boolean;
    published_at: string | null;
    scheduled_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface FAQ {
    id: string;
    category: string;
    sort_order: number;
    is_active: boolean;
}

export interface FAQTranslation {
    id: string;
    faq_id: string;
    locale: 'en' | 'fr';
    question: string;
    answer: string;
    is_published: boolean;
}

export interface BlogPost {
    id: string;
    slug: string;
    author: string | null;
    featured_image_url: string | null;
    tags: string[];
    published_date: string | null;
}

export interface BlogTranslation {
    id: string;
    post_id: string;
    locale: 'en' | 'fr';
    title: string;
    body: string | null;
    excerpt: string | null;
    seo_title: string | null;
    seo_description: string | null;
    is_published: boolean;
}

export interface MediaMeta {
    id: string;
    key: string;
    url: string | null;
    cdn_url: string | null;
    is_enabled: boolean;
    caption_en: string | null;
    caption_fr: string | null;
}

export interface ContentAudit {
    id: string;
    user_email: string | null;
    action: string;
    item_type: string | null;
    item_id: string | null;
    before_state: Record<string, unknown> | null;
    after_state: Record<string, unknown> | null;
    created_at: string;
}

export interface AdminSession {
    id: string;
    email: string;
    token_hash: string;
    expires_at: string;
    created_at: string;
}

export interface ContentHistory {
    id: string;
    translation_id: string;
    version: number;
    body: Record<string, unknown> | null;
    title: string | null;
    changed_by: string | null;
    change_reason: string | null;
    created_at: string;
}

export interface Lead {
    id: string;
    idempotency_key: string | null;
    company_name: string | null;
    fleet_size: string | null;
    fuel_type: string | null;
    email: string;
    phone: string | null;
    source: string;
    status: string;
    notes: string | null;
    ip_address: string | null;
    created_at: string;
    updated_at: string;
}

// Database type definitions
export interface Database {
    public: {
        Tables: {
            pages: { Row: Page; Insert: Omit<Page, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Page> };
            page_translations: { Row: PageTranslation; Insert: Omit<PageTranslation, 'id' | 'created_at' | 'updated_at'>; Update: Partial<PageTranslation> };
            faqs: { Row: FAQ; Insert: Omit<FAQ, 'id'>; Update: Partial<FAQ> };
            faq_translations: { Row: FAQTranslation; Insert: Omit<FAQTranslation, 'id'>; Update: Partial<FAQTranslation> };
            blog_posts: { Row: BlogPost; Insert: Omit<BlogPost, 'id'>; Update: Partial<BlogPost> };
            blog_translations: { Row: BlogTranslation; Insert: Omit<BlogTranslation, 'id'>; Update: Partial<BlogTranslation> };
            media_meta: { Row: MediaMeta; Insert: Omit<MediaMeta, 'id'>; Update: Partial<MediaMeta> };
            content_audit: { Row: ContentAudit; Insert: Omit<ContentAudit, 'id' | 'created_at'>; Update: never };
            admin_sessions: { Row: AdminSession; Insert: Omit<AdminSession, 'id' | 'created_at'>; Update: Partial<AdminSession> };
            content_history: { Row: ContentHistory; Insert: Omit<ContentHistory, 'id' | 'created_at'>; Update: never };
            leads: { Row: Lead; Insert: Omit<Lead, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Lead> };
        };
    };
}

/**
 * Get Supabase admin client (service role key — server-side only)
 * Use for admin operations: create, update, delete
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAdminClient(): SupabaseClient<any> | null {
    if (!supabaseUrl || !supabaseServiceKey) {
        console.warn('[Supabase] Missing admin credentials');
        return null;
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

/**
 * Get Supabase public client (anon key — safe for client-side)
 * Use for read-only operations: fetch published content
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPublicClient(): SupabaseClient<any> | null {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('[Supabase] Missing public credentials');
        return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Log audit entry for CMS actions
 */
export async function logAudit(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: SupabaseClient<any>,
    entry: {
        user_email?: string;
        action: string;
        item_type?: string;
        item_id?: string;
        before_state?: Record<string, unknown>;
        after_state?: Record<string, unknown>;
        ip_address?: string;
        user_agent?: string;
    }
): Promise<void> {
    try {
        await client.from('content_audit').insert({
            user_email: entry.user_email || null,
            action: entry.action,
            item_type: entry.item_type || null,
            item_id: entry.item_id || null,
            before_state: entry.before_state || null,
            after_state: entry.after_state || null,
        });
    } catch (error) {
        console.error('[Audit] Failed to log:', error);
    }
}

/**
 * Check if CMS is available (has valid credentials)
 */
export function isCMSAvailable(): boolean {
    return Boolean(supabaseUrl && (supabaseServiceKey || supabaseAnonKey));
}
