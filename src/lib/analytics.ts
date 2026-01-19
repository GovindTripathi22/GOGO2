/**
 * Analytics Utility - Centralized tracking for all platforms
 * 
 * Supports:
 * - Google Tag Manager (dataLayer)
 * - LinkedIn Insight Tag
 * - Meta Pixel
 */

// Types are inferred from window at runtime to avoid conflicts with GTM types

export type TrackingEvent =
    | "Lead_Conversion"      // B2B Quote form submit
    | "App_Download_iOS"     // App Store click
    | "App_Download_Android" // Play Store click
    | "CTA_Click"            // Generic CTA click
    | "Page_View";           // Page view

interface EventData {
    event: TrackingEvent;
    category?: string;
    label?: string;
    value?: string | number;
    [key: string]: any;
}

/**
 * Track a conversion or event across all analytics platforms
 */
export function trackEvent(data: EventData) {
    const { event, ...params } = data;

    // Type-safe window access
    const win = typeof window !== "undefined" ? (window as unknown as {
        dataLayer?: Array<Record<string, unknown>> & { push: (data: Record<string, unknown>) => void };
        lintrk?: (action: string, data: object) => void;
        fbq?: (action: string, event: string, params?: object) => void;
    }) : null;

    // Google Tag Manager / GA4
    if (win?.dataLayer) {
        win.dataLayer.push({
            event,
            ...params,
        });
    }

    // LinkedIn Insight Tag
    if (win?.lintrk) {
        // LinkedIn uses conversion IDs - map our events
        const linkedInConversionMap: Record<TrackingEvent, number | null> = {
            Lead_Conversion: 123456, // Replace with actual conversion ID
            App_Download_iOS: null,
            App_Download_Android: null,
            CTA_Click: null,
            Page_View: null,
        };

        const conversionId = linkedInConversionMap[event];
        if (conversionId) {
            win.lintrk("track", { conversion_id: conversionId });
        }
    }

    // Meta Pixel
    if (win?.fbq) {
        const metaEventMap: Record<TrackingEvent, string> = {
            Lead_Conversion: "Lead",
            App_Download_iOS: "Download",
            App_Download_Android: "Download",
            CTA_Click: "ViewContent",
            Page_View: "PageView",
        };

        const metaEvent = metaEventMap[event];
        win.fbq("track", metaEvent, params);
    }

    // Debug in development
    if (process.env.NODE_ENV === "development") {
        console.log("📊 Analytics Event:", event, params);
    }
}

/**
 * Track B2B lead form submission
 */
export function trackLeadConversion(fleetSize: string) {
    trackEvent({
        event: "Lead_Conversion",
        category: "B2B",
        label: "Quote Form",
        value: fleetSize,
    });
}

/**
 * Track app download click
 */
export function trackAppDownload(platform: "ios" | "android") {
    trackEvent({
        event: platform === "ios" ? "App_Download_iOS" : "App_Download_Android",
        category: "B2C",
        label: `App Store ${platform.toUpperCase()}`,
    });
}

/**
 * Track CTA button click
 */
export function trackCTAClick(buttonName: string) {
    trackEvent({
        event: "CTA_Click",
        category: "Engagement",
        label: buttonName,
    });
}
