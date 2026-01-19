/**
 * API Route for Page Content
 * Handles getting/saving distinct page content (e.g. Hero title, images)
 */

import { NextRequest, NextResponse } from "next/server";
import { getPageContent, savePageContent } from "@/lib/cms-server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    return NextResponse.json(getPageContent(id));
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const savedContent = savePageContent(id, body);
        return NextResponse.json(savedContent);
    } catch (error) {
        return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }
}
