

/**
 * Server-side verification of Google reCAPTCHA v2 token
 */
export async function verifyCaptcha(token: string | null): Promise<boolean> {
    if (!token) {
        console.warn('⚠️ Captcha verification failed: No token provided');
        return false;
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
        console.warn('⚠️ Captcha verification skipped: RECAPTCHA_SECRET_KEY not set');
        // Fail open in dev if key missing? Or fail closed? 
        // Failing closed is safer for security features.
        return false;
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        });

        const data = (await response.json()) as { success: boolean };

        if (!data.success) {
            console.warn('❌ Captcha verification failed:', data);
            return false;
        }

        console.log('✅ Captcha verification passed');
        return true;
    } catch (error) {
        console.error('❌ Captcha verification error:', error);
        return false;
    }
}
