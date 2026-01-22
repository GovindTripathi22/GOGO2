import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { LangProvider } from "@/context/LangContext";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import FuelTicker from "@/components/FuelTicker";
import { Suspense } from "react";
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

  // Schemas Removed as unused for now

  return (
    <html lang="fr" className={dmSans.variable} suppressHydrationWarning>
      {/* ... keeping head ... */}
      <body className="antialiased bg-white text-slate-900 font-sans">
        <SmoothScroll>
          <ThemeProvider settings={settings}>
            {/* Google Tag Manager */}
            {process.env.NEXT_PUBLIC_GTM_ID && (
              <GoogleTagManager
                gtmId={process.env.NEXT_PUBLIC_GTM_ID}
                gtmScriptUrl="https://www.googletagmanager.com/gtm.js"
              />
            )}
            {/* Google Analytics */}
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
            )}
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
