/**
 * Contentful CMS Client
 * Provides typed fetch functions for all content types
 */

import { createClient } from 'contentful';
import { dictionary } from '@/data/translations';

// Environment validation
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
const isPreview = process.env.CONTENTFUL_PREVIEW_MODE === 'true';

// Create client only if credentials are available
const client = spaceId && accessToken
    ? createClient({
        space: spaceId,
        accessToken: isPreview && previewToken ? previewToken : accessToken,
        host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
    })
    : null;

// ============================================================================
// Exported Types
// ============================================================================

export interface FAQ {
    question: string;
    answer: string;
    order: number;
}

export interface Partner {
    name: string;
    logoUrl: string;
    websiteUrl?: string;
}

export interface BlogPost {
    title: string;
    slug: string;
    body: string;
    seoTitle?: string;
    seoDescription?: string;
    featuredImageUrl?: string;
    publishedDate: string;
    author?: string;
    tags: string[];
}

export interface PageContent {
    title: string;
    slug: string;
    content: string; // Generic JSON or Rich Text
}

export interface SEOData {
    title: string;
    description: string;
    openGraphImage?: string;
}

// Translation union type
type TranslationType = typeof dictionary.en | typeof dictionary.fr;

// ============================================================================
// Fetch Functions
// ============================================================================

/**
 * Fetch translations from CMS, with fallback to local dictionary
 */
export async function getTranslations(locale: 'en' | 'fr'): Promise<TranslationType> {
    if (!client) {
        return dictionary[locale];
    }

    try {
        const entries = await client.getEntries({
            content_type: 'translation',
            limit: 500,
        });

        if (entries.items.length === 0) {
            return dictionary[locale];
        }

        const translations: Record<string, string> = {};
        entries.items.forEach((entry) => {
            const fields = entry.fields as { key: string; en: string; fr: string };
            translations[fields.key] = locale === 'en' ? fields.en : fields.fr;
        });

        return deepMerge(dictionary[locale], parseTranslations(translations));
    } catch (error) {
        console.error('[CMS] Failed to fetch translations:', error);
        return dictionary[locale];
    }
}

/**
 * Fetch active FAQs from CMS
 */
export async function getFAQs(locale: 'en' | 'fr'): Promise<FAQ[]> {
    const fallback = dictionary[locale].faq.items.map((item, index) => ({
        question: item.q,
        answer: item.a,
        order: index,
    }));

    if (!client) return fallback;

    try {
        const entries = await client.getEntries({
            content_type: 'faq',
            locale: locale === 'en' ? 'en-US' : 'fr',
        });

        if (entries.items.length === 0) return fallback;

        return entries.items
            .map((entry) => {
                const fields = entry.fields as { question: string; answer: string; order: number; isActive: boolean };
                return fields.isActive ? {
                    question: String(fields.question || ''),
                    answer: String(fields.answer || ''),
                    order: Number(fields.order || 0),
                } : null;
            })
            .filter((item): item is FAQ => item !== null)
            .sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error('[CMS] Failed to fetch FAQs:', error);
        return fallback;
    }
}

/**
 * Fetch partner logos from CMS
 */
export async function getPartners(): Promise<Partner[]> {
    if (!client) return [];

    try {
        const entries = await client.getEntries({
            content_type: 'partner',
        });

        return entries.items.map((entry) => {
            const fields = entry.fields as { name: string; logoUrl: string; websiteUrl?: string };
            return {
                name: String(fields.name || ''),
                logoUrl: String(fields.logoUrl || ''),
                websiteUrl: fields.websiteUrl ? String(fields.websiteUrl) : undefined,
            };
        });
    } catch (error) {
        console.error('[CMS] Failed to fetch partners:', error);
        return [];
    }
}

/**
 * Fetch blog posts from CMS
 */
export async function getBlogPosts(locale: 'en' | 'fr' = 'en'): Promise<BlogPost[]> {
    if (!client) return [];

    try {
        const entries = await client.getEntries({
            content_type: 'blogPost',
            order: '-fields.publishedDate',
            locale: locale === 'en' ? 'en-US' : 'fr',
        } as Parameters<typeof client.getEntries>[0]);

        return entries.items.map((entry) => {
            const fields = entry.fields as {
                title: string;
                slug: string;
                body?: string;
                seoTitle?: string;
                seoDescription?: string;
                publishedDate: string;
                author?: string;
                tags?: string[];
            };
            return {
                title: String(fields.title || ''),
                slug: String(fields.slug || ''),
                body: String(fields.body || ''),
                seoTitle: fields.seoTitle ? String(fields.seoTitle) : undefined,
                seoDescription: fields.seoDescription ? String(fields.seoDescription) : undefined,
                featuredImageUrl: undefined,
                publishedDate: String(fields.publishedDate || new Date().toISOString()),
                author: fields.author ? String(fields.author) : undefined,
                tags: Array.isArray(fields.tags) ? fields.tags.map(String) : [],
            };
        });
    } catch (error) {
        console.error('[CMS] Failed to fetch blog posts:', error);
        return [];
    }
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPostBySlug(slug: string, locale: 'en' | 'fr' = 'en'): Promise<BlogPost | null> {
    if (!client) return null;

    try {
        const entries = await client.getEntries({
            content_type: 'blogPost',
            'fields.slug': slug,
            locale: locale === 'en' ? 'en-US' : 'fr',
            limit: 1,
        } as Parameters<typeof client.getEntries>[0]);

        if (entries.items.length === 0) return null;

        const entry = entries.items[0];
        const fields = entry.fields as {
            title: string;
            slug: string;
            body?: string;
            seoTitle?: string;
            seoDescription?: string;
            publishedDate: string;
            author?: string;
            tags?: string[];
        };

        return {
            title: String(fields.title || ''),
            slug: String(fields.slug || ''),
            body: String(fields.body || ''),
            seoTitle: fields.seoTitle ? String(fields.seoTitle) : undefined,
            seoDescription: fields.seoDescription ? String(fields.seoDescription) : undefined,
            featuredImageUrl: undefined,
            publishedDate: String(fields.publishedDate || new Date().toISOString()),
            author: fields.author ? String(fields.author) : undefined,
            tags: Array.isArray(fields.tags) ? fields.tags.map(String) : [],
        };
    } catch (error) {
        console.error('[CMS] Failed to fetch blog post:', error);
        return null;
    }
}

/**
 * Fetch generic page content
 */
export async function getPageContent(slug: string, locale: 'en' | 'fr' = 'en'): Promise<PageContent | null> {
    if (!client) return null;

    try {
        const entries = await client.getEntries({
            content_type: 'page',
            'fields.slug': slug,
            locale: locale === 'en' ? 'en-US' : 'fr',
            limit: 1,
        } as Parameters<typeof client.getEntries>[0]);

        if (entries.items.length === 0) return null;

        const entry = entries.items[0];
        const fields = entry.fields as { title: string; slug: string; content: string };

        return {
            title: String(fields.title || ''),
            slug: String(fields.slug || ''),
            content: String(fields.content || ''),
        };
    } catch (error) {
        console.warn(`[CMS] Page not found: ${slug}`);
        return null;
    }
}

/**
 * Fetch SEO metadata for a page or post
 */
export async function getSEO(slug: string, locale: 'en' | 'fr' = 'en'): Promise<SEOData | null> {
    if (!client) return null;

    try {
        // Attempt to find in pages or blog posts
        const entries = await client.getEntries({
            'fields.slug': slug,
            locale: locale === 'en' ? 'en-US' : 'fr',
            limit: 1,
        } as Parameters<typeof client.getEntries>[0]);

        if (entries.items.length === 0) return null;

        const fields = entries.items[0].fields as { seoTitle?: string; seoDescription?: string; title?: string };

        return {
            title: fields.seoTitle || fields.title || '',
            description: fields.seoDescription || '',
        };
    } catch (error) {
        return null;
    }
}

// ============================================================================
// Helper Functions
// ============================================================================

function parseTranslations(flat: Record<string, string>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(flat)) {
        const parts = key.split('.');
        let current = result;

        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) {
                current[parts[i]] = {};
            }
            current = current[parts[i]] as Record<string, unknown>;
        }

        current[parts[parts.length - 1]] = value;
    }

    return result;
}

function deepMerge<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T {
    const result = { ...target };

    for (const key of Object.keys(source)) {
        if (
            source[key] &&
            typeof source[key] === 'object' &&
            !Array.isArray(source[key]) &&
            target[key] &&
            typeof target[key] === 'object'
        ) {
            (result as Record<string, unknown>)[key] = deepMerge(
                target[key] as Record<string, unknown>,
                source[key] as Record<string, unknown>
            );
        } else if (source[key] !== undefined) {
            (result as Record<string, unknown>)[key] = source[key];
        }
    }

    return result;
}

// ============================================================================
// ISR Revalidation Export
// ============================================================================

export const CMS_REVALIDATE = 60;
