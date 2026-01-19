import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms-server";

export async function generateMetadata(): Promise<Metadata> {
    const seo = getPageSEO("trust-faq");

    return {
        title: seo.title?.en || "Trust & FAQ",
        description: seo.description?.en || "Your questions answered.",
        openGraph: {
            title: seo.title?.en,
            description: seo.description?.en,
        },
    };
}

export { default } from "./TrustFAQClient";
