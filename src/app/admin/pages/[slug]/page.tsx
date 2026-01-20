/**
 * Visual Editor for Pages
 * Split screen: Form (Left) | Live Preview (Right)
 * Optimized for full-screen usage with Web/Mobile toggles
 */

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Check, Image as ImageIcon, X, Globe, Eye, Smartphone, Monitor } from "lucide-react";
import HeroPreview from "@/components/HeroPreview";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

interface PageContent {
    hero: {
        title: { en: string; fr: string };
        subtitle: { en: string; fr: string };
        image: string;
    };
}

export default function PageEditor() {
    const params = useParams();
    // const router = useRouter(); // Unused
    const slug = params.slug as string;

    const [content, setContent] = useState<PageContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Image Picker State
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [mediaFiles, setMediaFiles] = useState<{ url: string }[]>([]);

    // Preview State
    const [previewLang, setPreviewLang] = useState<'en' | 'fr'>('fr');
    const [previewMode, setPreviewMode] = useState<'mobile' | 'web'>('mobile');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch(`/api/admin/pages/${slug}/content`);
                if (res.ok) {
                    const data = await res.json();
                    setContent(data);
                }
            } catch (error: unknown) {
                console.error("Failed to load content", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [slug]);

    const fetchMedia = async () => {
        try {
            const res = await fetch("/api/admin/media");
            if (res.ok) {
                const data = await res.json();
                setMediaFiles(data.media || []);
            }
        } catch (error) {
            console.error("Failed to load media");
        }
    };

    const openImagePicker = () => {
        setShowImagePicker(true);
        fetchMedia();
    };

    const handleSave = async () => {
        if (!content) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/pages/${slug}/content`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content)
            });

            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            }
        } catch (error) {
            alert("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading editor...</div>;
    if (!content) return <div className="min-h-screen flex items-center justify-center text-slate-500">Page not found</div>;

    // Only "home" is supported for now
    const isHome = slug === 'home';

    return (
        <div className={`h-screen w-full bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans ${montserrat.className}`}>

            {/* Left Panel: Editor Form (Fluid Width) */}
            <div className={`flex-1 flex flex-col h-full bg-white border-r border-slate-200 shadow-sm z-10 duration-300 ${previewMode === 'web' ? 'lg:w-1/3 max-w-[500px]' : 'lg:w-1/2'}`}>
                {/* Header */}
                <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/pages" className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-bold text-slate-900 text-lg capitalize leading-none">{slug} Page</h1>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">Content Editor</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-sm ${saved
                            ? "bg-green-500 text-white shadow-green-200"
                            : "bg-[#FFB300] text-white hover:bg-[#F57F17] shadow-orange-200"
                            }`}
                    >
                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        {saved ? "SAVED" : "SAVE CHANGES"}
                    </button>
                </header>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 no-scrollbar">
                    {isHome ? (
                        <>
                            {/* Hero Visual */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                                    <ImageIcon className="w-4 h-4 text-[#FFB300]" />
                                    <h3>Hero Visual</h3>
                                </div>
                                <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group shadow-sm hover:shadow-md transition-all">
                                    <Image
                                        src={content.hero?.image || "/assets/images/hero-fueling.jpg"}
                                        alt="Hero content"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <button
                                            onClick={openImagePicker}
                                            className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#FFB300] hover:text-white transition-colors"
                                        >
                                            Change Image
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Content Fields */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-t border-slate-100 pt-6">
                                    <Globe className="w-4 h-4 text-[#FFB300]" />
                                    <h3>Localized Content</h3>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                    {/* English */}
                                    <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xl">🇬🇧</span>
                                            <span className="text-xs font-bold text-slate-500 uppercase">English</span>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Headline</label>
                                            <input
                                                type="text"
                                                value={content.hero?.title?.en || ""}
                                                onChange={(e) => setContent({
                                                    ...content,
                                                    hero: { ...content.hero, title: { ...content.hero.title, en: e.target.value } }
                                                })}
                                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-[#FFB300] focus:ring-2 focus:ring-[#FFB300]/10 outline-none transition-all"
                                                placeholder="Enter compelling headline..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Subheadline</label>
                                            <textarea
                                                value={content.hero?.subtitle?.en || ""}
                                                onChange={(e) => setContent({
                                                    ...content,
                                                    hero: { ...content.hero, subtitle: { ...content.hero.subtitle, en: e.target.value } }
                                                })}
                                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm h-24 resize-none focus:border-[#FFB300] focus:ring-2 focus:ring-[#FFB300]/10 outline-none transition-all"
                                                placeholder="Enter descriptive subtitle..."
                                            />
                                        </div>
                                    </div>

                                    {/* French */}
                                    <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xl">🇫🇷</span>
                                            <span className="text-xs font-bold text-slate-500 uppercase">Français</span>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Titre Principal</label>
                                            <input
                                                type="text"
                                                value={content.hero?.title?.fr || ""}
                                                onChange={(e) => setContent({
                                                    ...content,
                                                    hero: { ...content.hero, title: { ...content.hero.title, fr: e.target.value } }
                                                })}
                                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-[#FFB300] focus:ring-2 focus:ring-[#FFB300]/10 outline-none transition-all"
                                                placeholder="Entrez le titre principal..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Sous-titre</label>
                                            <textarea
                                                value={content.hero?.subtitle?.fr || ""}
                                                onChange={(e) => setContent({
                                                    ...content,
                                                    hero: { ...content.hero, subtitle: { ...content.hero.subtitle, fr: e.target.value } }
                                                })}
                                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm h-24 resize-none focus:border-[#FFB300] focus:ring-2 focus:ring-[#FFB300]/10 outline-none transition-all"
                                                placeholder="Entrez le sous-titre..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                            <Monitor className="w-12 h-12 mb-4 opacity-20" />
                            <p>Visual editing is currently only available for the Home page.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Live Preview (Responsive) */}
            <div className={`hidden lg:flex flex-col bg-slate-100 relative transition-all duration-300 ${previewMode === 'web' ? 'flex-[2]' : 'w-[480px]'}`}>
                {/* Toolbar */}
                <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm z-20">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-100 p-1 rounded-lg flex text-slate-500">
                            <button
                                onClick={() => setPreviewMode('mobile')}
                                className={`p-2 rounded-md transition-all ${previewMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-700'}`}
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPreviewMode('web')}
                                className={`p-2 rounded-md transition-all ${previewMode === 'web' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-700'}`}
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">
                            {previewMode === 'mobile' ? 'Mobile View' : 'Desktop View'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-slate-100 rounded-lg p-1">
                            <button
                                onClick={() => setPreviewLang('en')}
                                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${previewLang === 'en'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setPreviewLang('fr')}
                                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${previewLang === 'fr'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                FR
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-hidden relative flex items-center justify-center p-8 bg-slate-50/50"
                    style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>

                    {previewMode === 'mobile' ? (
                        /* Mobile Frame */
                        <div className="relative w-[375px] h-[720px] bg-white rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-black/5 transform scale-[0.9] 2xl:scale-100 transition-transform">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-800 rounded-b-2xl z-30"></div>
                            <div className="h-full w-full overflow-y-auto bg-slate-900 no-scrollbar">
                                {isHome && <HeroPreview content={content.hero || {}} lang={previewLang} />}
                            </div>
                        </div>
                    ) : (
                        /* Web Frame */
                        <div className="w-full h-full max-w-[1600px] bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
                            <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5 opacity-50">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <div className="bg-white px-3 py-0.5 rounded text-[10px] text-slate-400 flex-1 text-center font-mono mx-8">
                                    https://gogo.bj
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto bg-slate-900 relative">
                                {isHome && <HeroPreview content={content.hero || {}} lang={previewLang} />}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Picker Modal */}
            {showImagePicker && (
                <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-8 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <header className="p-6 border-b flex justify-between items-center bg-white">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">Select Image</h3>
                                <p className="text-slate-500 text-xs">Choose from your media library</p>
                            </div>
                            <button onClick={() => setShowImagePicker(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                        </header>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                            <div className="grid grid-cols-4 lg:grid-cols-5 gap-4">
                                {mediaFiles.map((file, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setContent({
                                                ...content!,
                                                hero: { ...content!.hero, image: file.url }
                                            });
                                            setShowImagePicker(false);
                                        }}
                                        className="aspect-square relative rounded-xl overflow-hidden border-2 border-transparent hover:border-[#FFB300] hover:shadow-lg transition-all group bg-white"
                                    >
                                        <Image src={file.url} alt="media" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
