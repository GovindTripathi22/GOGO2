/**
 * Admin Auth API - Login Endpoint
 * POST /api/admin/auth/login
 * Log in with email and password (Bcrypt)
 */

import { NextRequest, NextResponse } from 'next/server';
import { loginWithPassword, checkRateLimit, clearRateLimit, logAudit } from '@/lib/auth';
import { verifyCaptcha } from '@/lib/captcha';

export async function POST(request: NextRequest) {
    try {
        const { email, password, captchaToken } = await request.json();

        // 0. Verify Captcha (unless disabled for testing)
        if (process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== 'true') {
            const isCaptchaValid = await verifyCaptcha(captchaToken);
            if (!isCaptchaValid) {
                await logAudit(email || 'unknown', 'ACCESS_DENIED', { reason: 'invalid_captcha' });
                return NextResponse.json(
                    { error: 'Captcha verification failed' },
                    { status: 400 }
                );
            }
        }

        // Validate inputs
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Rate limiting check
        if (!checkRateLimit(normalizedEmail)) {
            await logAudit(normalizedEmail, 'ACCESS_DENIED', { reason: 'rate_limited' });
            return NextResponse.json(
                { error: 'Too many login attempts. Please try again in 15 minutes.' },
                { status: 429 }
            );
        }

        // Attempt Login
        const result = await loginWithPassword(normalizedEmail, password);

        if (!result) {
            // Failed login - generic error
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const { sessionToken, user } = result;

        // Clear rate limit on success
        clearRateLimit(normalizedEmail);

        // Create success response with HTTP-only cookie
        const response = NextResponse.json({ success: true, user });

        // Expiry matches SESSION_EXPIRY_HOURS in auth.ts (24h)
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24);

        response.cookies.set('admin_session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: expiryDate
        });

        return response;

    } catch (error: any) {
        console.error('[Auth] Login error:', error);
        return NextResponse.json(
            { error: `Login failed: ${error.message}` },
            { status: 500 }
        );
    }
}
