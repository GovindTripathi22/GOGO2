import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms-server";

export async function generateMetadata(): Promise<Metadata> {
    const seo = getPageSEO("quote");

    return {
        title: seo.title?.en || "Get a Quote",
        description: seo.description?.en || "Request a custom quote for fleet fueling.",
        openGraph: {
            title: seo.title?.en,
            description: seo.description?.en,
        },
    };
}

export { default } from "./QuoteClient";
