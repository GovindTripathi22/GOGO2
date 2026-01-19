"use client";

import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Step {
    step: number;
    title: { en: string; fr: string };
    description: { en: string; fr: string };
}

interface HowItWorksProps {
    steps: Step[];
}

export default function HowItWorks({ steps }: HowItWorksProps) {
    const { lang } = useLang();
    const locale = lang.toLowerCase() as "en" | "fr";

    return (
        <section className="py-20 bg-slate-50" id="how-it-works">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <ScrollReveal delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            {locale === "fr" ? "Comment ça marche" : "How It Works"}
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            {locale === "fr"
                                ? "Trois étapes simples pour ne plus jamais faire la queue."
                                : "Three simple steps to never wait at the pump again."}
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <ScrollReveal key={step.step} delay={0.2 + index * 0.15} direction="up">
                            <div className="relative text-center group">
                                {/* Step Number */}
                                <div className="w-16 h-16 bg-primary text-black font-extrabold text-2xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                    {step.step}
                                </div>

                                {/* Connector Line (between steps) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-slate-200"></div>
                                )}

                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {step.title[locale]}
                                </h3>
                                <p className="text-slate-600 text-sm max-w-xs mx-auto">
                                    {step.description[locale]}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
