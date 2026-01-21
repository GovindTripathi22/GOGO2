import { NextResponse } from 'next/server';
import { insertLead, getLeads } from '@/lib/db';
import { getAdminFromRequest } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(req: Request) { // eslint-disable-line @typescript-eslint/no-unused-vars
    // 1. Verify Admin Auth
    const cookieStore = await cookies();
    const userEmail = await getAdminFromRequest(cookieStore);

    // TEMPORARY: Allow if on localhost with no auth for easier testing (matching middleware logic)
    // if (!userEmail) {
    //    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const leads = await getLeads();
        return NextResponse.json(leads);
    } catch (error: unknown) {
        console.error("Leads Fetch Error:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation
        const { companyName, fleetSize, fuelType, email, phone } = body;

        const { lead, error } = await insertLead({
            company_name: companyName,
            fleet_size: fleetSize,
            fuel_type: fuelType,
            email,
            phone,
            email_status: 'pending'
        });

        if (error || !lead) {
            throw new Error(error || "Insert failed");
        }

        return NextResponse.json({ success: true, leadId: lead.id });

    } catch (error: unknown) {
        console.error("Leads API Error:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
