"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ArrowRight, Loader2, Search } from "lucide-react";
import { useLang } from "@/context/LangContext";
import Link from "next/link";

interface FAQItem {
    question: string;
    answer: string;
}

// Local fallback FAQs
const fallbackFaqs: FAQItem[] = [
    {
        question: "Is the fuel delivery safe?",
        answer: "Absolutely. Our trucks are purpose-built to the highest international safety standards (ADR compliant) and our drivers are certified hazardous material handlers. We treat your safety as our #1 priority.",
    },
    {
        question: "Does it cost more than the gas station?",
        answer: "No. We charge the same average price as the gas stations in your local area. The delivery fee is minimal, and often waived with our subscription plans or for B2B contracts.",
    },
    {
        question: "Where do you operate?",
        answer: "We are currently operating in Cotonou and surrounding areas in Benin, with rapid expansion plans underway.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [faqs, setFaqs] = useState<FAQItem[]>(fallbackFaqs);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { t, lang } = useLang();

    useEffect(() => {
        async function loadFAQs() {
            try {
                // Try to fetch from API route (which calls CMS)
                const response = await fetch(`/api/content/faqs?locale=${lang.toLowerCase()}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.faqs && data.faqs.length > 0) {
                        setFaqs(data.faqs);
                    }
                }
            } catch {
                console.warn('[FAQ] Using fallback content');
            } finally {
                setIsLoading(false);
            }
        }

        // Use translation FAQs if available, otherwise fetch
        if (t.faq?.items && t.faq.items.length > 0) {
            setFaqs(t.faq.items.map(item => ({
                question: item.q,
                answer: item.a
            })));
            setIsLoading(false);
        } else {
            loadFAQs();
        }
    }, [lang, t.faq?.items]);

    // Filter FAQs based on search query
    const filteredFaqs = useMemo(() => {
        if (!searchQuery.trim()) return faqs;
        const query = searchQuery.toLowerCase();
        return faqs.filter(
            (faq) =>
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query)
        );
    }, [faqs, searchQuery]);

    // Get about translations with fallbacks
    const aboutBadge = t.about?.badge || "About GoGo";
    const aboutTitle = t.about?.title || "Reinventing energy delivery for a moving world.";
    const aboutDescription = t.about?.description || "GoGo was founded with a simple mission: to give you back your time. Whether you manage a fleet of 500 vehicles or just need to fill up your family SUV, we bring the energy infrastructure to you.";
    const aboutCta = t.about?.cta || "Read our story";
    const searchPlaceholder = t.about?.searchPlaceholder || "Search answers...";
    const noResults = t.about?.noResults || "No questions found matching your search.";

    return (
        <section id="about" className="py-24 bg-neutral-surface">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* About Us Snippet */}
                    <div className="lg:w-1/3">
                        <span className="text-accent font-bold text-sm tracking-wider uppercase mb-3 block">
                            {aboutBadge}
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                            {aboutTitle}
                        </h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            {aboutDescription}
                        </p>
                        <Link
                            href="/about"
                            className="text-slate-900 font-bold hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                            {aboutCta}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="lg:w-2/3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <h3 className="text-xl font-bold text-slate-900">
                                {t.faq?.title || "Frequently Asked Questions"}
                            </h3>

                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 w-full sm:w-64"
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map((faq, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white rounded-2xl border border-slate-100 overflow-hidden transition-shadow ${openIndex === index ? "shadow-md" : ""
                                                }`}
                                        >
                                            <button
                                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                                className="w-full flex items-center justify-between p-6 text-left min-h-[44px]"
                                            >
                                                <span className="font-bold text-slate-900">{faq.question}</span>
                                                <span className={`bg-slate-100 text-slate-600 rounded-full p-1 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                                    }`}>
                                                    <ChevronDown className="w-5 h-5" />
                                                </span>
                                            </button>
                                            {openIndex === index && (
                                                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-500">
                                        {noResults}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
