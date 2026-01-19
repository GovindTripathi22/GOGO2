/**
 * CAPTCHA Verification (reCAPTCHA v3)
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MIN_SCORE = 0.5;

export interface CaptchaResult {
    valid: boolean;
    score?: number;
    error?: string;
}

/**
 * Verify reCAPTCHA v3 token
 */
export async function verifyCaptcha(token: string): Promise<CaptchaResult> {
    if (!RECAPTCHA_SECRET) {
        // Mock mode: always pass
        console.warn('[CAPTCHA] Secret not configured, bypassing verification');
        return { valid: true, score: 1.0 };
    }

    try {
        const response = await fetch(RECAPTCHA_VERIFY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
        });

        const data = await response.json();

        if (!data.success) {
            return {
                valid: false,
                error: data['error-codes']?.join(', ') || 'Verification failed',
            };
        }

        if (data.score < MIN_SCORE) {
            return {
                valid: false,
                score: data.score,
                error: 'Score too low',
            };
        }

        return { valid: true, score: data.score };
    } catch (error) {
        console.error('[CAPTCHA] Verification error:', error);
        return { valid: false, error: 'Network error' };
    }
}

/**
 * Honeypot check (hidden field should be empty)
 */
export function checkHoneypot(value: string | undefined): boolean {
    return !value || value.length === 0;
}
