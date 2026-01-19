/**
 * Local CMS Helper - Mock Data for Testing
 * No database required - uses in-memory data
 * SAFE FOR CLIENT COMPONENTS
 */

// Mock data store (in-memory for testing)
export const mockPages = [
    {
        id: "1",
        slug: "home",
        title: { en: "Home Page", fr: "Page d'Accueil" },
        status: "published",
        lastUpdated: "2024-01-15"
    },
    {
        id: "2",
        slug: "about",
        title: { en: "About Us", fr: "À Propos" },
        status: "published",
        lastUpdated: "2024-01-14"
    },
    {
        id: "3",
        slug: "services",
        title: { en: "Services", fr: "Services" },
        status: "draft",
        lastUpdated: "2024-01-13"
    }
];

export const mockFaqs = [
    {
        id: "1",
        question: { en: "How does GoGo work?", fr: "Comment fonctionne GoGo?" },
        answer: { en: "Download the app, order fuel, we deliver to you.", fr: "Téléchargez l'app, commandez du carburant, nous vous livrons." },
        category: "general"
    },
    {
        id: "2",
        question: { en: "What areas do you serve?", fr: "Quelles zones desservez-vous?" },
        answer: { en: "We currently serve major cities in Benin.", fr: "Nous desservons actuellement les grandes villes du Bénin." },
        category: "delivery"
    },
    {
        id: "3",
        question: { en: "Is it safe?", fr: "Est-ce sécurisé?" },
        answer: { en: "Yes, all our trucks are ADR certified.", fr: "Oui, tous nos camions sont certifiés ADR." },
        category: "safety"
    }
];

export const mockMedia = [
    { id: "1", name: "hero-bg.jpg", type: "image", url: "/assets/images/hero-bg.jpg" },
    { id: "2", name: "truck.png", type: "image", url: "/assets/images/truck.png" },
    { id: "3", name: "app-preview.png", type: "image", url: "/assets/images/app-preview.png" }
];

export const mockSettings = {
    siteName: "GoGo",
    tagline: "Fuel Delivery Made Easy",
    primaryColor: "#FED75F",
    accentColor: "#ED6A21",
    contactEmail: "hello@gogo.bj",
    contactPhone: "+229 XX XX XX XX",
    defaultLanguage: "en"
};

// Helper functions (Client Safe)
export function getPages() { return mockPages; }
export function getFaqs() { return mockFaqs; }
export function getMedia() { return mockMedia; }
export function getSettings() { return mockSettings; } // Used for initial client state if needed

export function getStats() {
    return {
        pages: mockPages.length,
        faqs: mockFaqs.length,
        media: mockMedia.length,
        published: mockPages.filter(p => p.status === 'published').length
    };
}
