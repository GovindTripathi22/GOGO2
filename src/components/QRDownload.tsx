"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { trackAppDownload } from "@/lib/analytics";
import { motion } from "framer-motion";

interface QRDownloadProps {
    appStoreUrl?: string;
    playStoreUrl?: string;
}

export default function QRDownload({
    appStoreUrl = "https://apps.apple.com/us/iphone/today",
    playStoreUrl = "https://play.google.com/store/apps?pli=1",
}: QRDownloadProps) {
    const { lang, t } = useLang();
    const isFr = lang === "fr";

    const handleAppStoreClick = () => {
        trackAppDownload("ios");
        window.open(appStoreUrl, "_blank");
    };

    const handlePlayStoreClick = () => {
        trackAppDownload("android");
        window.open(playStoreUrl, "_blank");
    };

    return (
        <section className="py-20 bg-white" id="download">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left: App Mockup */}
                    <div className="flex-1 relative">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-[240px] md:w-[280px] mx-auto"
                        >
                            <Image
                                src="/assets/images/app-showcase-final.png"
                                alt="GoGo App Login Screen"
                                width={300}
                                height={600}
                                className="w-full h-auto hover:scale-105 transition-transform duration-500" // Removed drop-shadow-2xl
                            />
                        </motion.div>
                    </div>

                    {/* Right: QR + Badges */}
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            {isFr ? "Téléchargez l'application" : "Download the App"}
                        </h2>
                        <p className="text-slate-600 mb-8 max-w-md">
                            {isFr
                                ? "Scannez le QR code ou cliquez sur les boutons ci-dessous."
                                : "Scan the QR code or click the buttons below to get started."}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {/* QR Code */}
                            <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100" aria-label="QR Code to download GoGo app">
                                <Image
                                    src="/assets/images/qr-app-download.svg"
                                    alt="QR Code for GoGo App Download"
                                    width={120}
                                    height={120}
                                    className="w-28 h-28"
                                />
                            </div>

                            {/* Store Badges */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleAppStoreClick}
                                    className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <div className="text-left">
                                        <span className="text-[10px] uppercase text-slate-400 block">{t.store.downloadOn}</span>
                                        <span className="text-sm">App Store</span>
                                    </div>
                                </button>

                                <button
                                    onClick={handlePlayStoreClick}
                                    className="flex items-center gap-3 bg-slate-100 text-slate-900 border border-slate-200 px-5 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z" />
                                    </svg>
                                    <div className="text-left">
                                        <span className="text-[10px] uppercase text-slate-500 block">{t.store.getItOn}</span>
                                        <span className="text-sm">Google Play</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
