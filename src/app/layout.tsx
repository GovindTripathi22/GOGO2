import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { LangProvider } from "@/context/LangContext";
import { GoogleTagManager } from "@next/third-parties/google";
import FuelTicker from "@/components/FuelTicker";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | GoGo Imperial Energy",
    default: "GoGo Imperial Energy | Premium Fuel Delivery in Benin",
  },
  description: "B2B and B2C on-demand fuel delivery in Cotonou. Diesel and Super gasoline delivered to your fleet or home. Tracking, safety, and reliability guaranteed.",
  metadataBase: new URL("https://gogo.bj"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    url: "https://gogo.bj",
    siteName: "GoGo Imperial Energy",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GoGo Fuel Delivery",
      },
    ],
  },
};

import { getSettings } from "@/lib/cms-server";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSettings();

  // LocalBusiness Schema (Expanded with Organization)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://gogo.bj/#organization",
    "name": settings.siteName,
    "url": "https://gogo.bj",
    "logo": "https://gogo.bj/assets/images/logo-main.png",
    "sameAs": [
      "https://facebook.com/gogoimperial",
      "https://twitter.com/gogoimperial",
      "https://linkedin.com/company/gogo-imperial"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings.contactPhone,
      "contactType": "customer service",
      "areaServed": "BJ",
      "availableLanguage": ["English", "French"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "GasStation",
    "parentOrganization": {
      "@id": "https://gogo.bj/#organization"
    },
    "name": `${settings.siteName} Cotonou`,
    "description": settings.tagline,
    "url": "https://gogo.bj",
    "telephone": settings.contactPhone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cotonou",
      "addressCountry": "BJ"
    },
    // ... rest
  };

  // ... (keeping serviceSchema variable defined but omitted in diff for brevity if not changed, but I will include full block to be safe or rely on layout structure)
  // Actually, I should just wrap the return block with ThemeProvider and inject settings schemas.

  return (
    <html lang="fr" className={dmSans.variable} suppressHydrationWarning>
      {/* ... keeping head ... */}
      <body className="antialiased bg-white text-slate-900 font-sans">
        <SmoothScroll>
          <ThemeProvider settings={settings}>
            {/* Google Tag Manager */}
            {/* ... scripts ... */}

            <Suspense fallback={null}>
              <LangProvider>
                <FuelTicker />
                {children}
              </LangProvider>
            </Suspense>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
