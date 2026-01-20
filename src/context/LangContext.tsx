"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { dictionary, Lang } from "@/data/translations";

// Use a looser type that accepts both EN and FR translations
type TranslationType = typeof dictionary.en | typeof dictionary.fr;

interface LangContextType {
    lang: Lang;
    toggleLang: () => void;
    t: TranslationType;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
    // Default to French as per brand requirements
    const [lang, setLang] = useState<Lang>("fr");
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const langParam = searchParams.get("lang");
        if ((langParam === "en" || langParam === "EN") && lang !== "en") {
            setLang("en");
        } else if ((langParam === "fr" || langParam === "FR") && lang !== "fr") {
            setLang("fr");
        }
        // If no param, stays as default (fr)
    }, [searchParams, lang]);

    const toggleLang = () => {
        const newLang = lang === "en" ? "fr" : "en";
        setLang(newLang);

        const params = new URLSearchParams(searchParams.toString());
        params.set("lang", newLang);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Get translations based on current language
    const t = useMemo(() => {
        return lang === "en" ? dictionary.en : dictionary.fr;
    }, [lang]);

    return (
        <LangContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    const context = useContext(LangContext);
    if (!context) {
        throw new Error("useLang must be used within a LangProvider");
    }
    return context;
}

// Re-export dictionary for direct access if needed
export { dictionary };
