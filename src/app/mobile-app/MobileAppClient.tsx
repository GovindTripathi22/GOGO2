"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppFeatures from "@/components/AppFeatures";
import HowItWorks from "@/components/HowItWorks";
import QRDownload from "@/components/QRDownload";
import appFeaturesData from "@/content/app-features.json";
import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MobileAppClient() {
    const { t } = useLang();

    return (
        <>
            <Navbar />

            <main id="main-content">
                {/* Hero Section */}
                <section className="relative bg-white text-slate-900 py-24 overflow-hidden border-b border-gray-100">
                    <div className="absolute inset-0 opacity-20">
                        <div
                            style={{
                                backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", // Light gray dots
                                backgroundSize: "24px 24px",
                            }}
                            className="w-full h-full"
                        ></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 text-center lg:text-left">
                                <ScrollReveal direction="down" delay={0.1}>
                                    <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                                        {t.heroExpanded.forIndividuals}
                                    </span>
                                </ScrollReveal>
                                <ScrollReveal delay={0.2}>
                                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-slate-900">
                                        {t.app.title} <span className="text-primary italic">{t.app.titleHighlight}</span>
                                    </h1>
                                </ScrollReveal>
                                <ScrollReveal delay={0.3}>
                                    <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-10">
                                        {t.app.subtitle}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.4} direction="up">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                        <a
                                            href="#download"
                                            className="inline-flex items-center justify-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg"
                                        >
                                            {t.heroExpanded.getApp}
                                            <ArrowRight className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="#features"
                                            className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-colors border border-slate-200"
                                        >
                                            {t.common.seeFeatures}
                                        </a>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Hero Image */}
                            <ScrollReveal direction="right" delay={0.3} className="flex-1 flex justify-center lg:justify-end">
                                <div className="relative w-[280px] md:w-[320px] transform hover:rotate-1 transition-transform duration-500">
                                    <Image
                                        src="/assets/images/app-showcase-final.png"
                                        alt="GoGo App Mobile Interface"
                                        width={400}
                                        height={800}
                                        className="w-full h-auto" // Removed drop-shadow-2xl to fix border issue
                                        priority
                                    />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

                {/* Features Grid - Dark Theme */}
                <AppFeatures features={appFeaturesData.features} theme="dark" />

                {/* How It Works */}
                <HowItWorks steps={appFeaturesData.howItWorks} />

                {/* QR Download Section */}
                <QRDownload />

                {/* CTA Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <ScrollReveal delay={0.1}>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                                {t.app.deliverySection.title}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="text-slate-600 mb-8">
                                {t.app.deliverySection.subtitle}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.3} direction="up">
                            <Link
                                href="/quote"
                                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-[#d65a15] transition-colors"
                            >
                                {t.app.deliverySection.cta}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
