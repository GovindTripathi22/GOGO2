/**
 * Admin Settings Page
 * Site configuration interface with live preview
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Settings, Save, Check, Palette, Globe, Mail, Loader2, Eye } from "lucide-react";
import ThemePreview from "@/components/ThemePreview";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        siteName: "",
        tagline: "",
        primaryColor: "#FED75F",
        accentColor: "#ED6A21",
        contactEmail: "",
        contactPhone: "",
        defaultLanguage: "en"
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            if (res.ok) {
                const data = await res.json();
                setSettings(data);
            }
        } catch (error) {
            console.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            }
        } catch (error) {
            console.error("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const colorOptions = [
        { name: "Gold", value: "#FED75F" },
        { name: "Blue", value: "#3B82F6" },
        { name: "Green", value: "#22C55E" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Cyan", value: "#06B6D4" },
        { name: "Dark", value: "#1e293b" },
    ];

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading settings...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row h-screen overflow-hidden">
            {/* Left Panel: Settings Form */}
            <div className="w-full lg:flex-1 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto">
                {/* Header inside left panel */}
                <header className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <Link href="/admin" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-500 p-2 rounded-xl text-white">
                            <Settings className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Settings</h1>
                            <p className="text-xs text-slate-500">Site customizations</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm shadow-sm ${saved
                            ? "bg-green-500 text-white"
                            : "bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
                            }`}
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {saved ? "Saved!" : saving ? "Saving..." : "Save"}
                    </button>
                </header>

                {/* Form Content */}
                <div className="p-6 space-y-6 max-w-2xl">
                    {/* Theme Colors */}
                    <section className="bg-slate-50 rounded-xl p-5">
                        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-purple-500" />
                            Theme Colors
                        </h2>

                        {/* Primary Color */}
                        <div className="mb-5">
                            <label className="text-xs font-medium text-slate-500 block mb-2">Primary Brand Color</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setSettings({ ...settings, primaryColor: color.value })}
                                        className={`w-9 h-9 rounded-full border-2 transition-all ${settings.primaryColor === color.value
                                            ? "border-slate-900 ring-2 ring-slate-900/20 scale-110"
                                            : "border-transparent hover:scale-105"
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200">
                                <input
                                    type="color"
                                    value={settings.primaryColor}
                                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                    className="h-8 w-8 cursor-pointer rounded border-none"
                                />
                                <span className="text-xs font-mono text-slate-500">{settings.primaryColor}</span>
                            </div>
                        </div>

                        {/* Accent Color */}
                        <div>
                            <label className="text-xs font-medium text-slate-500 block mb-2">Accent Color</label>
                            <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200">
                                <input
                                    type="color"
                                    value={settings.accentColor}
                                    onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                                    className="h-8 w-8 cursor-pointer rounded border-none"
                                />
                                <span className="text-xs font-mono text-slate-500">{settings.accentColor}</span>
                            </div>
                        </div>
                    </section>

                    {/* General Info */}
                    <section className="bg-slate-50 rounded-xl p-5">
                        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-500" />
                            General Info
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Site Name</label>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Language</label>
                                <select
                                    value={settings.defaultLanguage}
                                    onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 text-sm"
                                >
                                    <option value="en">English</option>
                                    <option value="fr">Français</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-medium text-slate-500 mb-1">Tagline</label>
                                <input
                                    type="text"
                                    value={settings.tagline}
                                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 text-sm"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-slate-50 rounded-xl p-5">
                        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-green-500" />
                            Contact Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={settings.contactPhone}
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 text-sm"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Right Panel: Live Preview */}
            <aside className="hidden lg:block w-96 xl:w-[480px] bg-slate-900 p-6 sticky top-0 h-screen overflow-auto">
                <div className="flex items-center gap-2 text-white mb-4">
                    <Eye className="w-5 h-5" />
                    <h3 className="font-semibold">Live Preview</h3>
                </div>
                <ThemePreview settings={settings} />
                <p className="text-slate-400 text-xs mt-4 text-center">
                    Preview updates as you type
                </p>
            </aside>
        </div>
    );
}
