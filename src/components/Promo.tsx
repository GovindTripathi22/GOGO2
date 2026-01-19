"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";

export default function Promo() {
    const { t } = useLang();

    return (
        <section className="relative py-24 w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/promo-bg.jpg"
                    alt="Promo Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-sans">
                    {t.promo.title}
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    {t.promo.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {/* Apple Store Button Mock */}
                    <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors border border-white/20">
                        <div className="text-left">
                            <div className="text-[10px] uppercase">{t.store.downloadOn}</div>
                            <div className="text-xl font-bold leading-none">App Store</div>
                        </div>
                    </button>

                    {/* Play Store Button Mock */}
                    <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors border border-white/20">
                        <div className="text-left">
                            <div className="text-[10px] uppercase">{t.store.getItOn}</div>
                            <div className="text-xl font-bold leading-none">Google Play</div>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
