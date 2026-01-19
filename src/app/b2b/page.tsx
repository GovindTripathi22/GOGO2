import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms-server";

export async function generateMetadata(): Promise<Metadata> {
    const seo = getPageSEO("b2b");

    return {
        title: seo.title?.en || "Fleet Solutions",
        description: seo.description?.en || "Enterprise fuel management solutions.",
        openGraph: {
            title: seo.title?.en,
            description: seo.description?.en,
        },
    };
}

export { default } from "./B2BClient";
