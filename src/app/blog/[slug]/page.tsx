import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { getBlogPostBySlug } from '@/lib/cms-server';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | GoGo',
        };
    }

    return {
        title: `${post.title} | GoGo Blog`,
        description: post.seoDescription || post.title,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Simple Markdown Renderer
    const renderContent = (content: string) => {
        return content.split('\n\n').map((block, index) => {
            if (block.startsWith('### ')) {
                return <h3 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{block.replace('### ', '')}</h3>;
            }
            if (block.startsWith('## ')) {
                return <h2 key={index} className="text-3xl font-bold text-slate-900 mt-12 mb-6">{block.replace('## ', '')}</h2>;
            }
            if (block.startsWith('# ')) {
                return <h1 key={index} className="text-4xl font-extrabold text-slate-900 mt-8 mb-6">{block.replace('# ', '')}</h1>;
            }
            if (block.startsWith('- ')) {
                const items = block.split('\n').map(line => line.replace('- ', '').trim());
                return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
                        {items.map((item, i) => {
                            // Handle basic bolding **text**
                            const parts = item.split(/(\*\*.*?\*\*)/g);
                            return (
                                <li key={i}>
                                    {parts.map((part, j) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={j} className="text-slate-900">{part.slice(2, -2)}</strong>;
                                        }
                                        return part;
                                    })}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
            if (block.startsWith('1. ')) {
                const items = block.split('\n').map(line => line.replace(/^\d+\.\s/, '').trim());
                return (
                    <ol key={index} className="list-decimal list-inside space-y-2 mb-6 text-slate-700 ml-4">
                        {items.map((item, i) => {
                            const parts = item.split(/(\*\*.*?\*\*)/g);
                            return (
                                <li key={i}>
                                    {parts.map((part, j) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={j} className="text-slate-900">{part.slice(2, -2)}</strong>;
                                        }
                                        return part;
                                    })}
                                </li>
                            );
                        })}
                    </ol>
                );
            }
            // Paragraphs
            return <p key={index} className="text-lg text-slate-700 leading-relaxed mb-6">{block}</p>;
        });
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <article className="pt-32 pb-24">
                {/* Header */}
                <div className="max-w-3xl mx-auto px-6 mb-12 text-center md:text-left">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                        {post.tags?.map(tag => (
                            <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-slate-500 border-t border-b border-slate-100 py-6 justify-center md:justify-start">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <time>
                                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                        {post.author && (
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>{post.author}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6">
                    <div className="prose prose-lg prose-slate max-w-none">
                        {renderContent(post.body)}
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
