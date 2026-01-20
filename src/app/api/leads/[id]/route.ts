import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest, logAudit } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    // 1. Verify Admin Auth
    const cookieStore = await cookies();
    const userEmail = await getAdminFromRequest(cookieStore);
    if (!userEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { company_name, fleet_size, fuel_type, email, phone, email_status } = body;

        // 2. Update Lead
        await query(
            `UPDATE leads 
             SET company_name = $1, 
                 fleet_size = $2, 
                 fuel_type = $3, 
                 email = $4, 
                 phone = $5, 
                 email_status = $6
             WHERE id = $7`,
            [company_name, fleet_size, fuel_type, email, phone, email_status, id]
        );

        // 3. Log Audit
        await logAudit(userEmail, 'UPDATE_PAGE', { // Using UPDATE_PAGE as closest generic action, or customizable
            type: 'lead',
            lead_id: id,
            changes: body
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Failed to update lead:', error);
        return NextResponse.json(
            { error: 'Failed to update lead' },
            { status: 500 }
        );
    }
}
