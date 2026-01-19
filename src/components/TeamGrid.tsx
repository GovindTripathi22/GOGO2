"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio?: string;
}

interface TeamGridProps {
    members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
    const { t } = useLang();

    return (
        <section className="py-20 bg-white" id="team">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <ScrollReveal delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            {t.aboutPage.team.title}
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            {t.aboutPage.team.desc}
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member, index) => (
                        <ScrollReveal key={member.name} delay={0.1 + index * 0.1} direction="up">
                            <div className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="aspect-square relative bg-slate-200">
                                    <Image
                                        src={member.image}
                                        alt={`Photo of ${member.name}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                                    <p className="text-sm text-accent font-medium">{member.role}</p>
                                    {member.bio && (
                                        <p className="text-sm text-slate-600 mt-2 line-clamp-2">{member.bio}</p>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
