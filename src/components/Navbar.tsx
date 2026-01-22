"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { businessPortalUrl } from "@/lib/fuel-config";
import { useLang } from "@/context/LangContext";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { lang, toggleLang, t } = useLang();

    const navLinks = [
        { href: "/b2b", label: t.nav.fleet },
        { href: "/mobile-app", label: t.nav.mobileApp },
        { href: "/trust-faq", label: t.nav.trustFaq },
        { href: "/about", label: t.nav.about },
        { href: businessPortalUrl, label: t.nav.login, external: true },
    ];

    return (
        <>
            {/* Sticky White Navbar */}
            <nav
                className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300`}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden relative">
                            <Image
                                src="/reviewer/logo_circle.png"
                                alt="GoGo Imperial Energy Logo"
                                width={40}
                                height={40}
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-slate-900">GoGo</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            link.external ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-2"
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                        <span className="h-4 w-px bg-slate-300"></span>
                        <button
                            onClick={toggleLang}
                            className="text-sm font-bold text-slate-900 hover:text-primary transition-colors min-h-[44px] flex items-center"
                            aria-label="Switch Language"
                        >
                            {lang === "en" ? "EN" : "FR"} | {lang === "en" ? "FR" : "EN"}
                        </button>
                    </div>

                    {/* CTA & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/quote"
                            className="hidden sm:flex items-center justify-center bg-accent text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#d65a15] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {t.nav.quote}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-slate-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                link.external ? (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-slate-900 text-lg font-semibold hover:text-primary transition-colors py-3 min-h-[44px] flex items-center border-b border-gray-50"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-slate-900 text-lg font-semibold hover:text-primary transition-colors py-3 min-h-[44px] flex items-center border-b border-gray-50"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                            <button
                                onClick={() => {
                                    toggleLang();
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-slate-600 py-3 min-h-[44px]"
                            >
                                <span className={lang === "en" ? "text-primary font-bold" : ""}>English</span>
                                <span>/</span>
                                <span className={lang === "fr" ? "text-primary font-bold" : ""}>Français</span>
                            </button>
                            <Link
                                href="/quote"
                                onClick={() => setMobileMenuOpen(false)}
                                className="bg-accent text-white px-6 py-4 rounded-full text-base font-bold text-center mt-2 shadow-lg hover:bg-[#d65a15] transition-colors"
                            >
                                {t.nav.quote}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
