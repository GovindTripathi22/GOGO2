/**
 * ThemePreview Component
 * Live preview of theme customizations
 */

"use client";

interface ThemePreviewProps {
    settings: {
        siteName: string;
        tagline: string;
        primaryColor: string;
        accentColor: string;
    };
}

export default function ThemePreview({ settings }: ThemePreviewProps) {
    const { siteName, tagline, primaryColor, accentColor } = settings;

    return (
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Browser Chrome */}
            <div className="bg-slate-700 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-slate-600 rounded px-3 py-1 text-xs text-slate-300 text-center">
                    gogo.bj
                </div>
            </div>

            {/* Mini Site Preview */}
            <div className="bg-white p-4" style={{ minHeight: 280 }}>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: primaryColor }}
                        />
                        <span className="font-bold text-slate-900 text-sm">
                            {siteName || "GoGo"}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-8 h-2 bg-slate-200 rounded" />
                        <div className="w-8 h-2 bg-slate-200 rounded" />
                        <div className="w-8 h-2 bg-slate-200 rounded" />
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Welcome to
                    </p>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">
                        {siteName || "GoGo"}
                    </h2>
                    <p className="text-xs text-slate-500 mb-3">
                        {tagline || "Fuel Delivery Made Easy"}
                    </p>
                    <button
                        className="text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                        style={{
                            backgroundColor: primaryColor,
                            color: isLightColor(primaryColor) ? '#000' : '#fff'
                        }}
                    >
                        Get Started
                    </button>
                </div>

                {/* Cards Preview */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-50 rounded-lg p-2">
                        <div
                            className="w-5 h-5 rounded mb-1"
                            style={{ backgroundColor: primaryColor }}
                        />
                        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
                        <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2">
                        <div
                            className="w-5 h-5 rounded mb-1"
                            style={{ backgroundColor: accentColor }}
                        />
                        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
                        <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2">
                        <div
                            className="w-5 h-5 rounded mb-1"
                            style={{ backgroundColor: primaryColor }}
                        />
                        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
                        <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
                    </div>
                </div>

                {/* Footer Preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[8px] text-slate-400">
                        © 2024 {siteName || "GoGo"}
                    </span>
                    <div className="flex gap-1">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: accentColor }}
                        />
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: accentColor }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper to determine if a color is light
function isLightColor(color: string): boolean {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
}
