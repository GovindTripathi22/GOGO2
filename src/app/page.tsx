import { Metadata } from "next";
import { getPageContent, getPageSEO } from "@/lib/cms-server";
import ClientHome from "@/components/ClientHome";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getPageSEO("home");

  return {
    title: seo.title?.en || "Premium Fuel Delivery in Benin",
    description: seo.description?.en || "B2B and B2C on-demand fuel delivery in Cotonou.",
    openGraph: {
      title: seo.title?.en,
      description: seo.description?.en,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export default function Home() {
  const content = getPageContent("home");

  return <ClientHome content={content} />;
}
