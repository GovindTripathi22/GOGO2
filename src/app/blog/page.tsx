/**
 * Blog Index Page
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/cms-server';

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

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">GoGo Blog</h1>
                    <p className="text-xl text-slate-300">
                        Insights on fuel delivery, fleet management, and energy in Africa.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <div className="flex flex-col gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <article key={post.slug} className="group">
                                <Link href={`/blog/${post.slug}`} className="block">
                                    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-tech hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                            <time dateTime={post.publishedDate}>
                                                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </time>
                                            {/* Read time would need to be calculated or added to CMS model */}
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h2>
                                        {/* Excerpt logic: Use first part of body or a specific field if added */}
                                        <p className="text-slate-600 leading-relaxed line-clamp-3">
                                            {post.body /* Simple excerpt simulation */}
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            No posts found. Check back soon!
                        </div>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-600 mb-4">Ready to optimize your fleet?</p>
                    <Link
                        href="/quote"
                        className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-[#d65a15] transition-colors"
                    >
                        Request a Quote
                    </Link>
                </div>
            </section>
        </main>
    );
}
