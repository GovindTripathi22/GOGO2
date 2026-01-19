/**
 * HeroPreview Component
 * Live preview of Hero section for CMS editor
 */

"use client";

import Image from "next/image";

interface HeroPreviewProps {
    content: {
        title?: { en: string; fr: string };
        subtitle?: { en: string; fr: string };
        image?: string;
    };
    lang: 'en' | 'fr';
    primaryColor?: string;
}

export default function HeroPreview({ content, lang, primaryColor = "#FED75F" }: HeroPreviewProps) {
    const title = content.title?.[lang] || (lang === 'en' ? "Your Title Here" : "Votre Titre Ici");
    const subtitle = content.subtitle?.[lang] || (lang === 'en' ? "Your subtitle text..." : "Votre sous-titre...");

    return (
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser Chrome */}
            <div className="bg-slate-700 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-slate-600 rounded px-3 py-1 text-xs text-slate-300 text-center">
                    gogo.bj
                </div>
            </div>

            {/* Hero Preview */}
            <div className="relative h-64 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={content.image || "/assets/images/hero-fueling.jpg"}
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
                    {/* Badge */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full mb-3">
                        <span className="text-[8px] font-bold text-white uppercase">
                            {lang === 'en' ? 'Now Available' : 'Disponible'}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-extrabold text-white mb-2 leading-tight">
                        {title || <span className="opacity-50">{lang === 'en' ? "Enter title..." : "Entrez le titre..."}</span>}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-200 mb-4 max-w-xs">
                        {subtitle || <span className="opacity-50">{lang === 'en' ? "Enter subtitle..." : "Entrez sous-titre..."}</span>}
                    </p>

                    {/* CTA Button */}
                    <button
                        className="text-[10px] font-bold px-4 py-2 rounded-full transition-colors"
                        style={{
                            backgroundColor: primaryColor,
                            color: isLightColor(primaryColor) ? '#000' : '#fff'
                        }}
                    >
                        {lang === 'en' ? 'Get Started' : 'Commencer'}
                    </button>
                </div>
            </div>

            {/* Cards Preview */}
            <div className="bg-white p-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-2">
                        <div
                            className="w-6 h-6 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: primaryColor }}
                        />
                        <div className="flex-1">
                            <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                            <div className="w-2/3 h-2 bg-slate-200 rounded" />
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex-shrink-0 bg-orange-500" />
                        <div className="flex-1">
                            <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                            <div className="w-2/3 h-2 bg-slate-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function isLightColor(color: string): boolean {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
}
