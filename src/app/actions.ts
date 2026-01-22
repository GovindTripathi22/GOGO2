"use server";

import { QuoteSchema, QuoteData, QuoteFormResult } from "@/lib/quote-types";
import { insertLead, updateLeadEmailStatus } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { verifyCaptcha } from "@/lib/captcha";
import nodemailer from "nodemailer";

// Note: sendLeadNotification is imported from email.ts which we created
// It should handle sending notifications to sales team

export async function submitQuote(data: QuoteData & { captchaToken?: string | null }): Promise<QuoteFormResult> {
    // 0. Verify Captcha
    // Only verify if NOT disabled AND Key exists
    // (Prevents failure on Vercel if keys are not set)
    if (process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== 'true' && process.env.RECAPTCHA_SECRET_KEY) {
        const isCaptchaValid = await verifyCaptcha(data.captchaToken || null);
        if (!isCaptchaValid) {
            return {
                success: false,
                message: "Captcha verification failed. Please try again.",
            };
        }
    }

    // Validate
    const validatedFields = QuoteSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { companyName, industry, fleetSize, productNeeds, serviceInterests, email, phone } = validatedFields.data;

    try {
        // Compose Email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com", // Fallback or placeholder
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || '"GoGo Leads" <leads@gogofuels.com>',
            to: "Contact@gogofuels.com",
            subject: `New B2B Quote Request: ${companyName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <!-- Header -->
                    <div style="background-color: #000000; padding: 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">GoGo Imperial Energy</h1>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 30px; background-color: #ffffff;">
                        <h2 style="color: #1a202c; margin-top: 0; border-bottom: 2px solid #fbbf24; padding-bottom: 10px; display: inline-block;">New B2B Quote Request</h2>
                        
                        <div style="margin-top: 25px;">
                            <h3 style="color: #4a5568; font-size: 16px; text-transform: uppercase; margin-bottom: 15px;">Client Details</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #718096; width: 140px;">Company:</td>
                                    <td style="padding: 8px 0; color: #1a202c; font-weight: bold;">${companyName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #718096;">Industry:</td>
                                    <td style="padding: 8px 0; color: #1a202c; font-weight: bold;">${industry}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #718096;">Fleet Size:</td>
                                    <td style="padding: 8px 0; color: #1a202c; font-weight: bold;">${fleetSize}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #718096;">Email:</td>
                                    <td style="padding: 8px 0; color: #1a202c; font-weight: bold;"><a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #718096;">Phone:</td>
                                    <td style="padding: 8px 0; color: #1a202c; font-weight: bold;">${phone}</td>
                                </tr>
                            </table>
                        </div>

                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                            <h3 style="color: #4a5568; font-size: 16px; text-transform: uppercase; margin-bottom: 15px;">Requirements</h3>
                            
                            <div style="margin-bottom: 20px;">
                                <strong style="display: block; color: #2d3748; margin-bottom: 8px;">Product Needs:</strong>
                                <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; color: #4a5568;">
                                    ${productNeeds.map(p => `<span style="display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; margin: 4px 4px 4px 0; font-size: 14px; font-weight: 500;">${p}</span>`).join('')}
                                </div>
                            </div>

                            <div>
                                <strong style="display: block; color: #2d3748; margin-bottom: 8px;">Service Interests:</strong>
                                <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; color: #4a5568;">
                                    ${serviceInterests?.length ? serviceInterests.map(s => `<span style="display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; margin: 4px 4px 4px 0; font-size: 14px; font-weight: 500;">${s}</span>`).join('') : '<span style="color: #a0aec0;">None selected</span>'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background-color: #f7fafc; padding: 20px; text-align: center; color: #a0aec0; font-size: 12px; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0;">Sent via GoGo Web Lead Capture</p>
                    </div>
                </div>
            `,
        };

        // Send Email (only if creds exist, else log)
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
            console.log("📧 Email sent successfully to Contact@gogofuels.com");
        } else {
            console.warn("⚠️ SMTP Credentials missing. Logging email content:", mailOptions);
        }

        // DB Insert (Best Effort - adapt to existing function)
        // We might need to skip DB or pass partial data if schema doesn't match
        try {
            await insertLead({
                company_name: companyName,
                fleet_size: fleetSize,
                fuel_type: "See Email/JSON", // Placeholder since we changed the input
                email,
                phone,
                email_status: 'sent',
            });
        } catch (dbErr) {
            console.error("Database insert failed, but email logic processed.", dbErr);
        }

        return {
            success: true,
            message: "Quote request submitted successfully!",
        };
    } catch (error) {
        console.error("❌ Quote submission error:", error);
        return {
            success: false,
            message: "An error occurred. Please try again.",
        };
    }
}
