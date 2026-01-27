/**
 * Admin Gateway Page
 * Entry point to choose between CMS and Leads Dashboard
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Briefcase, Eye, ExternalLink } from "lucide-react";

export default function AdminGateway() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center overflow-hidden border-2 border-primary/20">
                            <Image
                                src="/assets/images/logo-main.png"
                                alt="GoGo"
                                width={36}
                                height={36}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900">Admin Gateway</h1>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        View Site
                        <ExternalLink className="w-3 h-3" />
                    </Link>
                </div>
            </header>

            {/* Main Selection Area */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">

                    {/* CMS Card */}
                    <Link
                        href="/admin/cms"
                        className="group relative bg-white rounded-3xl p-8 border border-slate-200 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <LayoutDashboard className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">CMS Manager</h2>
                                <p className="text-slate-500">Manage website pages, SEO, translations, media library, and system settings.</p>
                            </div>
                            <span className="inline-flex items-center text-primary font-bold">
                                Enter CMS &rarr;
                            </span>
                        </div>
                    </Link>

                    {/* Leads Card */}
                    <Link
                        href="/admin/leads"
                        className="group relative bg-white rounded-3xl p-8 border border-slate-200 hover:border-amber-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Briefcase className="w-10 h-10 text-amber-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Leads Dashboard</h2>
                                <p className="text-slate-500">View and manage B2B quote requests, fleet details, and follow-up status.</p>
                            </div>
                            <span className="inline-flex items-center text-amber-600 font-bold">
                                View Leads &rarr;
                            </span>
                        </div>
                    </Link>

                </div>
            </main>

            <footer className="py-6 text-center text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} GoGo Imperial Energy
            </footer>
        </div>
    );
}
