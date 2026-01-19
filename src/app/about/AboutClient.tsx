"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OriginStory from "@/components/OriginStory";
import TeamGrid from "@/components/TeamGrid";
import aboutData from "@/content/about-data.json";
import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AboutClient() {
    const { t } = useLang();

    const pillars = [
        {
            icon: Zap,
            title: t.aboutPage.metrics.innovation.title,
            description: t.aboutPage.metrics.innovation.desc,
            color: "bg-amber-500",
        },
        {
            icon: Shield,
            title: t.aboutPage.metrics.safety.title,
            description: t.aboutPage.metrics.safety.desc,
            color: "bg-green-500",
        },
        {
            icon: Users,
            title: t.aboutPage.metrics.community.title,
            description: t.aboutPage.metrics.community.desc,
            color: "bg-blue-500",
        },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900 z-10" />
                    <Image
                        src="/assets/images/hero-bg.jpg"
                        alt="GoGo Operations"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6">
                    <ScrollReveal direction="down" delay={0.1}>
                        <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            {t.aboutPage.ourStory}
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
                            {t.aboutPage.heroTitle} <span className="text-primary">{t.aboutPage.heroSuffix}</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                            {t.aboutPage.heroDesc}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <ScrollReveal direction="left" delay={0.1}>
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                                <p className="text-slate-600 leading-relaxed">{t.aboutPage.mission}</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={0.2}>
                            <div className="bg-primary/10 rounded-3xl p-8 border border-primary/20">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                                <p className="text-slate-600 leading-relaxed">{t.aboutPage.vision}</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal delay={0.1}>
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
                            {t.aboutPage.driversTitle}
                        </h2>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <ScrollReveal key={pillar.title} delay={0.1 + index * 0.1} direction="up">
                                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                        <div className={`${pillar.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                                        <p className="text-slate-600">{pillar.description}</p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Origin Story Timeline */}
            <OriginStory milestones={aboutData.milestones} />

            {/* Team Grid */}
            <TeamGrid members={aboutData.team} />

            {/* CTA Section */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <ScrollReveal delay={0.1}>
                        <h2 className="text-3xl font-bold text-white mb-6">{t.aboutPage.join.title}</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-slate-400 mb-8 text-lg">{t.aboutPage.join.desc}</p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3} direction="up">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/quote"
                                className="bg-primary text-black px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                            >
                                {t.aboutPage.join.partner}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/mobile-app"
                                className="bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors border border-white/20"
                            >
                                {t.aboutPage.join.careers}
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}
