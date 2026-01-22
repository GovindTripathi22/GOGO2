/**
 * Full Localization Dictionary for GoGo Imperial Energy
 * Supports English (EN) and French (FR)
 */

export const dictionary = {
    en: {
        nav: {
            home: "Home",
            services: "Services",
            about: "About Us", // Changed from "About"
            fleet: "Fleet Solutions",
            safety: "Safety",
            login: "Login",
            mobileApp: "Mobile App",
            trustFaq: "Trust & Support",
            quote: "Request a B2B Quote",
        },
        hero: {
            title: "YOUR FUEL,",
            titleHighlight: "ANYWHERE AND AT ANY TIME",
            subtitle: "We Go to your location, so you keep going",
            cta: "Get Started",
            ctaSecondary: "Learn More",
            stats: {
                partners: "Corporate Partners",
                deliveries: "Deliveries Made",
                rating: "Customer Rating",
            },
        },
        b2b: {
            badge: "B2B SOLUTIONS",
            title: "B2B and Fleet Solutions",
            subtitle: "Access our B2B Platform for order management, employee vouchers, and consumption reports.",
            intro: "A comprehensive suite of tools for seamless fuel order, employees and fleet management, alongside the issuance of electronic consumption vouchers for employees and strategic partners, detailed consumption reporting.",
            cta: "Access the B2B Platform",
            offers: {
                fuel: {
                    title: "Fuel",
                    details: "Product range (gasoline and diesel), volume, emergency services."
                },
                lubricants: {
                    title: "Lubricants",
                    details: "Brand/type of available lubricants."
                },
                platform: {
                    title: "Vouchers issuance and management",
                    details: "Businesses can issue and track electronic consumption vouchers for fuel and lubricants."
                }
            },
            techFeatures: [ // Kept for backwards compatibility if needed, but B2BClient will likely use benefits list
                {
                    title: "Enhanced transparency",
                    desc: "Full visibility into your operations and spend."
                },
                {
                    title: "Consumption tracking",
                    desc: "Real-time optimization and detailed reporting."
                },
                {
                    title: "Supply cost savings",
                    desc: "Optimize partial loads and reduce waste."
                }
            ],
            dataBenefits: [
                "Enhanced transparency",
                "Consumption tracking and optimization",
                "Fleet management",
                "Supply cost savings",
                "Time savings in your operations"
            ]
        },
        app: {
            title: "On-demand fuel:",
            titleHighlight: "Tap. Order. Delivered.",
            subtitle: "The most seamless way to fuel and service your vehicle without interrupting your day.",
            eta: "On-demand fuel",
            appStore: "App Store",
            playStore: "Google Play",
            process: "Tap. Order. Delivered.",
            deliverySection: {
                title: "7am-10pm Delivery",
                subtitle: "Get your fuel delivered before end of day.",
                cta: "Contact Support"
            }
        },
        howItWorks: {
            step1Title: "Running",
            step1Highlight: "Low?",
            step1Desc: "Don't worry about finding a gas station.",
            step2Title: "We Come",
            step2Highlight: "To You.",
            step2Desc: "Order fuel via the app and we'll deliver it straight to your location.",
        },
        about: {
            badge: "About GoGo",
            title: "About Us", // Changed visible page title
            description: "GoGo is our response to the promise of African ingenuity: using technology to solve our own daily challenges. We don’t just deliver fuel; we deliver time and peace of mind.",
            cta: "Read our story",
            searchPlaceholder: "Search answers...",
            noResults: "No questions found matching your search.",
        },
        faq: {
            title: "Frequently Asked Questions",
            items: [
                {
                    q: "How does GoGo fuel delivery work?",
                    a: "Simply request fuel through our app or website, and our certified drivers will deliver directly to your location.",
                },
                {
                    q: "What areas do you serve?",
                    a: "We currently serve Cotonou and surrounding areas in Benin, with expansion plans underway.",
                },
                {
                    q: "What fuel types are available?",
                    a: "We offer both Super (Gasoline) and Diesel at government-regulated prices.",
                },
                {
                    q: "Is it safe?",
                    a: "Absolutely. Our drivers are certified, and our trucks meet the strictest safety standards.",
                },
            ],
        },
        footer: {
            tagline: "The future of energy delivery. We keep your world moving with reliable, safe, and on-demand services.",
            company: "Company",
            aboutUs: "About Us",
            careers: "Careers",
            newsroom: "Newsroom",
            contact: "Contact",
            services: "Services",
            fuelDelivery: "Fuel Delivery",
            fleetMaintenance: "Fleet Maintenance",
            carWash: "Car Wash",
            evCharging: "EV Charging",
            legal: "Legal",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            cookies: "Cookie Policy",
            copyright: "All rights reserved.",
        },
        quote: {
            backToHome: "Back to Home",
            title: "Fuel your fleet efficiently in",
            titleHighlight: "Benin.",
            subtitle: "Join over 500+ corporate partners who trust GoGo for reliable on-site fueling, maintenance, and detailed consumption analytics.",
            benefits: [
                "Save ~15% on operational costs",
                "Real-time digital receipts",
                "24/7 Priority Support",
                "Net-30 Payment Terms available",
            ],
            trusted: "Trusted By Leaders",
            form: {
                companyName: "Company Name",
                industry: "Industry",
                fleetSize: "Fleet Size",
                productNeeds: "Product Needs",
                serviceInterests: "Service Interests",
                fuelType: "Primary Fuel",
                email: "Work Email",
                phone: "Phone Number",
                submit: "Get a Quote",
                submitting: "Processing...",
                disclaimer: "By submitting, you agree to receive commercial communications from GoGo Imperial Energy.",
            },
            success: {
                title: "Quote Requested!",
                message: "Our sales team will contact you within 2 business hours.",
                another: "Submit another request",
            },
            options: {
                selectSize: "Select size...",
                size1: "1-10 Vehicles",
                size2: "11-50 Vehicles",
                size3: "50+ Vehicles",
                selectFuel: "Select fuel...",
                fuelDiesel: "Diesel",
                fuelSuper: "Super (Gasoline)",
                fuelBoth: "Both",
                industry: {
                    logistics: "Logistics & Transport",
                    construction: "Construction",
                    mining: "Mining",
                    agriculture: "Agriculture",
                    other: "Other"
                },
                products: {
                    fuel: "Fuel (Diesel/Super)",
                    lubricants: "Lubricants",
                    bulk: "Bulk Order",
                    vouchers: "Fuel Vouchers"
                },
                services: {
                    employeeMgmt: "Employee Management",
                    eVouchers: "Electronic Voucher Issuance",
                    reporting: "Detailed Fleet Reporting"
                }
            }
        },
        ticker: {
            live: "LIVE FUEL",
            super: "Super (Gasoline)",
            diesel: "Diesel",
            delivery: "Delivery",
            available: "AVAILABLE",
        },
        // NEW SECTIONS
        heroExpanded: {
            badge: "We Go to your location",
            suffix: "so you keep going.",
            forIndividuals: "For Individuals",
            getApp: "Get the App",
        },
        aboutExtended: {
            title: "Fueling the",
            titleHighlight: "Future",
            description: "At GOGO Imperial Energy, our mission is to redefine fuel delivery in West Africa. We combine cutting-edge technology with feet-on-the-street logistics to ensure you never run dry.",
            reliability: "Reliability",
            reliabilityDesc: "Guaranteed delivery windows, 24/7 support.",
            quality: "Quality Control",
            qualityDesc: "Digital metering and certified fuel quality.",
            support: "24/7\nSupport",
        },
        trust: {
            title: "Trusted & Certified",
        },
        promo: {
            title: "Fuel in your pocket.",
            subtitle: "Download the GoGo app today and schedule your first delivery in under 30 seconds.",
        },
        store: {
            downloadOn: "Download on the",
            getItOn: "Get it on",
        },
        common: {
            seeFeatures: "See Features",
        },
        support: {
            title: "Need help or have questions?",
            subtitle: "Our support team is available 24/7 to assist you.",
            cta: "Contact Support",
        },
        aboutPage: {
            ourStory: "Our Story",
            heroTitle: "YOUR FUEL,",
            heroSuffix: "ANYWHERE AND AT ANY TIME",
            heroDesc: "GoGo is our response to the promise of African ingenuity: using technology to solve our own daily challenges. We don’t just deliver fuel; we deliver time and peace of mind.",
            originTitle: "Our Origin",
            originText: "In Africa, we all know the challenge: endless traffic jams, crowded or sometimes dry gas stations, and those precious minutes lost when we could be with our loved ones or at our offices. GoGo was born from a simple observation: if the world is changing, the way we supply ourselves with energy must change too. We created GoGo to meet a fundamental need for efficiency in our rapidly changing African cities.",
            timeline: [
                { date: "January 2025", title: "The Idea", desc: "Founders noticed long queues and time lost at fuelling stations." },
                { date: "June 2025", title: "Pilot Launch", desc: "First pilot in Cotonou city." },
                { date: "December 2025", title: "Product-Market Fit", desc: "B2B features added." }
            ],
            mission: "Simplify the life of every driver and business in Africa through safe, smart, and sustainable energy delivery technology.",
            vision: "Become the number 1 reflex for mobility in Africa, by creating an ecosystem where energy and services come to the user, and not the other way around.",
            driversTitle: "Our Pillars",
            driversDesc: "We do not copy foreign models; we adapt cutting-edge technology to the realities of our roads, our cities, and our economies.",
            metrics: {
                innovation: { title: "Innovation by and for Africa", desc: "We do not copy foreign models; we adapt cutting-edge technology to the realities of our roads, our cities, and our economies. GoGo is a solution designed by local talents for the continent." },
                safety: { title: "Safety and Excellence", desc: "We never compromise on safety. Our equipment meets the strictest international standards, guaranteeing risk-free delivery, every time." },
                community: { title: "Community and Impact", desc: "GoGo is more than an application. It is a driver of growth. By optimizing travel, we reduce the urban carbon footprint and support the productivity of local entrepreneurs." }
            },
            join: {
                title: "Join Our Mission",
                desc: "We're always looking for passionate people to help us grow.",
                partner: "Partner With Us",
                careers: "View Careers"
            },
            team: {
                title: "Meet Our Team",
                desc: "The passionate people behind GoGo, working to revolutionize energy delivery in Africa."
            }
        },
        trustPage: {
            title: "Trust & Support",
            subtitle: "We're here to help. Find answers to your questions and learn what makes GoGo the trusted choice for fuel delivery.",
            badges: {
                safety: { title: "Safety First", desc: "ADR-certified trucks and trained drivers" },
                support: { title: "24/7 Support", desc: "Round-the-clock customer assistance" },
                quality: { title: "Certified Quality", desc: "ISO 9001 compliant operations" }
            },
            faqTitle: "Frequently Asked Questions",
            latestNews: "Latest from GoGo",
            viewAll: "View All",
            cta: {
                title: "Still have questions?",
                desc: "Our team is ready to help you get started.",
                b2b: "Request B2B Quote",
                app: "Download App"
            },
            blogTeaser: {
                newsLabel: "News",
                placeholderTitle: "Coming Soon: Expansion Update",
                placeholderDesc: "Stay tuned for the latest news about GoGo services."
            }
        }
    },
    fr: {
        nav: {
            home: "Accueil",
            services: "Services",
            about: "À Propos", // "About Us" in FR usually just "À Propos"
            fleet: "Solutions Flotte",
            safety: "Sécurité",
            login: "Connexion",
            mobileApp: "Application",
            trustFaq: "Aide & Confiance",
            quote: "Demander un Devis B2B",
        },

        hero: {
            title: "VOTRE CARBURANT,",
            titleHighlight: "PARTOUT ET A TOUT MOMENT",
            subtitle: "Nous ne livrons pas seulement du carburant, nous livrons du temps et de la tranquillité d'esprit",
            cta: "Commencer",
            ctaSecondary: "En Savoir Plus",
            stats: {
                partners: "Partenaires Entreprises",
                deliveries: "Livraisons Effectuées",
                rating: "Note Client",
            },
        },
        b2b: {
            badge: "POUR LES ENTREPRISES",
            title: "Solutions Flotte et B2B",
            subtitle: "Accédez à notre plateforme B2B pour la gestion des commandes, des bons et des rapports.",
            intro: "Une suite complète d'outils pour la commande de carburant, la gestion des employés et de la flotte, ainsi que l'émission de bons de consommation numériques pour les employés et les partenaires stratégiques, et des rapports de consommation détaillés.",
            cta: "Accéder à la Plateforme B2B",
            offers: {
                fuel: {
                    title: "Carburant",
                    details: "Gamme de produits (essence et diesel), volume, services d'urgence."
                },
                lubricants: {
                    title: "Lubrifiants",
                    details: "Marque/type de lubrifiants disponibles."
                },
                platform: {
                    title: "Émission et gestion des bons",
                    details: "Les entreprises peuvent émettre et suivre des bons de consommation électroniques pour le carburant et les lubrifiants."
                }
            },
            techFeatures: [
                {
                    title: "Transparence accrue",
                    desc: "Visibilité complète sur vos opérations."
                },
                {
                    title: "Suivi consommation",
                    desc: "Optimisation en temps réel et rapports détaillés."
                },
                {
                    title: "Économies de coûts",
                    desc: "Optimisez les charges et réduisez le gaspillage."
                }
            ],
            dataBenefits: [
                "Transparence accrue",
                "Suivi et optimisation de la consommation",
                "Gestion de flotte",
                "Économies sur les coûts d'approvisionnement",
                "Gain de temps dans vos opérations"
            ]
        },
        app: {
            title: "Carburant à la demande :",
            titleHighlight: "Tapez. Commandez. Livré.",
            subtitle: "La façon la plus simple de faire le plein et d'entretenir votre véhicule sans interrompre votre journée.",
            eta: "Carburant à la demande",
            appStore: "App Store",
            playStore: "Google Play",
            process: "Tapez. Commandez. Livré.",
            deliverySection: {
                title: "Livraison de 7h à 22h",
                subtitle: "Faites-vous livrer votre carburant avant la fin de la journée.",
                cta: "Contacter le support"
            }
        },
        howItWorks: {
            step1Title: "En Panne",
            step1Highlight: "de Carburant?",
            step1Desc: "Ne vous inquiétez pas de trouver une station-service.",
            step2Title: "Nous Venons",
            step2Highlight: "Chez Vous.",
            step2Desc: "Commandez du carburant via l'application et nous vous le livrons directement.",
        },
        about: {
            badge: "À Propos de GoGo",
            title: "À Propos de Nous",
            description: "GoGo est notre réponse à la promesse du génie africain : utiliser la technologie pour résoudre nos propres défis quotidiens.",
            cta: "Lire notre histoire",
            searchPlaceholder: "Rechercher des réponses...",
            noResults: "Aucune question correspondant à votre recherche.",
        },
        faq: {
            title: "Questions Fréquentes",
            items: [
                {
                    q: "Comment fonctionne la livraison de carburant GoGo?",
                    a: "Demandez simplement du carburant via notre application ou site web, et nos chauffeurs certifiés livreront directement à votre emplacement.",
                },
                {
                    q: "Quelles zones desservez-vous?",
                    a: "Nous desservons actuellement Cotonou et ses environs au Bénin.",
                },
                {
                    q: "Quels types de carburant sont disponibles?",
                    a: "Nous proposons Super (Essence) et Diesel aux prix réglementés par le gouvernement.",
                },
                {
                    q: "Est-ce sûr?",
                    a: "Absolument. Nos chauffeurs sont certifiés et nos camions répondent aux normes de sécurité les plus strictes.",
                },
            ],
        },
        footer: {
            tagline: "L'avenir de la livraison d'énergie. Nous gardons votre monde en mouvement.",
            company: "Société",
            aboutUs: "À Propos",
            careers: "Carrières",
            newsroom: "Actualités",
            contact: "Contact",
            services: "Services",
            fuelDelivery: "Livraison de Carburant",
            fleetMaintenance: "Maintenance Flotte",
            carWash: "Lavage Auto",
            evCharging: "Recharge VE",
            legal: "Légal",
            privacy: "Politique de Confidentialité",
            terms: "Conditions d'Utilisation",
            cookies: "Politique de Cookies",
            copyright: "Tous droits réservés.",
        },
        quote: {
            backToHome: "Retour à l'Accueil",
            title: "Alimentez votre flotte efficacement au",
            titleHighlight: "Bénin.",
            subtitle: "Rejoignez plus de 500 partenaires qui font confiance à GoGo.",
            benefits: [
                "Économisez ~15% sur les coûts opérationnels",
                "Reçus numériques en temps réel",
                "Support Prioritaire 24/7",
                "Conditions de Paiement Net-30 disponibles",
            ],
            trusted: "Approuvé par les Leaders",
            form: {
                companyName: "Nom de l'Entreprise",
                industry: "Secteur d'Activité",
                fleetSize: "Taille de la Flotte",
                productNeeds: "Besoins en Produits",
                serviceInterests: "Intérêts de Service",
                fuelType: "Carburant Principal",
                email: "Email Professionnel",
                phone: "Numéro de Téléphone",
                submit: "Obtenir un Devis",
                submitting: "Traitement...",
                disclaimer: "En soumettant, vous acceptez de recevoir des communications commerciales de GoGo Imperial Energy.",
            },
            options: {
                selectSize: "Sélectionner la taille...",
                size1: "1-10 Véhicules",
                size2: "11-50 Véhicules",
                size3: "50+ Véhicules",
                selectFuel: "Sélectionner le carburant...",
                fuelDiesel: "Diesel",
                fuelSuper: "Super (Essence)",
                fuelBoth: "Les deux",
                industry: {
                    logistics: "Logistique & Transport",
                    construction: "Construction",
                    mining: "Mines",
                    agriculture: "Agriculture",
                    other: "Autre"
                },
                products: {
                    fuel: "Carburant (Diesel/Super)",
                    lubricants: "Lubrifiants",
                    bulk: "Commande en Vrac",
                    vouchers: "Bons Carburant"
                },
                services: {
                    employeeMgmt: "Gestion des Employés",
                    eVouchers: "Émission de Bons Électroniques",
                    reporting: "Rapports de Flotte Détaillés"
                }
            },
        },
        ticker: {
            live: "PRIX EN DIRECT",
            super: "Super (Essence)",
            diesel: "Diesel",
            delivery: "Livraison",
            available: "DISPONIBLE",
        },
        // NEW SECTIONS
        heroExpanded: {
            badge: "Nous venons chez vous",
            suffix: "pour avancer.",
            forIndividuals: "Pour les Particuliers",
            getApp: "Télécharger",
        },
        aboutExtended: {
            title: "L'Énergie du",
            titleHighlight: "Futur",
            description: "Chez GOGO Imperial Energy, nous redéfinissons la livraison de carburant en Afrique de l'Ouest.",
            reliability: "Fiabilité",
            reliabilityDesc: "Créneaux garantis, support 24/7.",
            quality: "Contrôle Qualité",
            qualityDesc: "Comptage numérique et qualité certifiée.",
            support: "Support 24/7",
        },
        trust: {
            title: "Certifié & Approuvé",
        },
        promo: {
            title: "Le carburant dans votre poche.",
            subtitle: "Téléchargez l'application GoGo aujourd'hui.",
        },
        store: {
            downloadOn: "Télécharger sur",
            getItOn: "Disponible sur",
        },
        common: {
            seeFeatures: "Voir Fonctionnalités",
        },
        support: {
            title: "24/7 Support",
            subtitle: "Get help anytime via in-app chat or call.",
            cta: "Contact Support",
        },
        aboutPage: {
            ourStory: "Notre Histoire",
            heroTitle: "VOTRE CARBURANT,",
            heroSuffix: "PARTOUT ET À TOUT MOMENT",
            heroDesc: "GoGo est notre réponse à la promesse du génie africain : utiliser la technologie pour résoudre nos propres défis quotidiens. Nous ne livrons pas seulement du carburant ; nous livrons du temps et de la tranquillité d'esprit.",
            originTitle: "Notre Origine",
            originText: "En Afrique, nous connaissons tous le défi : les embouteillages interminables, les stations-service bondées ou parfois à sec, et ces précieuses minutes perdues alors que nous pourrions être avec nos proches ou à nos bureaux. GoGo est né d'un constat simple : si le monde change, la manière dont nous nous approvisionnons en énergie doit aussi changer. Nous avons créé GoGo pour répondre à un besoin fondamental d'efficacité dans nos villes africaines en pleine mutation.",
            timeline: [
                { date: "Janvier 2025", title: "L'Idée", desc: "Les fondateurs remarquent les files d'attente et le temps perdu." },
                { date: "Juin 2025", title: "Lancement Pilote", desc: "Premier pilote dans la ville de Cotonou." },
                { date: "Décembre 2025", title: "Product-Market Fit", desc: "Fonctionnalités B2B ajoutées." }
            ],
            mission: "Simplifier la vie de chaque conducteur et entreprise en Afrique grâce à une technologie de livraison d'énergie sûre, intelligente et durable.",
            vision: "Devenir le réflexe numéro 1 de la mobilité en Afrique, en créant un écosystème où l'énergie et les services viennent à l'utilisateur, et non l'inverse.",
            driversTitle: "Nos Piliers",
            driversDesc: "Nous ne copions pas les modèles étrangers ; nous adaptons la technologie de pointe à nos réalités.",
            metrics: {
                innovation: { title: "Innovation par et pour l'Afrique", desc: "Nous ne copions pas les modèles étrangers ; nous adaptons la technologie de pointe aux réalités de nos routes, de nos villes et de nos économies. GoGo est une solution conçue par des talents locaux pour le continent." },
                safety: { title: "Sécurité et Excellence", desc: "Nous ne faisons jamais de compromis sur la sécurité. Nos équipements répondent aux normes internationales les plus strictes, garantissant une livraison sans risque, à chaque fois." },
                community: { title: "Communauté et Impact", desc: "GoGo est plus qu'une application. C'est un moteur de croissance. En optimisant les déplacements, nous réduisons l'empreinte carbone urbaine et soutenons la productivité des entrepreneurs locaux." }
            },
            join: {
                title: "Rejoignez Notre Mission",
                desc: "Nous recherchons toujours des personnes passionnées.",
                partner: "Devenir Partenaire",
                careers: "Voir les Carrières"
            },
            team: {
                title: "Rencontrez Notre Équipe",
                desc: "Les personnes passionnées derrière GoGo."
            }
        },
        trustPage: {
            title: "Confiance & Support",
            subtitle: "Nous sommes là pour vous aider.",
            badges: {
                safety: { title: "Sécurité Avant Tout", desc: "Camions certifiés ADR" },
                support: { title: "Support 24/7", desc: "Assistance client permanente" },
                quality: { title: "Qualité Certifiée", desc: "Conforme ISO 9001" }
            },
            faqTitle: "Foire Aux Questions",
            latestNews: "Dernières nouvelles de GoGo",
            viewAll: "Voir Tout",
            cta: {
                title: "Encore des questions ?",
                desc: "Notre équipe est prête à vous aider.",
                b2b: "Demander un Devis B2B",
                app: "Télécharger l'App"
            },
            blogTeaser: {
                newsLabel: "Actualités",
                placeholderTitle: "Bientôt : Mise à jour",
                placeholderDesc: "Restez à l'écoute."
            }
        }
    },
} as const;

export type Lang = "en" | "fr";
export type Dictionary = typeof dictionary;
export type TranslationKey = keyof typeof dictionary.en;
