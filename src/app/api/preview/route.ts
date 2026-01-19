import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
    // Parse query params
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const slug = searchParams.get('slug');

    // Verify secret (should match .env)
    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET && secret !== 'gogo-preview') {
        return new Response('Invalid token', { status: 401 });
    }

    // Enable Draft Mode
    const draft = await draftMode();
    draft.enable();

    // Redirect to the path
    redirect(slug || '/');
}
