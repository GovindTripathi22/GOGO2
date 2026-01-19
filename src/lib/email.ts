/**
 * Email Service
 * Sends transactional emails (magic links, notifications)
 * Supports AWS SES and SMTP fallback
 */

import nodemailer from 'nodemailer';

// ============================================================================
// Configuration
// ============================================================================

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@gogo.bj';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'GoGo Admin';

// Create transporter based on environment
function createTransporter() {
  // Production: Use AWS SES
  if (process.env.AWS_SES_REGION) {
    return nodemailer.createTransport({
      host: `email-smtp.${process.env.AWS_SES_REGION}.amazonaws.com`,
      port: 587,
      secure: false,
      auth: {
        user: process.env.AWS_SES_SMTP_USER,
        pass: process.env.AWS_SES_SMTP_PASS,
      },
    });
  }

  // Development/Fallback: Use SMTP (Gmail, Mailtrap, etc.)
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // No email configured - log to console
  console.warn('[Email] No email transport configured, emails will be logged to console');
  return null;
}

const transporter = createTransporter();

// ============================================================================
// Email Templates
// ============================================================================

function getMagicLinkEmailHtml(loginUrl: string, expiresInMinutes: number): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login to GoGo Admin</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 20px;">
    <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #DFFF4F 0%, #c4e600 100%); padding: 32px; text-align: center;">
            <h1 style="margin: 0; color: #1e293b; font-size: 24px; font-weight: 700;">GoGo Admin</h1>
            <p style="margin: 8px 0 0; color: #475569; font-size: 14px;">Imperial Energy CMS</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;">
            <h2 style="margin: 0 0 16px; color: #1e293b; font-size: 20px;">Sign in to your account</h2>
            <p style="color: #64748b; line-height: 1.6; margin: 0 0 24px;">
                Click the button below to securely sign in to the GoGo Admin Panel. This link will expire in <strong>${expiresInMinutes} minutes</strong>.
            </p>
            
            <a href="${loginUrl}" style="display: inline-block; background: #1e293b; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 24px;">
                Sign In →
            </a>
            
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 24px 0 0; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                <strong>Security Notice:</strong> If you didn't request this login link, you can safely ignore this email. This link can only be used once.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} GoGo Imperial Energy. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
}

// ============================================================================
// Email Functions
// ============================================================================

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send a magic link email to an admin user
 */
export async function sendMagicLinkEmail(
  to: string,
  token: string,
  expiresInMinutes: number = 15
): Promise<SendEmailResult> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const loginUrl = `${baseUrl}/api/admin/auth/verify?token=${encodeURIComponent(token)}`;

  const mailOptions = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to,
    subject: 'Your GoGo Admin Login Link',
    html: getMagicLinkEmailHtml(loginUrl, expiresInMinutes),
    text: `Sign in to GoGo Admin\n\nClick this link to sign in: ${loginUrl}\n\nThis link expires in ${expiresInMinutes} minutes and can only be used once.\n\nIf you didn't request this, you can safely ignore this email.`,
  };

  // If no transporter, log to console (development)
  if (!transporter) {
    console.log('\n========== MAGIC LINK EMAIL ==========');
    console.log(`To: ${to}`);
    console.log(`Login URL: ${loginUrl}`);
    console.log(`Expires in: ${expiresInMinutes} minutes`);
    console.log('=======================================\n');

    return {
      success: true,
      messageId: 'console-dev-' + Date.now(),
    };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[Email] Magic link sent to:', to, 'MessageId:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[Email] Failed to send magic link:', error);
    return { success: false, error: error.message };
  }
}
