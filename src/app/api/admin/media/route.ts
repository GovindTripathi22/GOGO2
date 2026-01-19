/**
 * Media API Route
 * Handles image uploads and listing for CMS
 * SERVER SIDE ONLY (uses fs)
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const ASSETS_DIR = path.join(process.cwd(), "public", "assets", "images");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

/**
 * GET - List all media files
 */
export async function GET() {
    const media: { id: string; name: string; url: string; type: string }[] = [];

    // Scan uploads folder
    if (fs.existsSync(UPLOADS_DIR)) {
        const files = fs.readdirSync(UPLOADS_DIR);
        files.forEach((file, index) => {
            if (isImageFile(file)) {
                media.push({
                    id: `upload-${index}`,
                    name: file,
                    url: `/uploads/${file}`,
                    type: "upload"
                });
            }
        });
    }

    // Scan assets folder
    if (fs.existsSync(ASSETS_DIR)) {
        const files = fs.readdirSync(ASSETS_DIR);
        files.forEach((file, index) => {
            if (isImageFile(file)) {
                media.push({
                    id: `asset-${index}`,
                    name: file,
                    url: `/assets/images/${file}`,
                    type: "asset"
                });
            }
        });
    }

    return NextResponse.json({ media });
}

/**
 * POST - Upload a new image
 */
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, GIF, WEBP, or SVG." }, { status: 400 });
        }

        // Create safe filename
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const timestamp = Date.now();
        const fileName = `${timestamp}-${originalName}`;
        const filePath = path.join(UPLOADS_DIR, fileName);

        // Convert File to Buffer and write
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
            success: true,
            file: {
                name: fileName,
                url: `/uploads/${fileName}`
            }
        });

    } catch (error) {
        console.error("[Media Upload] Error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

function isImageFile(filename: string): boolean {
    const ext = path.extname(filename).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext);
}
