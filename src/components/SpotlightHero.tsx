"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SpotlightHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Breathing Background */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    scale: [1, 1.05, 1],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Image
                    src="/assets/images/shadow-light-bg.webp"
                    alt="Golden Hour Ambiance"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
            </motion.div>

            {/* Dark Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 z-[1]" />

            {/* Content Container */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Headline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-600 mb-4"
                >
                    Energy Delivered.
                </motion.p>

                {/* Sub-Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-12"
                >
                    Where You Need It.
                </motion.h1>

                {/* Hero Image - 3D Truck */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                    className="relative w-full max-w-lg mx-auto mb-12"
                >
                    <div className="relative h-48 md:h-64 lg:h-80">
                        <Image
                            src="/assets/images/gogo-truck-side.png"
                            alt="GoGo Fuel Truck"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                    {/* Floor Shadow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-xl rounded-full" />
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <a
                        href="#services"
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all hover:scale-105 shadow-xl"
                    >
                        Explore Services
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-black/30 rounded-full flex items-start justify-center p-2"
                >
                    <motion.div className="w-1.5 h-1.5 bg-black rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
