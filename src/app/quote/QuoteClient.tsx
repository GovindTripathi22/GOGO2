"use client";

import Navbar from "@/components/Navbar";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function QuoteClient() {
    const benefits = [
        "Save ~15% on operational costs",
        "Real-time digital receipts",
        "24/7 Priority Support",
        "Net-30 Payment Terms available"
    ];

    return (
        <main className="min-h-screen bg-neutral-surface font-sans">
            <Navbar />

            <div className="pt-8 pb-24 px-6 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumb */}
                    <ScrollReveal direction="left" delay={0.1}>
                        <div className="mb-12">
                            <Link
                                href="/"
                                className="inline-flex items-center text-slate-500 hover:text-primary transition-colors text-sm font-bold group"
                            >
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 group-hover:border-primary/30 transition-colors shadow-sm">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                Back to Home
                            </Link>
                        </div>
                    </ScrollReveal>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Value Prop */}
                        <div className="space-y-8 pt-4">
                            <div>
                                <ScrollReveal delay={0.1}>
                                    <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] text-slate-900 mb-6 tracking-tight">
                                        Fuel your fleet efficiently in <span className="text-primary relative inline-block">
                                            Benin.
                                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                                            </svg>
                                        </span>
                                    </h1>
                                </ScrollReveal>
                                <ScrollReveal delay={0.2}>
                                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                                        Join over 500+ corporate partners who trust GoGo for reliable on-site fueling, maintenance, and detailed consumption analytics.
                                    </p>
                                </ScrollReveal>
                            </div>

                            <ul className="space-y-5">
                                {benefits.map((item, i) => (
                                    <ScrollReveal key={i} delay={0.1 + i * 0.1} direction="right">
                                        <li className="flex items-center gap-4 group">
                                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                            </div>
                                            <span className="font-semibold text-slate-700 text-lg">{item}</span>
                                        </li>
                                    </ScrollReveal>
                                ))}
                            </ul>

                            {/* Trust Indicator */}
                            <ScrollReveal delay={0.5}>
                                <div className="pt-8 border-t border-slate-100">
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-4">Trusted By Leaders</p>
                                    <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
                                        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse delay-75" />
                                        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse delay-150" />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right Column: Form */}
                        <ScrollReveal direction="up" delay={0.3} className="lg:mt-0 relative z-10">
                            <div className="absolute inset-0 bg-primary/20 translate-y-4 translate-x-4 rounded-3xl -z-10 blur-xl opacity-0 lg:opacity-100" />
                            <QuoteForm />
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
