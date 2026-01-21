"use client";

import { Smartphone, MapPin, CreditCard, History, Calendar, Headphones, LucideIcon } from "lucide-react";
import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Feature {
    id: string;
    icon: string;
    title: { en: string; fr: string };
    description: { en: string; fr: string };
}

interface AppFeaturesProps {
    features: Feature[];
    theme?: 'light' | 'dark';
}

const iconMap: Record<string, LucideIcon> = {
    Smartphone,
    MapPin,
    CreditCard,
    History,
    Calendar,
    Headphones,
};

export default function AppFeatures({ features, theme = 'light' }: AppFeaturesProps) {
    const { lang } = useLang();
    const locale = lang.toLowerCase() as "en" | "fr";

    const isDark = theme === 'dark';

    return (
        <section className={`py-20 ${isDark ? 'bg-slate-900 border-t border-white/10' : 'bg-white'}`} id="features">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <ScrollReveal delay={0.1}>
                        <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {locale === "fr" ? "Tout ce dont vous avez besoin" : "Everything You Need"}
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {locale === "fr"
                                ? "Une application puissante pour simplifier votre vie."
                                : "A powerful app designed to simplify your life."}
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon] || Smartphone;
                        return (
                            <ScrollReveal key={feature.id} delay={0.1 + index * 0.1} direction="up">
                                <div className={`group p-6 rounded-2xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full
                                    ${isDark
                                        ? 'bg-slate-800 border-slate-700 hover:border-primary/50'
                                        : 'bg-slate-50 border-slate-100 hover:border-primary/30'
                                    }`}>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors
                                        ${isDark ? 'bg-white/5 group-hover:bg-primary/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                                        <IconComponent className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {feature.title[locale]}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {feature.description[locale]}
                                    </p>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
