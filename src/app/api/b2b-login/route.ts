import { NextResponse } from 'next/server';

export async function GET() {
    // Redirect to the official GoGo B2B fleet portal
    const destination = "https://gogofuelapp.on-demand-app.com/business/login";

    return NextResponse.redirect(destination);
}
