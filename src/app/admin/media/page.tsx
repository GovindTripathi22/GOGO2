/**
 * Admin Media Page
 * Upload and manage images
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Image as ImageIcon, Upload, Eye, Copy, Check, Loader2, X, Plus } from "lucide-react";

interface MediaItem {
    id: string;
    name: string;
    url: string;
    type: string;
}

export default function AdminMediaPage() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const res = await fetch("/api/admin/media");
            if (res.ok) {
                const data = await res.json();
                setMedia(data.media || []);
            }
        } catch (error) {
            console.error("Failed to load media");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/media", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                fetchMedia(); // Refresh list
            } else {
                const data = await res.json();
                alert(data.error || "Upload failed");
            }
        } catch (error) {
            alert("Upload failed");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleCopyUrl = (url: string, id: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-500 p-2 rounded-xl text-white">
                                <ImageIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
                                <p className="text-sm text-slate-500">{media.length} files</p>
                            </div>
                        </div>
                        <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors cursor-pointer">
                            {uploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Plus className="w-4 h-4" />
                            )}
                            {uploading ? "Uploading..." : "Upload Image"}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="hidden"
                                disabled={uploading}
                            />
                        </label>
                    </div>
                </div>
            </header>

            {/* Media Grid */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {media.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:border-purple-300 transition-colors"
                        >
                            <div className="aspect-square bg-slate-100 relative overflow-hidden">
                                {/* Try to show actual image */}
                                <Image
                                    src={item.url}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        // Fallback to icon if image fails
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => setPreviewUrl(item.url)}
                                        className="p-2 bg-white rounded-lg text-slate-700 hover:bg-slate-100"
                                        title="Preview"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleCopyUrl(item.url, item.id)}
                                        className="p-2 bg-white rounded-lg text-slate-700 hover:bg-slate-100"
                                        title="Copy URL"
                                    >
                                        {copiedId === item.id ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {/* Type Badge */}
                                <span className={`absolute top-2 right-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded ${item.type === 'upload' ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                    {item.type}
                                </span>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                                <p className="text-xs text-slate-400 truncate">{item.url}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {media.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 mb-4">No media files yet.</p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Upload Your First Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}

                {/* Help Text */}
                <div className="mt-8 bg-slate-100 rounded-xl p-4">
                    <p className="text-sm text-slate-600">
                        💡 <strong>Tip:</strong> Click &quot;Upload Image&quot; to add new files. Hover over any image to preview or copy its URL.
                    </p>
                </div>
            </main>

            {/* Preview Modal */}
            {previewUrl && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
                    onClick={() => setPreviewUrl(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-slate-300"
                        onClick={() => setPreviewUrl(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative max-w-4xl max-h-[80vh]">
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            width={800}
                            height={600}
                            className="object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
