"use client";

import Image from "next/image";

import { useLang } from "@/context/LangContext";

interface Logo {
    name: string;
    src: string;
}

const trustLogos: Logo[] = [
    { name: "ADR Certified", src: "/assets/images/trust/adr-logo.svg" },
    { name: "ISO 9001", src: "/assets/images/trust/iso-logo.svg" },
    { name: "Benin Ministry of Energy", src: "/assets/images/trust/ministry-logo.svg" },
    { name: "Total Energies Partner", src: "/assets/images/trust/total-logo.svg" },
];

export default function TrustLogos() {
    const { t } = useLang();

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-center text-xl font-bold text-slate-900 mb-8">
                    {t.trust.title}
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {trustLogos.map((logo) => (
                        <div
                            key={logo.name}
                            className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-3"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={80}
                                height={40}
                                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
