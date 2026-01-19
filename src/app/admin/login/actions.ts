"use server";

import { cookies } from "next/headers";

const ADMIN_PASSCODE = "gogo2026"; // Simple hardcoded password for now

export async function loginAdmin(passcode: string) {
    if (passcode === ADMIN_PASSCODE) {
        // Set cookie
        (await cookies()).set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        return { success: true };
    }
    return { success: false };
}
