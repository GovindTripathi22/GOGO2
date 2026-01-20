/**
 * Admin Pages API Route
 * CRUD operations for CMS pages
 * Protected by custom auth middleware
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest, logAudit } from '@/lib/auth';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

/**
 * GET /api/admin/pages - List all pages with translations
 */
export async function GET() {
    const cookieStore = await cookies();
    const adminEmail = await getAdminFromRequest(cookieStore);

    if (!adminEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await query(`
            SELECT 
                p.id,
                p.slug,
                p.page_type,
                p.fr_required,
                p.created_at,
                p.updated_at,
                json_agg(json_build_object(
                    'id', pt.id,
                    'locale', pt.locale,
                    'title', pt.title,
                    'is_published', pt.is_published,
                    'version', pt.version,
                    'updated_at', pt.updated_at
                )) as page_translations
            FROM pages p
            LEFT JOIN page_translations pt ON p.id = pt.page_id
            GROUP BY p.id
            ORDER BY p.updated_at DESC
        `);

        return NextResponse.json({ pages: result.rows });
    } catch (error) {
        console.error('[Admin API] List pages error:', error);
        return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
    }
}

/**
 * POST /api/admin/pages - Create a new page
 */
export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const adminEmail = await getAdminFromRequest(cookieStore);

    if (!adminEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { slug, page_type = 'page', fr_required = true } = body;

        if (!slug || typeof slug !== 'string') {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        // Check for existing slug
        const existing = await query('SELECT id FROM pages WHERE slug = $1', [slug]);
        if (existing.rows.length > 0) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
        }

        // Create page
        const pageResult = await query(
            'INSERT INTO pages (slug, page_type, fr_required) VALUES ($1, $2, $3) RETURNING *',
            [slug, page_type, fr_required]
        );
        const page = pageResult.rows[0];

        // Create empty EN and FR translations
        await query(
            `INSERT INTO page_translations (page_id, locale, title, body) VALUES 
             ($1, 'en', '', '{}'),
             ($1, 'fr', '', '{}')`,
            [page.id]
        );

        // Audit log
        await logAudit(adminEmail, 'LOGIN_SUCCESS', {
            action: 'create_page',
            item_type: 'page',
            item_id: page.id,
            slug: slug
        });

        return NextResponse.json({ page }, { status: 201 });
    } catch (error) {
        console.error('[Admin API] Create page error:', error);
        return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
    }
}
