"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Save,
    Globe,
    Search as SearchIcon,
    FileText,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from "lucide-react";

interface PageSEO {
    title?: { en: string; fr: string };
    description?: { en: string; fr: string };
    keywords?: string[];
    ogImage?: string;
}

type SEOData = Record<string, PageSEO>;

const PAGE_LABELS: Record<string, string> = {
    home: "🏠 Home Page",
    about: "ℹ️ About Us",
    b2b: "🏢 B2B Fleet Solutions",
    "mobile-app": "📱 Mobile App",
    quote: "📝 Quote Form",
    "trust-faq": "❓ Trust & FAQ",
};

export default function SEOManagementPage() {
    const [seoData, setSeoData] = useState<SEOData>({});
    const [selectedPage, setSelectedPage] = useState<string>("home");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Fetch SEO data
    useEffect(() => {
        async function fetchSEO() {
            try {
                const res = await fetch("/api/admin/seo");
                if (res.ok) {
                    const data = await res.json();
                    setSeoData(data.seo || {});
                }
            } catch (error) {
                console.error("Failed to fetch SEO:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSEO();
    }, []);

    const currentSEO = seoData[selectedPage] || {
        title: { en: "", fr: "" },
        description: { en: "", fr: "" },
        keywords: [],
        ogImage: "",
    };

    const updateField = (field: keyof PageSEO, lang: "en" | "fr" | null, value: string) => {
        setSeoData((prev) => {
            const current = prev[selectedPage] || {
                title: { en: "", fr: "" },
                description: { en: "", fr: "" },
                keywords: [],
                ogImage: "",
            };

            if (field === "keywords") {
                return {
                    ...prev,
                    [selectedPage]: {
                        ...current,
                        keywords: value.split(",").map((k) => k.trim()).filter(Boolean),
                    },
                };
            }

            if (field === "ogImage") {
                return {
                    ...prev,
                    [selectedPage]: { ...current, ogImage: value },
                };
            }

            if (lang && (field === "title" || field === "description")) {
                return {
                    ...prev,
                    [selectedPage]: {
                        ...current,
                        [field]: {
                            ...(current[field] as { en: string; fr: string }),
                            [lang]: value,
                        },
                    },
                };
            }

            return prev;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/admin/seo", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug: selectedPage, seo: seoData[selectedPage] }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "SEO saved successfully!" });
            } else {
            }
        } catch (_error: unknown) {
            setMessage({ type: "error", text: "Failed to save SEO. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin"
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <SearchIcon className="w-5 h-5 text-primary" />
                                SEO Management
                            </h1>
                            <p className="text-sm text-slate-500">Optimize your pages for search engines</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Message */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                    >
                        {message.type === "success" ? (
                            <CheckCircle2 className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        {message.text}
                    </div>
                )}

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Page Selector */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Pages
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {Object.keys(PAGE_LABELS).map((slug) => (
                                    <button
                                        key={slug}
                                        onClick={() => setSelectedPage(slug)}
                                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${selectedPage === slug
                                            ? "bg-primary/10 border-l-4 border-primary"
                                            : ""
                                            }`}
                                    >
                                        <span className="text-sm font-medium text-slate-700">
                                            {PAGE_LABELS[slug]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SEO Editor */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Title */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-blue-500" />
                                Page Title
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                        English 🇬🇧
                                    </label>
                                    <input
                                        type="text"
                                        value={currentSEO.title?.en || ""}
                                        onChange={(e) => updateField("title", "en", e.target.value)}
                                        placeholder="Premium Fuel Delivery..."
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                                    />
                                    <p className="mt-1 text-xs text-slate-400">
                                        {(currentSEO.title?.en || "").length}/60 characters
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                        French 🇫🇷
                                    </label>
                                    <input
                                        type="text"
                                        value={currentSEO.title?.fr || ""}
                                        onChange={(e) => updateField("title", "fr", e.target.value)}
                                        placeholder="Livraison de Carburant..."
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                                    />
                                    <p className="mt-1 text-xs text-slate-400">
                                        {(currentSEO.title?.fr || "").length}/60 characters
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4">Meta Description</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                        English 🇬🇧
                                    </label>
                                    <textarea
                                        value={currentSEO.description?.en || ""}
                                        onChange={(e) => updateField("description", "en", e.target.value)}
                                        placeholder="B2B and B2C on-demand fuel delivery..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none"
                                    />
                                    <p className="mt-1 text-xs text-slate-400">
                                        {(currentSEO.description?.en || "").length}/160 characters
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                        French 🇫🇷
                                    </label>
                                    <textarea
                                        value={currentSEO.description?.fr || ""}
                                        onChange={(e) => updateField("description", "fr", e.target.value)}
                                        placeholder="Livraison de carburant B2B et B2C..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none"
                                    />
                                    <p className="mt-1 text-xs text-slate-400">
                                        {(currentSEO.description?.fr || "").length}/160 characters
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Keywords & OG Image */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h3 className="font-bold text-slate-900 mb-4">Keywords</h3>
                                <input
                                    type="text"
                                    value={(currentSEO.keywords || []).join(", ")}
                                    onChange={(e) => updateField("keywords", null, e.target.value)}
                                    placeholder="fuel delivery, benin, cotonou..."
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                                />
                                <p className="mt-2 text-xs text-slate-400">Comma-separated keywords</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h3 className="font-bold text-slate-900 mb-4">OG Image URL</h3>
                                <input
                                    type="text"
                                    value={currentSEO.ogImage || ""}
                                    onChange={(e) => updateField("ogImage", null, e.target.value)}
                                    placeholder="/assets/images/og-image.jpg"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                                />
                                <p className="mt-2 text-xs text-slate-400">Image for social sharing</p>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4">🔍 Google Preview</h3>
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                <p className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
                                    {currentSEO.title?.en || "Page Title"} | GoGo Imperial Energy
                                </p>
                                <p className="text-green-700 text-sm mt-1">
                                    https://gogo.bj/{selectedPage === "home" ? "" : selectedPage}
                                </p>
                                <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                                    {currentSEO.description?.en || "Add a meta description to improve SEO..."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
