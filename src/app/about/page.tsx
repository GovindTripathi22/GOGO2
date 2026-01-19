import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms-server";

export async function generateMetadata(): Promise<Metadata> {
    const seo = getPageSEO("about");

    return {
        title: seo.title?.en || "About Us",
        description: seo.description?.en || "Learn about GoGo Imperial Energy.",
        openGraph: {
            title: seo.title?.en,
            description: seo.description?.en,
        },
    };
}

export { default } from "./AboutClient";
