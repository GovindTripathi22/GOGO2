import { z } from "zod";

export const QuoteSchema = z.object({
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    industry: z.string().min(1, "Industry is required"),
    fleetSize: z.string(), // Changed to string to match select values more flexibly
    productNeeds: z.array(z.string()).min(1, "Select at least one product"),
    serviceInterests: z.array(z.string()).optional(),
    fuelType: z.enum(["Diesel", "Super", "Both"]).optional(), // Keep optional for backward compat or remove if unused
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number is too short"),
});

export type QuoteData = z.infer<typeof QuoteSchema>;

export type QuoteFormResult = {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
};
