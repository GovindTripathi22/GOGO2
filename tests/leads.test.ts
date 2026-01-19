import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/leads/route';

// Mock dependencies
jest.mock('@/lib/supabase', () => ({
    insertLead: jest.fn(),
    updateLeadEmailStatus: jest.fn(),
}));
jest.mock('@/lib/email', () => ({
    sendLeadNotification: jest.fn(),
}));
jest.mock('@/lib/captcha', () => ({
    verifyCaptcha: jest.fn(),
    checkHoneypot: jest.fn().mockReturnValue(true), // Default pass
}));
jest.mock('@/lib/rate-limit', () => ({
    checkRateLimit: jest.fn().mockReturnValue({ allowed: true }),
    getRateLimitHeaders: jest.fn().mockReturnValue({}),
}));

import { insertLead, updateLeadEmailStatus } from '@/lib/supabase';
import { sendLeadNotification } from '@/lib/email';
import { verifyCaptcha } from '@/lib/captcha';

describe('POST /api/leads', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 for invalid validation', async () => {
        const { req } = createMocks({
            method: 'POST',
            json: async () => ({ companyName: '' }), // Invalid
        });

        const res = await POST(req);
        expect(res.status).toBe(400);
    });

    it('should process valid lead successfully', async () => {
        // Setup mocks
        (verifyCaptcha as jest.Mock).mockResolvedValue({ valid: true });
        (insertLead as jest.Mock).mockResolvedValue({ lead: { id: '123' }, error: null });
        (sendLeadNotification as jest.Mock).mockResolvedValue({ success: true });

        const { req } = createMocks({
            method: 'POST',
            headers: { 'x-forwarded-for': '127.0.0.1' },
            json: async () => ({
                companyName: 'Test Corp',
                fleetSize: '11-50',
                fuelType: 'Diesel',
                email: 'test@corp.com',
                phone: '12345678',
                captchaToken: 'valid-token',
            }),
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data.success).toBe(true);
        expect(insertLead).toHaveBeenCalledWith(expect.objectContaining({
            email_status: 'pending'
        }));
        expect(updateLeadEmailStatus).toHaveBeenCalledWith('123', 'sent', undefined);
    });

    it('should handle email failure (transaction rollback logic)', async () => {
        // Setup mocks
        (verifyCaptcha as jest.Mock).mockResolvedValue({ valid: true });
        (insertLead as jest.Mock).mockResolvedValue({ lead: { id: '123' }, error: null });
        (sendLeadNotification as jest.Mock).mockResolvedValue({ success: false, error: 'SMTP Error' });

        const { req } = createMocks({
            method: 'POST',
            json: async () => ({
                companyName: 'Test Corp',
                fleetSize: '11-50',
                fuelType: 'Diesel',
                email: 'test@corp.com',
                phone: '12345678',
                captchaToken: 'valid-token',
            }),
        });

        const res = await POST(req);
        // Note: We still return 201 because the Lead IS saved, but email failed.
        // The client UI might show "Success", but admins know email failed.
        // Or we could return 202 Accepted.

        expect(insertLead).toHaveBeenCalled();
        expect(updateLeadEmailStatus).toHaveBeenCalledWith('123', 'failed', 'SMTP Error');
    });
});
