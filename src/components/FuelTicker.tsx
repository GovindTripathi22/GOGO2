"use client";

import { useEffect, useState } from "react";
import { fuelPrices } from "@/lib/fuel-config";
import { TrendingUp } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function FuelTicker() {
    const { t } = useLang();

    return (
        <div className="bg-black text-white h-8 overflow-hidden relative z-[60] flex items-center border-b border-white/10">
            {/* Label */}
            <div className="absolute left-0 top-0 bottom-0 bg-primary px-3 flex items-center gap-2 z-10 text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                <TrendingUp className="w-3 h-3" />
                <span>{t.ticker.live}</span>
            </div>

            {/* Marquee Content */}
            <div className="flex w-full overflow-hidden">
                <div className="animate-marquee flex items-center gap-8 whitespace-nowrap pl-24 text-xs font-medium tracking-wide text-slate-300">
                    {/* Repeated items for smooth loop */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6">
                            <span>
                                {t.ticker.super}: <span className="text-white font-bold">{fuelPrices.super} {fuelPrices.currency}</span>
                            </span>
                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                            <span>
                                {t.ticker.diesel}: <span className="text-white font-bold">{fuelPrices.diesel} {fuelPrices.currency}</span>
                            </span>
                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                            <span>
                                {t.ticker.delivery}: <span className="text-primary font-bold">{t.ticker.available}</span>
                            </span>
                            <span className="text-slate-600">|</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
