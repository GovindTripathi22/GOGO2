import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://connect.facebook.net https://snap.licdn.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://www.google.com https://www.facebook.com https://px.ads.linkedin.com;
    font-src 'self' https://fonts.gstatic.com;
    frame-src 'self' https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
        .replace(/\s{2,}/g, ' ')
        .trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    // =========================================================
    // Admin Authentication Middleware
    // =========================================================
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin')) {
        // TEMPORARY: Authentication Disabled for Testing
        // If user tries to go to login, send them to dashboard immediately
        if (pathname === '/admin/login') {
            const url = request.nextUrl.clone();
            url.pathname = '/admin';
            return NextResponse.redirect(url);
        }

        /* 
        // AUTHENTICATION CHECK DISABLED
        if (pathname !== '/admin/login') {
            const adminSession = request.cookies.get('admin_session');

            // If no session cookie checks, redirect to login
            if (!adminSession?.value) {
                const url = request.nextUrl.clone();
                url.pathname = '/admin/login';
                return NextResponse.redirect(url);
            }
        }
        */
    }

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
