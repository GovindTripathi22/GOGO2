"use client";

import { Fuel, Wrench, BarChart3, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function B2BSolutions() {
    const { lang, t } = useLang();
    const isFr = lang.toLowerCase() === "fr";

    const services = [
        {
            icon: Fuel,
            title: isFr ? "Ravitaillement à la Demande" : "On-Demand Fueling",
            description: isFr
                ? "Économisez le temps de vos employés en faisant ravitailler votre flotte par nos camions certifiés pendant la nuit."
                : "Save employee time and reduce mileage by having our certified trucks refuel your fleet overnight or during downtime.",
            highlighted: true,
            delay: 0.2
        },
        {
            icon: Wrench,
            title: isFr ? "Maintenance Mobile" : "Mobile Maintenance",
            description: isFr
                ? "Des vidanges aux remplacements de batterie, nous amenons l'atelier à votre parking."
                : "From oil changes to battery replacements, we bring the workshop to your parking lot, minimizing vehicle downtime.",
            highlighted: false,
            delay: 0.4
        },
        {
            icon: BarChart3,
            title: isFr ? "Analyses Avancées" : "Advanced Analytics",
            description: isFr
                ? "Suivez la consommation de carburant, l'empreinte carbone et les dépenses en temps réel."
                : "Track fuel consumption, carbon footprint, and spending in real-time with our comprehensive dashboard.",
            highlighted: false,
            delay: 0.6
        },
    ];

    return (
        <section id="services" className="py-24 bg-neutral-surface relative overflow-hidden">
            {/* Decorative gradient blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <ScrollReveal direction="right" delay={0.1}>
                            <span className="text-accent font-bold text-sm tracking-wider uppercase mb-2 block">
                                {isFr ? "Solutions Entreprises" : "Corporate Solutions"}
                            </span>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                                {isFr ? (
                                    <>Solutions pour <br />Flottes & Entreprises.</>
                                ) : (
                                    <>Solutions for <br />Fleets & Corporate.</>
                                )}
                            </h2>
                        </ScrollReveal>
                    </div>
                    <ScrollReveal direction="left" delay={0.3}>
                        <a
                            href="https://gogofuelapp.on-demand-app.com/business/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors"
                        >
                            {isFr ? "Accéder au Portail B2B" : "Go to B2B Platform"}
                            <ArrowUpRight className="w-5 h-5" />
                        </a>
                    </ScrollReveal>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ScrollReveal key={service.title} delay={service.delay} direction="up" className="h-full">
                            <div
                                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 h-full"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.highlighted
                                    ? "bg-primary/20 text-accent"
                                    : "bg-slate-100 text-slate-900"
                                    }`}>
                                    <service.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{service.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
