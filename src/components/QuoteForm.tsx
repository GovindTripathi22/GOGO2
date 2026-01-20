"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitQuote } from "@/app/actions";
import { QuoteData } from "@/lib/quote-types"; // Used in type cast now
import { trackLeadConversion } from "@/lib/analytics";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { useLang } from "@/context/LangContext";
import ReCAPTCHA from "react-google-recaptcha";

// Client-side schema mirroring server-side for immediate feedback
const formSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    fleetSize: z.enum(["1-10", "11-50", "50+"] as const),
    fuelType: z.enum(["Diesel", "Super", "Both"] as const),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteForm() {
    const { t } = useLang();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setServerError(null);

        if (!captchaToken) {
            setServerError("Please verify you are not a robot.");
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await submitQuote({ ...data, captchaToken } as QuoteData & { captchaToken: string });

            if (result.success) {
                setSubmitted(true);
                // Track conversion across all platforms (GTM, LinkedIn, Meta)
                trackLeadConversion(data.fleetSize);
                reset();
            } else {
                setServerError("There was an issue processing your request. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setServerError("An unexpected error occurred. Please try again.");
        }

        setIsSubmitting(false);
    };

    if (submitted) {
        return (
            <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-100 animate-in fade-in zoom-in duration-300 shadow-tech">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.quote.success.title}</h3>
                <p className="text-slate-600">
                    {t.quote.success.message}
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-green-700 font-semibold hover:underline min-h-[44px] flex items-center justify-center mx-auto"
                >
                    {t.quote.success.another}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-tech border border-gray-100">
            {serverError && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium border border-red-100">
                    {serverError}
                </div>
            )}

            {/* Company Name */}
            <div>
                <label htmlFor="companyName" className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.companyName}</label>
                <input
                    {...register("companyName")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.companyName ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-primary/50"} focus:border-primary focus:outline-none transition-all min-h-[48px]`}
                    placeholder="e.g. Imperial Logistics"
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.companyName.message}</p>}
            </div>

            {/* Fleet Size & Fuel Type Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.fleetSize}</label>
                    <div className="relative">
                        <select
                            {...register("fleetSize")}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.fleetSize ? "border-red-500" : "border-gray-200"} focus:border-primary focus:ring-primary/50 focus:outline-none bg-white transition-all appearance-none min-h-[48px]`}
                        >
                            <option value="">{t.quote.options.selectSize}</option>
                            <option value="1-10">{t.quote.options.size1}</option>
                            <option value="11-50">{t.quote.options.size2}</option>
                            <option value="50+">{t.quote.options.size3}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {errors.fleetSize && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fleetSize.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.fuelType}</label>
                    <div className="relative">
                        <select
                            {...register("fuelType")}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.fuelType ? "border-red-500" : "border-gray-200"} focus:border-primary focus:ring-primary/50 focus:outline-none bg-white transition-all appearance-none min-h-[48px]`}
                        >
                            <option value="">{t.quote.options.selectFuel}</option>
                            <option value="Diesel">{t.quote.options.fuelDiesel}</option>
                            <option value="Super">{t.quote.options.fuelSuper}</option>
                            <option value="Both">{t.quote.options.fuelBoth}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {errors.fuelType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fuelType.message}</p>}
                </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.email}</label>
                    <input
                        type="email"
                        {...register("email")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-200"} focus:border-primary focus:ring-primary/50 focus:outline-none transition-all min-h-[48px]`}
                        placeholder="name@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.phone}</label>
                    <input
                        type="tel"
                        {...register("phone")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-gray-200"} focus:border-primary focus:ring-primary/50 focus:outline-none transition-all min-h-[48px]`}
                        placeholder="+229 00 00 00 00"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>}
                </div>
            </div>


            {/* Submit Button */}
            <div className="flex justify-center py-2">
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token: string | null) => setCaptchaToken(token)}
                    theme="light"
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting || !captchaToken}
                className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[56px]"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t.quote.form.submitting}
                    </>
                ) : (
                    t.quote.form.submit
                )}
            </button>
            <p className="text-xs text-center text-slate-400 mt-4">
                {t.quote.form.disclaimer}
            </p>
        </form>
    );
}
