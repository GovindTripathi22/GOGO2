import Image from "next/image";
import { useLang } from "@/context/LangContext";

export default function About() {
    const { t } = useLang();

    return (
        <section className="py-20 bg-dark text-white border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sans">
                            {t.aboutExtended.title} <span className="text-secondary">{t.aboutExtended.titleHighlight}</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                            {t.aboutExtended.description}
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                                <div>
                                    <h4 className="text-xl font-bold">{t.aboutExtended.reliability}</h4>
                                    <p className="text-gray-400">{t.aboutExtended.reliabilityDesc}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">2</div>
                                <div>
                                    <h4 className="text-xl font-bold">{t.aboutExtended.quality}</h4>
                                    <p className="text-gray-400">{t.aboutExtended.qualityDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="relative h-[400px] w-full rounded-tr-[50px] rounded-bl-[50px] overflow-hidden border-2 border-primary/20">
                            <Image
                                src="/assets/images/contact-team.jpg"
                                alt="Our Team"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary flex items-center justify-center rounded-3xl z-10">
                            <span className="text-black font-bold text-center text-sm leading-tight whitespace-pre-wrap">{t.aboutExtended.support}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
