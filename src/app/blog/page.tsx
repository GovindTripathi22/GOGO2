/**
 * Blog Index Page
 */

import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/cms-server';
import BlogClient from './BlogClient';

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Blog | GoGo Imperial Energy',
    description: 'Insights on fuel delivery, fleet management, and energy solutions in Benin.',
    openGraph: {
        title: 'Blog | GoGo Imperial Energy',
        description: 'Insights on fuel delivery, fleet management, and energy solutions.',
        type: 'website',
    },
};

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return <BlogClient posts={posts} />;
}
