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
}

const iconMap: Record<string, LucideIcon> = {
    Smartphone,
    MapPin,
    CreditCard,
    History,
    Calendar,
    Headphones,
};

export default function AppFeatures({ features }: AppFeaturesProps) {
    const { lang } = useLang();
    const locale = lang.toLowerCase() as "en" | "fr";

    return (
        <section className="py-20 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <ScrollReveal delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            {locale === "fr" ? "Tout ce dont vous avez besoin" : "Everything You Need"}
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-slate-600 max-w-2xl mx-auto">
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
                                <div className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <IconComponent className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {feature.title[locale]}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
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
