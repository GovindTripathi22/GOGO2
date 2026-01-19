import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/cms-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://gogo.bj';

    // Get all blog posts for dynamic routes
    const posts = getBlogPosts();

    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedDate),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const staticRoutes = [
        '',
        '/about',
        '/b2b',
        '/blog',
        '/mobile-app',
        '/quote',
        '/trust-faq',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    return [...staticRoutes, ...blogUrls];
}
