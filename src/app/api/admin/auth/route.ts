/**
 * Admin Auth API - Session & Logout
 * GET /api/admin/auth - Check current session
 * DELETE /api/admin/auth - Logout
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifySession, logAudit } from '@/lib/auth';
import { cookies } from 'next/headers';

/**
 * GET - Check if user is authenticated
 */
export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('admin_session');

        if (!sessionCookie?.value) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const session = await verifySession(sessionCookie.value);

        if (!session) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        return NextResponse.json({
            authenticated: true,
            user: { email: session.email }
        });

    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}

/**
 * DELETE - Logout user
 */
export async function DELETE() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('admin_session');

        if (sessionCookie?.value) {
            const session = await verifySession(sessionCookie.value);
            if (session) {
                await logAudit(session.email, 'LOGOUT', {});
            }
        }

        const response = NextResponse.json({ success: true });
        response.cookies.delete('admin_session');

        return response;

    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
        const response = NextResponse.json({ success: true });
        response.cookies.delete('admin_session');
        return response;
    }
}
