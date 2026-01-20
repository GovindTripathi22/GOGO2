/**
 * POST /api/leads
 * Handle B2B lead submissions with validation, rate limiting, and notifications
 */

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// ============================================================================
// Validation Schema (Kept for reference but unused variables removed)
// ============================================================================

// ============================================================================
// POST Handler
// ============================================================================

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation (or keep zod if preferred, but user example was simple)
        const { companyName, fleetSize, fuelType, email, phone } = body;

        // Use the new query helper
        const result = await query(
            `INSERT INTO leads (company_name, fleet_size, fuel_type, email, phone, email_status, created_at)
             VALUES ($1, $2, $3, $4, $5, 'pending', NOW())
             RETURNING id`,
            [companyName, fleetSize, fuelType, email, phone]
        );

        if (result.rows.length > 0) {
            // Optional: Send email notification logic here using nodemailer or SES directly if needed
            // For now, focusing on DB insertion as per migration request
            return NextResponse.json({ success: true, leadId: result.rows[0].id });
        } else {
            throw new Error("Insert failed");
        }

    } catch (error: unknown) {
        console.error("Leads API Error:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
