import { useRef } from "react";
import Image from "next/image";
import { Truck, QrCode } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { trackAppDownload } from "@/lib/analytics";
import { useLang } from "@/context/LangContext";

export default function AppSection() {
    const { lang, t } = useLang();
    const isFr = lang === "fr";
    const sectionRef = useRef(null);

    const handleAppStoreClick = () => {
        trackAppDownload("ios");
        window.open("https://apps.apple.com/us/iphone/today", "_blank");
    };

    const handlePlayStoreClick = () => {
        trackAppDownload("android");
        window.open("https://play.google.com/store/apps?pli=1", "_blank");
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Create a smooth parallax effect
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden" id="app">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-slate-900 rounded-[48px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    ></div>

                    {/* Left Content */}
                    <div className="flex-1 relative z-10 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                                {t.app.title} <br /><span className="text-primary">{t.app.titleHighlight}</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto md:mx-0">
                                {t.app.subtitle}
                                <span className="block mt-2 text-white font-medium">
                                    {isFr ? "Disponible sur iOS et Android." : "Available on iOS and Android."}
                                </span>
                            </p>

                            {/* App Store Buttons & QR Code */}
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    <button
                                        onClick={handleAppStoreClick}
                                        className="flex items-center justify-center gap-3 bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 hover:scale-105 active:scale-95 duration-300"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                        </svg>
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-[10px] uppercase font-medium text-slate-500">
                                                {isFr ? "Télécharger sur" : "Download on the"}
                                            </span>
                                            <span className="text-sm">{t.app.appStore}</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={handlePlayStoreClick}
                                        className="flex items-center justify-center gap-3 bg-slate-800 text-white border border-slate-700 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-700 transition-colors shadow-lg hover:scale-105 active:scale-95 duration-300"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z" />
                                        </svg>
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-[10px] uppercase font-medium text-slate-400">
                                                {isFr ? "Télécharger sur" : "Get it on"}
                                            </span>
                                            <span className="text-sm">{t.app.playStore}</span>
                                        </div>
                                    </button>
                                </div>

                                {/* QR Code Section (Desktop only) */}
                                <div className="hidden md:flex items-center gap-4 mt-2">
                                    <div className="bg-white p-2 rounded-lg shadow-lg">
                                        <div className="w-20 h-20 bg-slate-100 flex items-center justify-center rounded">
                                            <QrCode className="w-12 h-12 text-slate-900" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-400 max-w-[150px]">
                                        {isFr
                                            ? "Scannez pour télécharger sur votre appareil."
                                            : "Scan to download instantly on your device."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Phone Mockup - Showcase Image */}
                    <div className="flex-1 flex justify-center items-end relative z-10 -mb-24 md:-mb-32 lg:-mb-40">
                        <motion.div
                            style={{ y }}
                            className="relative w-full max-w-[400px] md:max-w-[500px]"
                        >
                            <Image
                                src="/assets/images/app-showcase-final.png"
                                alt="GoGo App Showcase"
                                width={600}
                                height={800}
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
