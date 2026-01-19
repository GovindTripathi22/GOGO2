"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "merging" | "done">("loading");

    useEffect(() => {
        const duration = 2000; // 2 seconds loading
        const interval = 20;
        const increment = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    // Start merge animation
                    setTimeout(() => setPhase("merging"), 300);
                    // Complete after merge animation
                    setTimeout(() => {
                        setPhase("done");
                        onComplete();
                    }, 1400);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    // Smooth cubic-bezier easing for premium feel
    const smoothEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

    // Calculate animation values based on phase
    const getLogoAnimation = () => {
        if (phase === "loading") {
            return { scale: 1, x: 0, y: 0, opacity: 1 };
        }
        if (phase === "merging") {
            // Move to top-left navbar position
            return {
                scale: 0.35,
                x: "-38vw",
                y: "-42vh",
                opacity: 0
            };
        }
        return { scale: 0.35, x: "-38vw", y: "-42vh", opacity: 0 };
    };

    if (phase === "done") return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{
                opacity: phase === "merging" ? 0 : 1,
            }}
            transition={{
                duration: 0.6,
                ease: smoothEasing,
                delay: phase === "merging" ? 0.4 : 0,
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-none"
        >
            {/* Logo Container with Merge Animation */}
            <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                animate={getLogoAnimation()}
                transition={{
                    duration: 1,
                    ease: smoothEasing,
                }}
            >
                {/* Logo Image + Text Row - Centered together */}
                <motion.div
                    className="flex items-center justify-center w-full"
                    animate={{
                        gap: phase === "merging" ? "6px" : "12px",
                    }}
                    transition={{ duration: 0.8, ease: smoothEasing }}
                >
                    {/* Droplet Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        transition={{ duration: 0.6, delay: 0.1, ease: smoothEasing }}
                        className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0"
                    >
                        <Image
                            src="/assets/images/logo-main.png"
                            alt="GoGo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>

                    {/* GOGO Text with Reveal Effect */}
                    <div className="relative overflow-hidden">
                        {/* Revealed text (clipped) */}
                        <motion.span
                            className="text-5xl md:text-7xl font-bold text-white tracking-wide block"
                            style={{
                                clipPath: `inset(0 ${100 - progress}% 0 0)`,
                            }}
                        >
                            GOGO
                        </motion.span>
                        {/* Ghost text outline for layout */}
                        <span
                            className="text-5xl md:text-7xl font-bold tracking-wide absolute inset-0"
                            style={{
                                WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                                color: "transparent"
                            }}
                        >
                            GOGO
                        </span>
                    </div>
                </motion.div>

                {/* Tagline - fades in mid-progress, fades out on merge */}
                <AnimatePresence>
                    {phase === "loading" && progress > 40 && (
                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 0.6, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.4, ease: smoothEasing }}
                            className="text-gray-400 text-center text-xs uppercase mt-4"
                        >
                            Imperial Energy
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Progress Bar - Centered and aligned with logo+text combo */}
                <AnimatePresence>
                    {phase === "loading" && (
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0.8 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleY: 0 }}
                            transition={{ duration: 0.3, ease: smoothEasing }}
                            className="mt-8 w-full max-w-[280px] px-4"
                        >
                            <div className="h-[3px] bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: "linear-gradient(90deg, #FED75F 0%, #ED6A21 100%)"
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Percentage - bottom corner during loading */}
            <AnimatePresence>
                {phase === "loading" && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-6 text-gray-600 text-xs font-mono"
                    >
                        {Math.round(progress)}%
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
