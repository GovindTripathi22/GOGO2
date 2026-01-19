import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms-server";

export async function generateMetadata(): Promise<Metadata> {
    const seo = getPageSEO("mobile-app");

    return {
        title: seo.title?.en || "Download the App",
        description: seo.description?.en || "Order fuel delivery with one tap.",
        openGraph: {
            title: seo.title?.en,
            description: seo.description?.en,
        },
    };
}

export { default } from "./MobileAppClient";
