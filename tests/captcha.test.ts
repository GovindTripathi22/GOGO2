import { verifyCaptcha } from '@/lib/captcha';

// Mock fetch globally
global.fetch = jest.fn() as jest.Mock;

describe('CAPTCHA Verification', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('should return valid true for high score', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => ({ success: true, score: 0.9 }),
        });

        const result = await verifyCaptcha('good-token');
        expect(result.valid).toBe(true);
        expect(result.score).toBe(0.9);
    });

    it('should return valid false for low score', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => ({ success: true, score: 0.3 }),
        });

        const result = await verifyCaptcha('bad-token');
        expect(result.valid).toBe(false);
        expect(result.score).toBe(0.3);
    });

    it('should handle API errors gracefully', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const result = await verifyCaptcha('error-token');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Network error');
    });
});
