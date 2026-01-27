"use client";

import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogPost {
    slug: string;
    title: string;
    body: string;
    publishedDate: string;
    tags?: string[];
}

interface BlogClientProps {
    posts: BlogPost[];
}

// Strip markdown for clean excerpt
function stripMarkdown(text: string): string {
    return text
        .replace(/#{1,6}\s/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/- /g, '') // Remove list markers
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();
}

export default function BlogClient({ posts }: BlogClientProps) {
    const { t, lang } = useLang();

    // Format date based on language
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="bg-slate-900 text-white py-20 pt-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t.blog.title}</h1>
                    <p className="text-xl text-slate-300">
                        {t.blog.subtitle}
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
                                    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                            <time dateTime={post.publishedDate}>
                                                {formatDate(post.publishedDate)}
                                            </time>
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h2>
                                        {/* Clean markdown excerpt */}
                                        <p className="text-slate-600 leading-relaxed line-clamp-3">
                                            {stripMarkdown(post.body).slice(0, 200)}...
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            {t.blog.noPosts}
                        </div>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-600 mb-4">{t.blog.ctaText}</p>
                    <Link
                        href="/quote"
                        className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-[#d65a15] transition-colors"
                    >
                        {t.blog.ctaButton}
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
