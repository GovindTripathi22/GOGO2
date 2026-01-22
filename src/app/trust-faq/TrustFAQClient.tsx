"use client";

import Link from "next/link";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSearch from "@/components/FAQSearch";
import TrustLogos from "@/components/TrustLogos";
import faqData from "@/content/faq-data.json";
import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TrustFAQClient() {
    const { t } = useLang();

    const trustBadges = [
        {
            icon: Shield,
            title: t.trustPage.badges.safety.title,
            description: t.trustPage.badges.safety.desc,
            delay: 0.2,
        },
        {
            icon: Clock,
            title: t.trustPage.badges.support.title,
            description: t.trustPage.badges.support.desc,
            delay: 0.3,
        },
        {
            icon: Award,
            title: t.trustPage.badges.quality.title,
            description: t.trustPage.badges.quality.desc,
            delay: 0.4,
        },
    ];

    return (
        <>
            <Navbar />

            <main id="main-content">
                {/* Hero Section */}
                <section className="bg-slate-900 text-white py-20">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <ScrollReveal delay={0.1}>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                                {t.trustPage.title}
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                                {t.trustPage.subtitle}
                            </p>
                        </ScrollReveal>

                        {/* Trust Badges */}
                        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
                            {trustBadges.map((badge) => {
                                const Icon = badge.icon;
                                return (
                                    <ScrollReveal key={badge.title} delay={badge.delay} direction="up" className="h-full flex flex-col">
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                                            <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                            <h3 className="font-bold text-white mb-1">{badge.title}</h3>
                                            <p className="text-sm text-slate-400 flex-1">{badge.description}</p>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-white" id="faq">
                    <div className="max-w-4xl mx-auto px-6">
                        <ScrollReveal delay={0.1}>
                            <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12">
                                {t.trustPage.faqTitle}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <FAQSearch faqs={faqData.faqs} />
                        </ScrollReveal>
                    </div>
                </section>

                {/* Trust Logos */}
                <TrustLogos />

                {/* Blog Teaser */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-8">
                            <ScrollReveal direction="left" delay={0.1}>
                                <h2 className="text-2xl font-bold text-slate-900">{t.trustPage.latestNews}</h2>
                            </ScrollReveal>
                            <ScrollReveal direction="right" delay={0.1}>
                                <Link
                                    href="/blog"
                                    className="text-accent font-bold flex items-center gap-1 hover:underline"
                                >
                                    {t.trustPage.viewAll} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </ScrollReveal>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <ScrollReveal key={i} delay={0.1 + i * 0.1} direction="up">
                                    <Link
                                        href="/blog"
                                        className="block bg-slate-50 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <span className="text-xs text-slate-500 uppercase font-bold">{t.trustPage.blogTeaser.newsLabel}</span>
                                        <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2">
                                            {t.trustPage.blogTeaser.placeholderTitle}
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            {t.trustPage.blogTeaser.placeholderDesc}
                                        </p>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-slate-900">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <ScrollReveal delay={0.1}>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                {t.trustPage.cta.title}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="text-slate-400 mb-8">
                                {t.trustPage.cta.desc}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.3} direction="up">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/quote"
                                    className="inline-flex items-center justify-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-colors"
                                >
                                    {t.trustPage.cta.b2b}
                                </Link>
                                <Link
                                    href="/mobile-app"
                                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors border border-white/20"
                                >
                                    {t.trustPage.cta.app}
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
