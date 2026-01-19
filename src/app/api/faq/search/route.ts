/**
 * FAQ Search API Route
 * Full-text search using Postgres tsvector
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchFAQs, getFAQs } from '@/lib/cms-db';

/**
 * GET /api/faq/search?q=query&locale=en
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const locale = (searchParams.get('locale') || 'en') as 'en' | 'fr';
    const category = searchParams.get('category') || null;

    try {
        let faqs;

        if (query.trim()) {
            // Use full-text search
            faqs = await searchFAQs(query, locale);
        } else {
            // Return all FAQs for category
            faqs = await getFAQs(category, locale);
        }

        return NextResponse.json({
            faqs,
            count: faqs.length,
            query: query || null,
            locale,
        });
    } catch (error) {
        console.error('[FAQ Search] Error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
