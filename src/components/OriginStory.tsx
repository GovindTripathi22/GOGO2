"use client";

import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Milestone {
    year: string;
    title: { en: string; fr: string };
    description: { en: string; fr: string };
}

interface OriginStoryProps {
    milestones: Milestone[];
}

export default function OriginStory({ milestones }: OriginStoryProps) {
    const { lang } = useLang();
    const locale = lang.toLowerCase() as "en" | "fr";

    return (
        <section className="py-20 bg-slate-50" id="story">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <ScrollReveal delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            {locale === "fr" ? "Notre Histoire" : "Our Story"}
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            {locale === "fr"
                                ? "Du concept à la réalité : comment GoGo est né."
                                : "From concept to reality: how GoGo came to be."}
                        </p>
                    </ScrollReveal>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <ScrollReveal
                                key={milestone.year}
                                delay={0.1 + index * 0.15}
                                direction={index % 2 === 0 ? "left" : "right"}
                            >
                                <div
                                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div
                                            className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                                }`}
                                        >
                                            <span className="text-primary font-extrabold text-2xl">
                                                {milestone.year}
                                            </span>
                                            <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2">
                                                {milestone.title[locale]}
                                            </h3>
                                            <p className="text-slate-600">
                                                {milestone.description[locale]}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline Dot */}
                                    <div className="hidden md:flex w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg relative z-10"></div>

                                    {/* Spacer */}
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
