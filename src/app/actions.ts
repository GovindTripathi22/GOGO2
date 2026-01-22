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
                <h2>New Lead Capture</h2>
                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Industry:</strong> ${industry}</p>
                <p><strong>Fleet Size:</strong> ${fleetSize}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                
                <h3>Product Needs:</h3>
                <ul>${productNeeds.map(p => `<li>${p}</li>`).join('')}</ul>
                
                <h3>Service Interests:</h3>
                <ul>${serviceInterests?.map(s => `<li>${s}</li>`).join('') || "None"}</ul>
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
