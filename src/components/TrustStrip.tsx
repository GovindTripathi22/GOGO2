"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLang } from "@/context/LangContext";
import { motion } from "framer-motion";

interface Partner {
    name: string;
    logoUrl: string;
    websiteUrl?: string;
}

// Local fallback partners
const fallbackPartners: Partner[] = [
    { name: "MTN", logoUrl: "/assets/trust/mtn-logo.png" },
    { name: "Societe Generale", logoUrl: "/assets/trust/societe-generale-logo.png" },
    { name: "SGDS", logoUrl: "/assets/trust/sgds-logo.png" },
    { name: "MAE", logoUrl: "/assets/images/partner-mae.svg" },
];

export default function TrustStrip() {
    const [partners, setPartners] = useState<Partner[]>(fallbackPartners);
    const { t } = useLang();

    useEffect(() => {
        async function loadPartners() {
            try {
                const response = await fetch('/api/content/partners');
                if (response.ok) {
                    const data = await response.json();
                    if (data.partners && data.partners.length > 0) {
                        setPartners(data.partners);
                    }
                }
            } catch {
                console.warn('[TrustStrip] Using fallback partners');
            }
        }

        loadPartners();
    }, []);

    return (
        <section className="w-full py-10 border-y border-slate-100 bg-white overflow-hidden">
            <div className="max-w-full">
                <p className="text-center text-sm font-semibold text-slate-400 mb-8 uppercase tracking-widest">
                    {t.quote?.trusted || "Trusted by industry leaders"}
                </p>

                <div className="flex relative w-full overflow-hidden">
                    {/* Marquee Track 1 */}
                    <motion.div
                        className="flex items-center gap-16 pr-16 min-w-full flex-shrink-0"
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30 // Adjust speed here 
                        }}
                    >
                        {partners.map((partner, index) => (
                            <div key={`${partner.name}-${index}-1`} className="relative h-12 w-32 flex-shrink-0">
                                <Image
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    fill
                                    sizes="128px"
                                    className="object-contain" // Removed grayscale, keep full color
                                />
                            </div>
                        ))}
                    </motion.div>

                    {/* Marquee Track 2 (Duplicate for seamless loop) */}
                    <motion.div
                        className="flex items-center gap-16 pr-16 min-w-full flex-shrink-0"
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                    >
                        {partners.map((partner, index) => (
                            <div key={`${partner.name}-${index}-2`} className="relative h-12 w-32 flex-shrink-0">
                                <Image
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    fill
                                    sizes="128px"
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
