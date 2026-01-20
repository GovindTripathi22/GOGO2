"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLang } from "@/context/LangContext";

interface Partner {
    name: string;
    logoUrl: string;
    websiteUrl?: string;
}

// Local fallback partners
const fallbackPartners: Partner[] = [
    { name: "MAE", logoUrl: "/assets/images/partner-mae.svg" },
    { name: "MTN", logoUrl: "/assets/images/partner-mtn.png" },
    { name: "SGDS", logoUrl: "/assets/images/partner-sgds.png" },
    { name: "Societe Generale", logoUrl: "/assets/images/partner-socgen.png" },
    { name: "Total Energies", logoUrl: "/assets/images/trust/total-logo.svg" },
    { name: "Ministry of Energy", logoUrl: "/assets/images/trust/ministry-logo.svg" },
    { name: "ISO Certified", logoUrl: "/assets/images/trust/iso-logo.svg" },
    { name: "ADR Compliant", logoUrl: "/assets/images/trust/adr-logo.svg" },
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
        <section className="w-full py-8 border-y border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-semibold text-slate-400 mb-6 uppercase tracking-widest">
                    {t.quote?.trusted || "Trusted by industry leaders"}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner) => (
                        <div key={partner.name} className="relative h-10 w-28 opacity-60 hover:opacity-100 transition-opacity">
                            {partner.websiteUrl ? (
                                <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={partner.logoUrl}
                                        alt={`${partner.name} - GoGo Partner`}
                                        fill
                                        sizes="(max-width: 768px) 100px, 150px"
                                        className="object-contain"
                                    />
                                </a>
                            ) : (
                                <Image
                                    src={partner.logoUrl}
                                    alt={`${partner.name} - GoGo Partner`}
                                    fill
                                    sizes="(max-width: 768px) 100px, 150px"
                                    className="object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
