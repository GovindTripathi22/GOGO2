"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Fuel, Wrench, BarChart3, Battery, Droplets, CircleAlert, Car } from "lucide-react";

const services = [
    {
        id: "fuel",
        label: "Fuel",
        icon: "/assets/images/icon-fuel.png",
        LucideIcon: Fuel,
        title: "Powering Business Growth",
        subtitle: "Our B2B platform offers tailored solutions to keep your operations running smoothly. Reduce downtime and optimize costs with real-time tracking.",
        features: [
            { icon: Fuel, title: "On-Site Fueling", shortDesc: "Direct to your fleet's tanks.", fullDesc: "Our mobile fuel trucks arrive at your location on schedule. No more detours to gas stations. We handle everything from delivery to digital receipts, ensuring your fleet is always ready to roll." },
            { icon: Wrench, title: "Maintenance", shortDesc: "Proactive vehicle health checks." },
            { icon: BarChart3, title: "Data Analytics", shortDesc: "Real-time consumption tracking." },
        ],
        ctaText: "Go to B2B Platform",
        ctaLink: "https://gogofuelapp.on-demand-app.com/business/login",
    },
    {
        id: "battery",
        label: "Battery",
        icon: "/assets/images/icon-battery.png",
        LucideIcon: Battery,
        title: "Battery Services",
        subtitle: "On-demand battery replacement and jump-start services for your fleet. Never get stranded with a dead battery again.",
        features: [
            { icon: Battery, title: "Battery Replacement", shortDesc: "Quick swap services.", fullDesc: "We stock all major battery brands and sizes. Our technicians can replace your battery on-site within minutes." },
            { icon: Wrench, title: "Jump Start", shortDesc: "Emergency assistance." },
            { icon: BarChart3, title: "Battery Health", shortDesc: "Monitoring & diagnostics." },
        ],
        ctaText: "Request Service",
        ctaLink: "#",
    },
    {
        id: "carwash",
        label: "Car wash",
        icon: "/assets/images/icon-carwash.png",
        LucideIcon: Car,
        title: "Mobile Car Wash",
        subtitle: "Professional car washing services delivered to your location. Eco-friendly products and waterless wash options available.",
        features: [
            { icon: Droplets, title: "Exterior Wash", shortDesc: "Full body cleaning.", fullDesc: "Our team uses premium products for a spotless finish without scratching your paint." },
            { icon: Car, title: "Interior Detailing", shortDesc: "Deep clean service." },
            { icon: Wrench, title: "Wax & Polish", shortDesc: "Protective coating." },
        ],
        ctaText: "Book Now",
        ctaLink: "#",
    },
    {
        id: "tyres",
        label: "Tyres",
        icon: "/assets/images/icon-tyres.png",
        LucideIcon: CircleAlert,
        title: "Tyre Services",
        subtitle: "Complete tyre solutions from replacement to repair. We come to you with a full range of tyre brands and sizes.",
        features: [
            { icon: CircleAlert, title: "Tyre Replacement", shortDesc: "All brands available.", fullDesc: "We stock tyres for all vehicle types. Same-day replacement at your location." },
            { icon: Wrench, title: "Puncture Repair", shortDesc: "Quick fixes." },
            { icon: BarChart3, title: "Tyre Pressure", shortDesc: "TPMS monitoring." },
        ],
        ctaText: "Get Quote",
        ctaLink: "#",
    },
    {
        id: "oil",
        label: "Engine oil",
        icon: "/assets/images/icon-oil.png",
        LucideIcon: Droplets,
        title: "Engine Oil Change",
        subtitle: "Professional oil change services with premium synthetic and conventional oils. Keep your engine running smooth.",
        features: [
            { icon: Droplets, title: "Oil Change", shortDesc: "Full synthetic options.", fullDesc: "We use top-tier oils and filters for maximum engine protection. Quick service at your location." },
            { icon: Wrench, title: "Filter Replacement", shortDesc: "Oil & air filters." },
            { icon: BarChart3, title: "Fluid Check", shortDesc: "All vehicle fluids." },
        ],
        ctaText: "Schedule Service",
        ctaLink: "#",
    },
    {
        id: "rescue",
        label: "Rescue",
        icon: "/assets/images/icon-rescue.png",
        LucideIcon: CircleAlert,
        title: "Roadside Rescue",
        subtitle: "24/7 emergency roadside assistance. Towing, lockout help, and breakdown support whenever you need it.",
        features: [
            { icon: CircleAlert, title: "Emergency Towing", shortDesc: "24/7 availability.", fullDesc: "Fast response times with our fleet of tow trucks. We'll get you to safety quickly." },
            { icon: Wrench, title: "Lockout Help", shortDesc: "Key & lock service." },
            { icon: BarChart3, title: "Breakdown Support", shortDesc: "On-site diagnostics." },
        ],
        ctaText: "Call Now",
        ctaLink: "#",
    },
];

export default function ServicesBar() {
    const [active, setActive] = useState("fuel");
    const activeService = services.find(s => s.id === active)!;

    return (
        <section className="relative z-20 -mt-20 pb-8 bg-dark">
            <div className="container mx-auto px-4">
                {/* Icons Bar */}
                <div className="flex items-center justify-center gap-4 md:gap-8 overflow-x-auto py-4 scrollbar-hide">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => setActive(service.id)}
                            className={`flex flex-col items-center gap-2 p-4 md:p-6 rounded-2xl transition-all min-w-[100px] md:min-w-[120px] ${active === service.id
                                    ? "bg-dark/90 backdrop-blur-md border-2 border-cyan-400 shadow-lg shadow-cyan-400/20"
                                    : "bg-dark/60 backdrop-blur-sm border border-gray-700 hover:bg-dark/80"
                                }`}
                        >
                            <div className="relative w-16 h-16 md:w-20 md:h-20">
                                <Image
                                    src={service.icon}
                                    alt={service.label}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className={`text-sm font-medium ${active === service.id ? "text-cyan-400" : "text-white"
                                }`}>
                                {service.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content Panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8 py-12 px-6 md:px-12 bg-gradient-to-br from-dark via-dark to-gray-900 rounded-3xl border border-gray-800"
                    >
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                                {activeService.title.split(" ").map((word, i) =>
                                    i === 1 ? <span key={i} className="text-primary">{word} </span> : word + " "
                                )}
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                {activeService.subtitle}
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="flex flex-col md:flex-row gap-4 mb-10">
                            {activeService.features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex-1 p-6 rounded-2xl border ${index === 0
                                            ? "bg-gradient-to-br from-primary/20 to-secondary/10 border-primary/50"
                                            : "bg-white/5 border-white/10"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${index === 0 ? "bg-primary text-black" : "bg-white/10 text-primary"
                                            }`}>
                                            <feature.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">{feature.shortDesc}</p>
                                    {feature.fullDesc && (
                                        <p className="text-gray-300 text-sm mt-3 leading-relaxed">{feature.fullDesc}</p>
                                    )}
                                    {index === 0 && (
                                        <a
                                            href={activeService.ctaLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-4 bg-primary text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors text-sm"
                                        >
                                            Learn More <ArrowRight className="w-4 h-4" />
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <a
                                href={activeService.ctaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-semibold group text-lg"
                            >
                                {activeService.ctaText}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
