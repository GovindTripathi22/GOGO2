import { z } from "zod";

export const QuoteSchema = z.object({
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    fleetSize: z.enum(["1-10", "11-50", "50+"] as const),
    fuelType: z.enum(["Diesel", "Super", "Both"] as const),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number is too short"),
});

export type QuoteData = z.infer<typeof QuoteSchema>;

export type QuoteFormResult = {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
};
