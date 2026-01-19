import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/auth';
import { getAllPageSEO, savePageSEO, PageSEO } from '@/lib/cms-server';
import { cookies } from 'next/headers';

/**
 * GET /api/admin/seo - Get all page SEO data
 */
export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const adminEmail = await getAdminFromRequest(cookieStore);

    if (!adminEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const seoData = getAllPageSEO();
        return NextResponse.json({ seo: seoData });
    } catch (error) {
        console.error('[Admin API] Get SEO error:', error);
        return NextResponse.json({ error: 'Failed to fetch SEO data' }, { status: 500 });
    }
}

/**
 * PUT /api/admin/seo - Update SEO for a specific page
 * Body: { slug: string, seo: PageSEO }
 */
export async function PUT(request: NextRequest) {
    const cookieStore = await cookies();
    const adminEmail = await getAdminFromRequest(cookieStore);

    if (!adminEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { slug, seo } = await request.json();

        if (!slug || typeof slug !== 'string') {
            return NextResponse.json({ error: 'Page slug is required' }, { status: 400 });
        }

        const savedSEO = savePageSEO(slug, seo);

        return NextResponse.json({ success: true, seo: savedSEO });
    } catch (error) {
        console.error('[Admin API] Update SEO error:', error);
        return NextResponse.json({ error: 'Failed to update SEO' }, { status: 500 });
    }
}
