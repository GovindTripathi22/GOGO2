/**
 * Admin Pages List
 * Simple page management using mock data
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Plus, Edit2, Trash2, Globe, Check } from "lucide-react";

interface Page {
    id: string;
    slug: string;
    title: { en: string; fr: string };
    status: string;
    lastUpdated: string;
}

export default function AdminPagesPage() {
    const [pages, setPages] = useState<Page[]>([]);
    const [language, setLanguage] = useState<"en" | "fr">("en");

    const handleAdd = () => {
        const newPage: Page = {
            id: String(Date.now()),
            slug: "new-page",
            title: { en: "New Page", fr: "Nouvelle Page" },
            status: "draft",
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        setPages([...pages, newPage]);
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this page?")) {
            setPages(pages.filter(p => p.id !== id));
        }
    };

    const handlePublish = (id: string) => {
        setPages(pages.map(p =>
            p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
        ));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500 p-2 rounded-xl text-white">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
                                <p className="text-sm text-slate-500">{pages.length} pages</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Language Toggle */}
                            <div className="flex bg-slate-100 rounded-lg p-1">
                                <button
                                    onClick={() => setLanguage("en")}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${language === "en" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                                        }`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => setLanguage("fr")}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${language === "fr" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                                        }`}
                                >
                                    FR
                                </button>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Page
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Pages List */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="space-y-3">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-300 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            {page.title[language]}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            /{page.slug} • Updated {page.lastUpdated}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Status Badge */}
                                    <button
                                        onClick={() => handlePublish(page.id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${page.status === "published"
                                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                                            : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                            }`}
                                    >
                                        {page.status === "published" ? (
                                            <>
                                                <Check className="w-3 h-3" />
                                                Published
                                            </>
                                        ) : (
                                            <>
                                                <Globe className="w-3 h-3" />
                                                Draft
                                            </>
                                        )}
                                    </button>
                                    {/* Actions */}
                                    <Link
                                        href={`/admin/pages/${page.slug}`}
                                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(page.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {pages.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No pages yet. Click &quot;Add Page&quot; to create one.</p>
                    </div>
                )}

                {/* Help Text */}
                <div className="mt-8 bg-slate-100 rounded-xl p-4">
                    <p className="text-sm text-slate-600">
                        💡 <strong>Tip:</strong> Click the status badge to toggle between Published and Draft.
                        Changes are saved automatically.
                    </p>
                </div>
            </main>
        </div>
    );
}
