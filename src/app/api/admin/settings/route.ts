/**
 * API Route for Settings
 * Enables persisting CMS settings to local JSON
 */

import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/cms-server";

export async function GET() {
    return NextResponse.json(getSettings());
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        // Validation could go here
        const newSettings = saveSettings(body);
        return NextResponse.json(newSettings);
    } catch {
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
    }
}
