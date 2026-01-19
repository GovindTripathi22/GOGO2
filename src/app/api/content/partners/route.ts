import { NextResponse } from 'next/server';

export async function GET() {
    // Return static partners for now to match fallback
    // In future, this can query a 'partners' table or 'media_meta'
    const partners = [
        { name: "MAE", logoUrl: "/assets/images/partner-mae.svg" },
        { name: "MTN", logoUrl: "/assets/images/partner-mtn.png" },
        { name: "SGDS", logoUrl: "/assets/images/partner-sgds.png" },
        { name: "Societe Generale", logoUrl: "/assets/images/partner-socgen.png" },
    ];

    return NextResponse.json({ partners });
}
