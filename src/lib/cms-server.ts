/**
 * CMS Server Helper
 * Handles file system operations - SERVER SIDE ONLY
 */

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

// Ensure content directory exists
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// === Settings ===
const SETTINGS_FILE = path.join(CONTENT_DIR, 'settings.json');

const defaultSettings = {
    siteName: "GoGo",
    tagline: "Fuel Delivery Made Easy",
    primaryColor: "#FED75F",
    accentColor: "#ED6A21",
    contactEmail: "hello@gogo.bj",
    contactPhone: "+229 XX XX XX XX",
    defaultLanguage: "en"
};

export function getSettings() {
    if (!fs.existsSync(SETTINGS_FILE)) {
        return defaultSettings;
    }
    const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    return JSON.parse(data);
}

export function saveSettings(settings: any) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
    return settings;
}

// === Pages Content ===
const PAGES_FILE = path.join(CONTENT_DIR, 'pages.json');

const defaultPages = {
    home: {
        hero: {
            title: { en: "", fr: "" },
            subtitle: { en: "", fr: "" },
            image: ""
        }
    }
};

export function getPageContent(slug: string) {
    let pages = defaultPages;
    if (fs.existsSync(PAGES_FILE)) {
        const data = fs.readFileSync(PAGES_FILE, 'utf-8');
        pages = { ...defaultPages, ...JSON.parse(data) };
    }
    return pages[slug as keyof typeof pages] || {};
}

export function savePageContent(slug: string, content: any) {
    let pages = defaultPages;
    if (fs.existsSync(PAGES_FILE)) {
        pages = { ...defaultPages, ...JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8')) };
    }

    pages = {
        ...pages,
        [slug]: content
    };

    fs.writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 2));
    return content;
}

// === SEO Metadata ===
const SEO_FILE = path.join(CONTENT_DIR, 'seo.json');

export interface PageSEO {
    title?: { en: string; fr: string };
    description?: { en: string; fr: string };
    keywords?: string[];
    ogImage?: string;
}

const defaultSEO: Record<string, PageSEO> = {
    home: {
        title: { en: "Premium Fuel Delivery in Benin", fr: "Livraison de Carburant Premium au Bénin" },
        description: {
            en: "B2B and B2C on-demand fuel delivery in Cotonou. Diesel and Super gasoline delivered to your fleet or home.",
            fr: "Livraison de carburant B2B et B2C à la demande à Cotonou. Diesel et Super livrés à votre flotte ou domicile."
        }
    },
    about: {
        title: { en: "About GoGo Imperial Energy", fr: "À Propos de GoGo Imperial Energy" },
        description: {
            en: "Learn about our mission to revolutionize fuel delivery in Benin with safety, reliability, and innovation.",
            fr: "Découvrez notre mission de révolutionner la livraison de carburant au Bénin."
        }
    },
    b2b: {
        title: { en: "Fleet Solutions for Business", fr: "Solutions Flotte pour Entreprises" },
        description: {
            en: "Enterprise fuel management with digital vouchers, automated reporting, and priority delivery.",
            fr: "Gestion de carburant d'entreprise avec bons numériques et rapports automatisés."
        }
    },
    "mobile-app": {
        title: { en: "Download the GoGo App", fr: "Téléchargez l'App GoGo" },
        description: {
            en: "Order fuel delivery with one tap. Track your driver, pay securely, and never wait at the pump again.",
            fr: "Commandez du carburant en un clic. Suivez votre livreur et payez en toute sécurité."
        }
    },
    quote: {
        title: { en: "Get a Quote", fr: "Demander un Devis" },
        description: {
            en: "Request a custom quote for fleet fueling services. Volume discounts available.",
            fr: "Demandez un devis personnalisé pour les services de ravitaillement de flotte."
        }
    },
    "trust-faq": {
        title: { en: "Trust & FAQ", fr: "Confiance & FAQ" },
        description: {
            en: "Your questions answered. Learn why businesses and individuals trust GoGo for fuel delivery.",
            fr: "Vos questions répondues. Découvrez pourquoi les entreprises font confiance à GoGo."
        }
    }
};

export function getPageSEO(slug: string): PageSEO {
    let seoData = defaultSEO;
    if (fs.existsSync(SEO_FILE)) {
        const data = fs.readFileSync(SEO_FILE, 'utf-8');
        seoData = { ...defaultSEO, ...JSON.parse(data) };
    }
    return seoData[slug] || {};
}

export function savePageSEO(slug: string, seo: PageSEO) {
    let seoData = defaultSEO;
    if (fs.existsSync(SEO_FILE)) {
        seoData = { ...defaultSEO, ...JSON.parse(fs.readFileSync(SEO_FILE, 'utf-8')) };
    }
    seoData = { ...seoData, [slug]: seo };
    fs.writeFileSync(SEO_FILE, JSON.stringify(seoData, null, 2));
    return seo;
}

export function getAllPageSEO(): Record<string, PageSEO> {
    let seoData = defaultSEO;
    if (fs.existsSync(SEO_FILE)) {
        seoData = { ...defaultSEO, ...JSON.parse(fs.readFileSync(SEO_FILE, 'utf-8')) };
    }
    return seoData;
}
// === Blog Content ===
const POSTS_FILE = path.join(CONTENT_DIR, 'posts.json');

export interface BlogPost {
    slug: string;
    title: string;
    seoDescription?: string;
    publishedDate: string;
    author?: string;
    tags?: string[];
    body: string;
}

export function getBlogPosts(): BlogPost[] {
    if (fs.existsSync(POSTS_FILE)) {
        const data = fs.readFileSync(POSTS_FILE, 'utf-8');
        const posts = JSON.parse(data) as BlogPost[];
        // Sort by date desc
        return posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    }
    return [];
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    const posts = getBlogPosts();
    return posts.find(p => p.slug === slug) || null;
}
