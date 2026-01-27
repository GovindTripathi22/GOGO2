"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
                        <ScrollReveal direction="left" delay={0.1} className="h-full">
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 h-full flex flex-col">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.aboutPage.ourMission}</h2>
                                <p className="text-slate-600 leading-relaxed flex-1">{t.aboutPage.mission}</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={0.2} className="h-full">
                            <div className="bg-primary/10 rounded-3xl p-8 border border-primary/20 h-full flex flex-col">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.aboutPage.ourVision}</h2>
                                <p className="text-slate-600 leading-relaxed flex-1">{t.aboutPage.vision}</p>
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
                    <div className="grid md:grid-cols-3 gap-8 items-stretch">
                        {pillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <ScrollReveal key={pillar.title} delay={0.1 + index * 0.1} direction="up" className="h-full">
                                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                        <div className={`${pillar.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                                        <p className="text-slate-600 flex-1">{pillar.description}</p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Origin Story & Timeline */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Origin Text */}
                    <div className="max-w-4xl mx-auto mb-20 text-center">
                        <ScrollReveal>
                            <span className="inline-block bg-accent/10 text-accent border border-accent/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                {t.aboutPage.originTitle}
                            </span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                                {t.aboutPage.whyStarted}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="text-xl text-slate-600 leading-relaxed text-justify md:text-center">
                                {t.aboutPage.originText}
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Timeline */}
                    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-auto md:mx-auto md:max-w-3xl space-y-12 pl-8 md:pl-0">
                        {t.aboutPage.timeline.map((item, index) => (
                            <div key={index} className={`relative md:grid md:grid-cols-2 md:gap-12 md:items-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                {/* Dot */}
                                <div className="absolute top-0 left-[-39px] md:left-1/2 md:-ml-[9px] w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm z-10"></div>

                                {/* Content - Alternating */}
                                <ScrollReveal direction={index % 2 === 0 ? "right" : "left"} delay={0.1 * index} className={index % 2 === 0 ? 'md:col-start-1 md:pr-8' : 'md:col-start-2 md:pl-8'}>
                                    <div className={`mb-1 ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                                        <span className="text-sm font-bold text-accent uppercase tracking-wider block mb-2">{item.date}</span>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-600">{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



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
