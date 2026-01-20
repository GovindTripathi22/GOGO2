/**
 * CMS Database Helpers
 * Server-side functions for fetching and managing CMS content
 * Refactored to use generic Postgres client (AWS RDS)
 */

import { query } from '@/lib/db';
import { dictionary } from '@/data/translations';

// ============================================================================
// Types
// ============================================================================

export interface CMSPage {
    slug: string;
    locale: 'en' | 'fr';
    title: string;
    body: Record<string, unknown>;
    seo_title?: string;
    seo_description?: string;
    is_published: boolean;
    fr_required: boolean;
}

export interface CMSFAQ {
    id: string;
    category: string;
    question: string;
    answer: string;
    sort_order: number;
}

export interface CMSBlogPost {
    slug: string;
    title: string;
    body: string;
    excerpt?: string;
    author?: string;
    featured_image_url?: string;
    tags: string[];
    published_date?: string;
    seo_title?: string;
    seo_description?: string;
}

// ============================================================================
// Page Content
// ============================================================================

export async function getPage(slug: string, locale: 'en' | 'fr'): Promise<CMSPage | null> {
    try {
        const sql = `
            SELECT p.slug, p.fr_required, pt.locale, pt.title, pt.body, pt.seo_title, pt.seo_description, pt.is_published
            FROM pages p
            JOIN page_translations pt ON p.id = pt.page_id
            WHERE p.slug = $1 AND pt.locale = $2 AND pt.is_published = true
        `;
        const res = await query(sql, [slug, locale]);

        if (res.rows.length === 0) return null;
        const row = res.rows[0];

        return {
            slug: row.slug,
            locale: row.locale,
            title: row.title,
            body: row.body || {},
            seo_title: row.seo_title,
            seo_description: row.seo_description,
            is_published: row.is_published,
            fr_required: row.fr_required,
        };
    } catch (error) {
        console.error('[CMS] Failed to fetch page:', error);
        return null;
    }
}

export async function isFrenchPublished(slug: string): Promise<boolean> {
    try {
        const sql = `
            SELECT 1
            FROM pages p
            JOIN page_translations pt ON p.id = pt.page_id
            WHERE p.slug = $1 AND pt.locale = 'fr' AND pt.is_published = true
        `;
        const res = await query(sql, [slug]);
        return res.rows.length > 0;
    } catch {
        return false;
    }
}

// ============================================================================
// FAQs
// ============================================================================

export async function getFAQs(category: string | null, locale: 'en' | 'fr'): Promise<CMSFAQ[]> {
    try {
        let sql = `
            SELECT f.id, f.category, f.sort_order, ft.question, ft.answer
            FROM faqs f
            JOIN faq_translations ft ON f.id = ft.faq_id
            WHERE f.is_active = true AND ft.locale = $1 AND ft.is_published = true
        `;
        const params: (string | null)[] = [locale];

        if (category) {
            sql += ` AND f.category = $2`;
            params.push(category);
        }

        sql += ` ORDER BY f.sort_order ASC`;

        const res = await query(sql, params);

        if (res.rows.length === 0 && !process.env.DATABASE_URL) {
            // Fallback if DB not configured
            const fallback = dictionary[locale].faq.items;
            return fallback.map((item, index) => ({
                id: `local-${index}`,
                category: 'general',
                question: item.q,
                answer: item.a,
                sort_order: index,
            }));
        }

        return res.rows.map(row => ({
            id: row.id,
            category: row.category,
            question: row.question,
            answer: row.answer,
            sort_order: row.sort_order,
        }));
    } catch (error) {
        console.error('[CMS] Failed to fetch FAQs:', error);
        return [];
    }
}

export async function searchFAQs(searchQuery: string, locale: 'en' | 'fr'): Promise<CMSFAQ[]> {
    if (!searchQuery.trim()) return [];
    try {
        // Simple LIKE search for compatibility, full-text search syntax differs by DB version but websearch_to_tsquery is standard in modern PG
        const sql = `
            SELECT f.id, f.category, f.sort_order, ft.question, ft.answer
            FROM faqs f
            JOIN faq_translations ft ON f.id = ft.faq_id
            WHERE f.is_active = true 
            AND ft.locale = $1 
            AND ft.is_published = true
            AND (ft.question ILIKE $2 OR ft.answer ILIKE $2)
            LIMIT 10
        `;
        const res = await query(sql, [locale, `%${searchQuery}%`]);

        return res.rows.map(row => ({
            id: row.id,
            category: row.category,
            question: row.question,
            answer: row.answer,
            sort_order: row.sort_order,
        }));
    } catch (error) {
        console.error('[CMS] FAQ search error:', error);
        return [];
    }
}

// ============================================================================
// Blog Posts
// ============================================================================

export async function getBlogPosts(locale: 'en' | 'fr'): Promise<CMSBlogPost[]> {
    try {
        const sql = `
            SELECT bp.slug, bp.author, bp.featured_image_url, bp.tags, bp.published_date,
                   bt.title, bt.body, bt.excerpt, bt.seo_title, bt.seo_description
            FROM blog_posts bp
            JOIN blog_translations bt ON bp.slug = bt.post_slug
            WHERE bt.locale = $1 AND bt.is_published = true
            ORDER BY bp.published_date DESC
        `;
        const res = await query(sql, [locale]);

        return res.rows.map(row => ({
            slug: row.slug,
            title: row.title,
            body: row.body,
            excerpt: row.excerpt,
            author: row.author,
            featured_image_url: row.featured_image_url,
            tags: row.tags || [],
            published_date: row.published_date,
            seo_title: row.seo_title,
            seo_description: row.seo_description,
        }));
    } catch (error) {
        console.error('[CMS] Failed to fetch blog posts:', error);
        return [];
    }
}

export async function getBlogPostBySlug(slug: string, locale: 'en' | 'fr'): Promise<CMSBlogPost | null> {
    try {
        const sql = `
            SELECT bp.slug, bp.author, bp.featured_image_url, bp.tags, bp.published_date,
                   bt.title, bt.body, bt.excerpt, bt.seo_title, bt.seo_description
            FROM blog_posts bp
            JOIN blog_translations bt ON bp.slug = bt.post_slug
            WHERE bp.slug = $1 AND bt.locale = $2 AND bt.is_published = true
        `;
        const res = await query(sql, [slug, locale]);

        if (res.rows.length === 0) return null;
        const row = res.rows[0];

        return {
            slug: row.slug,
            title: row.title,
            body: row.body,
            excerpt: row.excerpt,
            author: row.author,
            featured_image_url: row.featured_image_url,
            tags: row.tags || [],
            published_date: row.published_date,
            seo_title: row.seo_title,
            seo_description: row.seo_description,
        };
    } catch (error) {
        console.error('[CMS] Failed to fetch blog post:', error);
        return null;
    }
}

// ============================================================================
// Media & Audit (Stubbed/Simplified)
// ============================================================================

export async function isHeroVideoEnabled(): Promise<boolean> {
    try {
        const res = await query("SELECT is_enabled FROM media_meta WHERE key = 'hero_video'");
        return res.rows.length > 0 ? res.rows[0].is_enabled : false;
    } catch {
        return false;
    }
}

export async function publishTranslation(translationId: string, _userEmail: string): Promise<boolean> {
    try {
        await query(
            `UPDATE page_translations SET is_published = true, published_at = NOW() WHERE id = $1`,
            [translationId]
        );
        // Audit log logic could go here, using _userEmail
        return true;
    } catch (error) {
        console.error('[CMS] Publish failed:', error);
        return false;
    }
}

export const CMS_REVALIDATE = 60;
