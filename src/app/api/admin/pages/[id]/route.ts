/**
 * Admin Page Detail API Route
 * Get, update, delete individual pages
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest, logAudit } from '@/lib/auth';
import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

interface RouteContext {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/pages/[id] - Get page with all translations
 */
export async function GET(request: NextRequest, context: RouteContext) {
    const cookieStore = await cookies();
    const adminEmail = await getAdminFromRequest(cookieStore);

    if (!adminEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    try {
        // Get page with translations
        const pageResult = await query(`
            SELECT 
                p.*,
                json_agg(json_build_object(
                    'id', pt.id,
                    'locale', pt.locale,
                    'title', pt.title,
                    'body', pt.body,
                    'seo_title', pt.seo_title,
                    'seo_description', pt.seo_description,
                    'is_published', pt.is_published,
                    'version', pt.version,
                    'updated_at', pt.updated_at
                )) as page_translations
            FROM pages p
            LEFT JOIN page_translations pt ON p.id = pt.page_id
            WHERE p.id = $1
            GROUP BY p.id
        `, [id]);

        if (pageResult.rows.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        const page = pageResult.rows[0];

        // Get version history for each translation
        const translations = page.page_translations || [];
        const historyPromises = translations.map(async (trans: { id: string }) => {
            const historyResult = await query(`
                SELECT * FROM content_history 
                WHERE translation_id = $1 
                ORDER BY version DESC 
                LIMIT 3
            `, [trans.id]);
            return { translation_id: trans.id, history: historyResult.rows };
        });

        const histories = await Promise.all(historyPromises);

        return NextResponse.json({ page, histories });
    } catch (error) {
        console.error('[Admin API] Get page error:', error);
        return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
    }
}

/**
 * PATCH /api/admin/pages/[id] - Update page metadata or translation
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
    const cookieStore = await cookies();
    const adminEmail = await getAdminFromRequest(cookieStore);

    if (!adminEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    try {
        const body = await request.json();
        const { translation_id, title, content, seo_title, seo_description, fr_required } = body;

        // If updating page metadata (fr_required)
        if (typeof fr_required === 'boolean') {
            await query('UPDATE pages SET fr_required = $1 WHERE id = $2', [fr_required, id]);
            await logAudit(adminEmail, 'LOGIN_SUCCESS', { action: 'update_page_meta', page_id: id });
        }

        // If updating translation
        if (translation_id) {
            // Get current version
            const currentResult = await query(
                'SELECT version, title, body, seo_title, seo_description FROM page_translations WHERE id = $1',
                [translation_id]
            );

            if (currentResult.rows.length > 0) {
                const current = currentResult.rows[0];
                const newVersion = (current.version || 0) + 1;

                // Save to version history
                await query(`
                    INSERT INTO content_history (translation_id, version, title, body, changed_by)
                    VALUES ($1, $2, $3, $4, $5)
                `, [translation_id, current.version || 1, current.title, current.body, adminEmail]);

                // Update the translation
                await query(`
                    UPDATE page_translations 
                    SET title = COALESCE($1, title),
                        body = COALESCE($2, body),
                        seo_title = COALESCE($3, seo_title),
                        seo_description = COALESCE($4, seo_description),
                        version = $5,
                        updated_at = NOW()
                    WHERE id = $6
                `, [title, content, seo_title, seo_description, newVersion, translation_id]);

                await logAudit(adminEmail, 'LOGIN_SUCCESS', {
                    action: 'update_translation',
                    translation_id,
                    version: newVersion
                });
            }
        }

        // Revalidate entire site to reflect content changes
        revalidatePath('/', 'layout');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Admin API] Update page error:', error);
        return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
    }
}

/**
 * DELETE /api/admin/pages/[id] - Delete page and all translations
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
    const cookieStore = await cookies();
    const adminEmail = await getAdminFromRequest(cookieStore);

    if (!adminEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    try {
        // Get page info for audit log
        const pageResult = await query('SELECT * FROM pages WHERE id = $1', [id]);
        const page = pageResult.rows[0];

        // Delete translations first (foreign key constraint)
        await query('DELETE FROM page_translations WHERE page_id = $1', [id]);

        // Delete the page
        await query('DELETE FROM pages WHERE id = $1', [id]);

        await logAudit(adminEmail, 'LOGIN_SUCCESS', {
            action: 'delete_page',
            page_id: id,
            slug: page?.slug
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Admin API] Delete page error:', error);
        return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
    }
}
