/**
 * CMS Dashboard
 * Main entry point for content management
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import {
    FileText,
    HelpCircle,
    Image as ImageIcon,
    Settings,
    Search,
    Eye,
    ExternalLink,
    Users,
    ArrowLeft
} from "lucide-react";

export default function CMSDashboard() {
    // Mock stats for display
    const stats = {
        pages: 5,
        published: 5,
        faqs: 0,
        media: 12
    };

    const sections = [
        {
            title: "Pages",
            description: "Edit your website pages",
            icon: FileText,
            href: "/admin/pages",
            count: stats.pages,
            color: "bg-blue-500"
        },
        {
            title: "SEO",
            description: "Optimize search rankings",
            icon: Search,
            href: "/admin/seo",
            count: 6,
            color: "bg-orange-500"
        },
        {
            title: "FAQs",
            description: "Manage frequently asked questions",
            icon: HelpCircle,
            href: "/admin/faqs",
            count: stats.faqs,
            color: "bg-green-500"
        },
        {
            title: "Media",
            description: "View images and assets",
            icon: ImageIcon,
            href: "/admin/media",
            count: stats.media,
            color: "bg-purple-500"
        },
        {
            title: "Settings",
            description: "Site configuration",
            icon: Settings,
            href: "/admin/settings",
            count: null,
            color: "bg-slate-500"
        },
        {
            title: "Users",
            description: "Manage admin access",
            icon: Users,
            href: "/admin/users",
            count: null,
            color: "bg-indigo-500"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Back to Gateway">
                            <ArrowLeft className="w-5 h-5 text-slate-500" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/assets/images/logo-main.png"
                                    alt="GoGo Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">CMS Manager</h1>
                                <p className="text-sm text-slate-500">Website Content Control</p>
                            </div>
                        </div>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        View Site
                        <ExternalLink className="w-3 h-3" />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <p className="text-3xl font-bold text-slate-900">{stats.pages}</p>
                        <p className="text-sm text-slate-500">Total Pages</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <p className="text-3xl font-bold text-green-600">{stats.published}</p>
                        <p className="text-sm text-slate-500">Published</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <p className="text-3xl font-bold text-slate-900">{stats.faqs}</p>
                        <p className="text-sm text-slate-500">FAQs</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <p className="text-3xl font-bold text-slate-900">{stats.media}</p>
                        <p className="text-sm text-slate-500">Media Files</p>
                    </div>
                </div>

                {/* Section Cards */}
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Manage Content</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Link
                                key={section.title}
                                href={section.href}
                                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`${section.color} p-3 rounded-xl text-white`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                                                {section.title}
                                            </h4>
                                            {section.count !== null && (
                                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-sm">
                                                    {section.count}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-500 mt-1">{section.description}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
