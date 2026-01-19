"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Truck,
    BarChart3,
    CreditCard,
    ShieldCheck,
    Fuel,
    Database,
    LayoutDashboard,
    Users
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LangContext";
import { businessPortalUrl } from "@/lib/fuel-config";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function B2BClient() {
    const { t } = useLang();

    const solutions = [
        { icon: Fuel, title: t.b2b.features.onsite, desc: t.b2b.features.onsiteDesc, color: "blue", items: ["Super (Gasoline)", "Diesel (Gasoil)"], delay: 0.1 },
        { icon: Database, title: "Industrial Lubricants", desc: "Premium lubricants for heavy machinery and fleet vehicles.", color: "amber", items: ["Engine Oils", "Hydraulic Fluids"], delay: 0.2 },
        { icon: ShieldCheck, title: "Safety & Quality", desc: "ISO-compliant operations ensuring zero contamination and maximum safety.", color: "green", items: ["Digital Metering", "Certified Drivers"], delay: 0.3 },
    ];

    const features = [
        { icon: LayoutDashboard, title: "Order Management", desc: "Schedule deliveries and track real-time status.", color: "blue", delay: 0.1 },
        { icon: CreditCard, title: "Digital Vouchers", desc: "Issue secure e-vouchers to drivers for controlled refueling.", color: "purple", delay: 0.2 },
        { icon: BarChart3, title: "Automated Reporting", desc: "Detailed consumption reports per vehicle and consolidated invoicing.", color: "orange", delay: 0.3 },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* B2B Hero */}
            <section className="relative bg-slate-900 text-white pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80 z-10" />
                    <Image
                        src="/assets/images/b2b-driver.jpg"
                        alt="GoGo Fleet"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-40 mix-blend-overlay"
                        priority
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <ScrollReveal direction="down" delay={0.1}>
                            <span className="inline-block bg-accent/20 text-accent border border-accent/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                {t.b2b.badge}
                            </span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                                {t.b2b.title}
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.3}>
                            <p className="text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
                                {t.b2b.subtitle}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.4} direction="up">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={businessPortalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-[#d65a15] transition-all shadow-lg hover:shadow-accent/25"
                                >
                                    {t.b2b.cta}
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <Link
                                    href="/quote"
                                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all border border-white/20"
                                >
                                    {t.nav.quote}
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Offer Details: Fuel & Lubes */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <ScrollReveal delay={0.1}>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Energy Solutions</h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="text-slate-600">Reliable supply of premium fuels and industrial lubricants, delivered directly to your equipment.</p>
                        </ScrollReveal>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {solutions.map((sol) => (
                            <ScrollReveal key={sol.title} delay={sol.delay} direction="up">
                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                                    <div className={`w-12 h-12 bg-${sol.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                                        <sol.icon className={`w-6 h-6 text-${sol.color}-600`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{sol.title}</h3>
                                    <p className="text-slate-600 mb-4">{sol.desc}</p>
                                    <ul className="space-y-2 text-sm text-slate-500">
                                        {sol.items.map((item) => (
                                            <li key={item} className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-${sol.color}-500`} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Platform */}
            <section className="py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal direction="left" delay={0.2} className="order-2 lg:order-1">
                            <div className="relative">
                                {/* Mock Dashboard UI */}
                                <div className="bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800 relative z-10 rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                        <div className="ml-auto text-xs text-slate-500 font-mono">B2B PORTAL v2.0</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-800 p-4 rounded-lg">
                                            <div className="text-slate-400 text-xs mb-1">Fleet Consumption</div>
                                            <div className="text-2xl font-bold text-white">4,250 L</div>
                                            <div className="text-green-500 text-xs mt-1">↑ 12% vs last month</div>
                                        </div>
                                        <div className="bg-slate-800 p-4 rounded-lg">
                                            <div className="text-slate-400 text-xs mb-1">Active Vouchers</div>
                                            <div className="text-2xl font-bold text-white">28</div>
                                            <div className="text-blue-500 text-xs mt-1">All valid</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 bg-slate-800 rounded w-full" />
                                        <div className="h-2 bg-slate-800 rounded w-3/4" />
                                        <div className="h-2 bg-slate-800 rounded w-1/2" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-accent/20 blur-3xl -z-10 transform translate-x-12 translate-y-12" />
                            </div>
                        </ScrollReveal>

                        <div className="order-1 lg:order-2">
                            <ScrollReveal direction="right" delay={0.1}>
                                <span className="text-accent font-bold tracking-wider text-sm uppercase mb-2 block">Available Now</span>
                            </ScrollReveal>
                            <ScrollReveal delay={0.2}>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                                    Complete Fleet Control<br />
                                    <span className="text-slate-400">At Your Fingertips.</span>
                                </h2>
                            </ScrollReveal>
                            <ScrollReveal delay={0.3}>
                                <p className="text-lg text-slate-600 mb-8">
                                    Our proprietary B2B Platform gives you transparency and control over your energy spend.
                                    Say goodbye to lost receipts and unauthorized fill-ups.
                                </p>
                            </ScrollReveal>

                            <ul className="space-y-6">
                                {features.map((feat) => (
                                    <ScrollReveal key={feat.title} delay={feat.delay + 0.3} direction="right">
                                        <li className="flex gap-4">
                                            <div className={`w-10 h-10 rounded-full bg-${feat.color}-50 text-${feat.color}-600 flex items-center justify-center flex-shrink-0`}>
                                                <feat.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{feat.title}</h4>
                                                <p className="text-sm text-slate-600">{feat.desc}</p>
                                            </div>
                                        </li>
                                    </ScrollReveal>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <ScrollReveal delay={0.1}>
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to optimize your fleet?</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-slate-400 mb-8 text-lg">
                            Join the leading companies in Benin trusting GoGo for their energy needs.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3} direction="up">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/quote"
                                className="bg-accent hover:bg-[#d65a15] text-white px-8 py-4 rounded-full font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                Request a Quote
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href={businessPortalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-colors border border-white/20"
                            >
                                Client Login
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}
