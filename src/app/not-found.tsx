import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
            {/* Visual */}
            <div className="relative w-64 h-48 mb-8 opacity-50 grayscale">
                <Image
                    src="/assets/images/gogo-truck-side.png"
                    alt="Lost GoGo Truck"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Off the Map?
            </h1>

            {/* Subtext */}
            <p className="text-xl text-slate-500 max-w-md mb-10 leading-relaxed font-medium">
                Even our fuel trucks don't go this far. Let's get you back on the road.
            </p>

            {/* Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full text-base font-bold hover:bg-[#eec64e] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
                <ArrowLeft className="w-5 h-5" />
                Return to Home
            </Link>
        </div>
    );
}
