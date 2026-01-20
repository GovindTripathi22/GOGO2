"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    direction?: "vertical" | "horizontal";
    gestureDirection?: "vertical" | "horizontal";
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const options: LenisOptions = {
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        };

        const lenis = new Lenis(options);

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
