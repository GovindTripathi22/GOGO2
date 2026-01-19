"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useLang } from "@/context/LangContext";

interface FAQItem {
    id: string;
    category: string;
    question: { en: string; fr: string };
    answer: { en: string; fr: string };
}

interface FAQSearchProps {
    faqs: FAQItem[];
}

const categories = [
    { id: "all", label: { en: "All", fr: "Tout" } },
    { id: "safety", label: { en: "Safety", fr: "Sécurité" } },
    { id: "pricing", label: { en: "Pricing", fr: "Tarifs" } },
    { id: "delivery", label: { en: "Delivery", fr: "Livraison" } },
    { id: "app", label: { en: "App", fr: "Application" } },
];

export default function FAQSearch({ faqs }: FAQSearchProps) {
    const { lang } = useLang();
    const locale = lang.toLowerCase() as "en" | "fr";
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFaqs = useMemo(() => {
        let result = faqs;

        if (activeCategory !== "all") {
            result = result.filter((faq) => faq.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (faq) =>
                    faq.question[locale].toLowerCase().includes(query) ||
                    faq.answer[locale].toLowerCase().includes(query)
            );
        }

        return result;
    }, [faqs, activeCategory, searchQuery, locale]);

    return (
        <div>
            {/* Search Bar */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder={locale === "fr" ? "Rechercher une question..." : "Search questions..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
                    aria-label="Search FAQ"
                />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="FAQ Categories">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        role="tab"
                        aria-selected={activeCategory === cat.id}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id
                                ? "bg-primary text-black"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                    >
                        {cat.label[locale]}
                    </button>
                ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4" role="list">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
                            role="listitem"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${faq.id}`}
                            >
                                <span className="font-bold text-slate-900 pr-4">
                                    {faq.question[locale]}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div
                                    id={`faq-answer-${faq.id}`}
                                    className="px-6 pb-6 text-slate-600 leading-relaxed"
                                >
                                    {faq.answer[locale]}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-500">
                        {locale === "fr"
                            ? "Aucun résultat trouvé."
                            : "No results found."}
                    </div>
                )}
            </div>
        </div>
    );
}
