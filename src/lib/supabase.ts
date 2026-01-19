/**
 * Supabase Client
 * Database connection for leads storage
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('[Supabase] Missing credentials, using mock mode');
}

export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// ============================================================================
// Lead Types
// ============================================================================

export interface Lead {
    id?: string;
    company_name: string;
    fleet_size: string;
    fuel_type: string;
    email: string;
    phone: string;
    email_status: 'pending' | 'sent' | 'failed';
    email_error?: string;
    created_at?: string;
}

// ============================================================================
// Lead Operations
// ============================================================================

/**
 * Insert a new lead into the database
 */
export async function insertLead(data: Omit<Lead, 'id' | 'created_at'>): Promise<{ lead: Lead | null; error: string | null }> {
    if (!supabase) {
        // Mock mode: return fake success
        console.log('[Supabase Mock] Would insert lead:', data);
        return {
            lead: {
                id: `mock-${Date.now()}`,
                ...data,
                created_at: new Date().toISOString(),
            },
            error: null,
        };
    }

    const { data: lead, error } = await supabase
        .from('leads')
        .insert({
            company_name: data.company_name,
            fleet_size: data.fleet_size,
            fuel_type: data.fuel_type,
            email: data.email,
            phone: data.phone,
            email_status: data.email_status,
        })
        .select()
        .single();

    if (error) {
        console.error('[Supabase] Insert error:', error);
        return { lead: null, error: error.message };
    }

    return { lead, error: null };
}

/**
 * Update lead email status
 */
export async function updateLeadEmailStatus(
    leadId: string,
    status: 'sent' | 'failed',
    errorMessage?: string
): Promise<void> {
    if (!supabase) {
        console.log('[Supabase Mock] Would update lead:', leadId, status);
        return;
    }

    await supabase
        .from('leads')
        .update({
            email_status: status,
            email_error: errorMessage ?? null,
        })
        .eq('id', leadId);
}

// ============================================================================
// SQL Schema (for reference)
// ============================================================================

/*
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  fleet_size TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  email_status TEXT DEFAULT 'pending',
  email_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update" ON leads
  FOR UPDATE USING (true);
*/
