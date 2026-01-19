/**
 * Admin Publish API Route
 * Publish/unpublish translations with pre-publish checks
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest, logAudit } from '@/lib/auth';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

interface RouteContext {
    params: Promise<{ id: string }>;
}

/**
 * POST /api/admin/pages/[id]/publish - Publish a translation
 * Body: { translation_id: string, action: 'publish' | 'unpublish' }
 */
export async function POST(request: NextRequest, context: RouteContext) {
    const cookieStore = await cookies();
    const adminEmail = await getAdminFromRequest(cookieStore);

    if (!adminEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: pageId } = await context.params;

    try {
        const body = await request.json();
        const { translation_id, action = 'publish' } = body;

        if (!translation_id) {
            return NextResponse.json({ error: 'translation_id required' }, { status: 400 });
        }

        // Get translation info
        const transResult = await query(`
            SELECT id, page_id, locale, is_published 
            FROM page_translations 
            WHERE id = $1 AND page_id = $2
        `, [translation_id, pageId]);

        if (transResult.rows.length === 0) {
            return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
        }

        const translation = transResult.rows[0];

        // Get page info
        const pageResult = await query('SELECT slug, fr_required FROM pages WHERE id = $1', [pageId]);
        const page = pageResult.rows[0];

        // Pre-publish checks for French-required pages when publishing EN
        if (action === 'publish' && translation.locale === 'en' && page?.fr_required) {
            // Check if FR translation exists and has content
            const frResult = await query(`
                SELECT id, title, body, is_published 
                FROM page_translations 
                WHERE page_id = $1 AND locale = 'fr'
            `, [pageId]);

            const frTranslation = frResult.rows[0];
            const frHasContent = frTranslation && frTranslation.title &&
                Object.keys(frTranslation.body || {}).length > 0;

            if (!frHasContent) {
                return NextResponse.json({
                    warning: 'French translation is empty. This page requires French parity.',
                    fr_missing: true,
                    can_proceed: true, // Allow but warn
                }, { status: 200 });
            }
        }

        // Perform publish/unpublish
        if (action === 'publish') {
            await query(`
                UPDATE page_translations 
                SET is_published = true, published_at = NOW() 
                WHERE id = $1
            `, [translation_id]);
        } else {
            await query(`
                UPDATE page_translations 
                SET is_published = false, published_at = NULL 
                WHERE id = $1
            `, [translation_id]);
        }

        // Audit log
        await logAudit(adminEmail, 'LOGIN_SUCCESS', {
            action: action,
            item_type: 'page_translation',
            item_id: translation_id,
            was_published: translation.is_published,
            now_published: action === 'publish',
        });

        return NextResponse.json({
            success: true,
            action,
            published: action === 'publish',
        });
    } catch (error) {
        console.error('[Admin API] Publish error:', error);
        return NextResponse.json({ error: 'Failed to publish' }, { status: 500 });
    }
}
