import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    // Warn instead of throw to allow build to pass without env vars
    console.warn("DATABASE_URL missing - DB calls will fail");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export async function query(sql: string, params: any[] = []) {
    const client = await pool.connect();
    try {
        return await client.query(sql, params);
    } finally {
        client.release();
    }
}

// ============================================================================
// Lead Management
// ============================================================================

export interface Lead {
    id?: string;
    company_name: string;
    fleet_size: string;
    fuel_type: string;
    email: string;
    phone?: string;
    email_status?: string;
    created_at?: string;
}

export async function insertLead(data: Omit<Lead, 'id' | 'created_at'>): Promise<{ lead: Lead | null; error: string | null }> {
    try {
        const result = await query(
            `INSERT INTO leads (company_name, fleet_size, fuel_type, email, phone, email_status)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [data.company_name, data.fleet_size, data.fuel_type, data.email, data.phone || null, data.email_status || 'pending']
        );
        return { lead: result.rows[0], error: null };
    } catch (error: any) {
        console.error('[DB] Insert lead error:', error);
        return { lead: null, error: error.message };
    }
}

export async function updateLeadEmailStatus(leadId: string, status: string, errorDetails?: string): Promise<void> {
    try {
        await query(
            `UPDATE leads SET email_status = $1, email_error = $2 WHERE id = $3`,
            [status, errorDetails || null, leadId]
        );
    } catch (error) {
        console.error('[DB] Update lead status error:', error);
    }
}

export async function getLeads(): Promise<Lead[]> {
    try {
        const result = await query(
            `SELECT * FROM leads ORDER BY created_at DESC LIMIT 100`
        );
        return result.rows;
    } catch (error) {
        console.error('[DB] Get leads error:', error);
        return [];
    }
}

export default pool;
