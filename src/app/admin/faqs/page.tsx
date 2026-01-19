/**
 * Admin FAQs Page
 * Simple FAQ management interface
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit2, Trash2, Check, X, HelpCircle } from "lucide-react";
import { getFaqs } from "@/lib/local-cms";

interface FAQ {
    id: string;
    question: { en: string; fr: string };
    answer: { en: string; fr: string };
    category: string;
}

export default function AdminFaqsPage() {
    const [faqs, setFaqs] = useState<FAQ[]>(getFaqs());
    const [editingId, setEditingId] = useState<string | null>(null);
    const [language, setLanguage] = useState<"en" | "fr">("en");
    const [showAddForm, setShowAddForm] = useState(false);

    // Mock add functionality
    const handleAdd = () => {
        const newFaq: FAQ = {
            id: String(Date.now()),
            question: { en: "New Question", fr: "Nouvelle Question" },
            answer: { en: "Answer here...", fr: "Réponse ici..." },
            category: "general"
        };
        setFaqs([...faqs, newFaq]);
        setShowAddForm(false);
    };

    // Mock delete functionality
    const handleDelete = (id: string) => {
        if (confirm("Delete this FAQ?")) {
            setFaqs(faqs.filter(f => f.id !== id));
        }
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
                            <div className="bg-green-500 p-2 rounded-xl text-white">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">FAQs</h1>
                                <p className="text-sm text-slate-500">{faqs.length} questions</p>
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
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add FAQ
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* FAQ List */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-green-300 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                            {faq.category}
                                        </span>
                                        <span className="text-xs text-slate-400">#{index + 1}</span>
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">
                                        {faq.question[language]}
                                    </h3>
                                    <p className="text-slate-600 text-sm">
                                        {faq.answer[language]}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingId(faq.id)}
                                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq.id)}
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

                {faqs.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No FAQs yet. Click "Add FAQ" to create one.</p>
                    </div>
                )}

                {/* Help Text */}
                <div className="mt-8 bg-slate-100 rounded-xl p-4">
                    <p className="text-sm text-slate-600">
                        💡 <strong>Tip:</strong> Toggle between EN/FR to see content in different languages.
                        Click the edit icon to modify a question.
                    </p>
                </div>
            </main>
        </div>
    );
}
