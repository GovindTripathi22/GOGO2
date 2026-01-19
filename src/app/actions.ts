"use server";

import { QuoteSchema, QuoteData, QuoteFormResult } from "@/lib/quote-types";
import { insertLead, updateLeadEmailStatus } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Note: sendLeadNotification is imported from email.ts which we created
// It should handle sending notifications to sales team

export async function submitQuote(data: QuoteData): Promise<QuoteFormResult> {
    // Validate
    const validatedFields = QuoteSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { companyName, fleetSize, fuelType, email, phone } = validatedFields.data;

    try {
        // Insert lead into database
        const { lead, error: dbError } = await insertLead({
            company_name: companyName,
            fleet_size: fleetSize,
            fuel_type: fuelType,
            email,
            phone,
            email_status: 'pending',
        });

        if (dbError || !lead) {
            console.error("❌ Failed to save lead:", dbError);
            return {
                success: false,
                message: "Failed to save your request. Please try again.",
            };
        }

        console.log("✅ B2B Quote Saved:", lead.id);

        // Send email notification (async, non-blocking)
        // TODO: Implement sales notification email
        // For now, mark as pending
        await updateLeadEmailStatus(lead.id!, 'pending');

        // Revalidate admin page so new lead shows up immediately
        revalidatePath('/admin');

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
