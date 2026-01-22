"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitQuote } from "@/app/actions";
import { trackLeadConversion } from "@/lib/analytics";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { useLang } from "@/context/LangContext";
import ReCAPTCHA from "react-google-recaptcha";

// Client-side schema mirroring server-side
const formSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    industry: z.string().min(1, "Please select an industry"),
    fleetSize: z.string().min(1, "Please select fleet size"),
    productNeeds: z.array(z.string()).min(1, "Select at least one product"),
    serviceInterests: z.array(z.string()).optional(),
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
        setValue,
        watch,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productNeeds: [],
            serviceInterests: []
        }
    });

    // Watch arrays for checkbox handling
    const selectedProducts = watch("productNeeds") || [];
    const selectedServices = watch("serviceInterests") || [];

    const handleCheckboxChange = (field: "productNeeds" | "serviceInterests", value: string, checked: boolean) => {
        const current = field === "productNeeds" ? selectedProducts : selectedServices;
        if (checked) {
            setValue(field, [...current, value], { shouldValidate: true });
        } else {
            setValue(field, current.filter((item) => item !== value), { shouldValidate: true });
        }
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setServerError(null);

        const captchaEnabled = process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== 'true' && !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

        if (captchaEnabled && !captchaToken) {
            setServerError("Please verify you are not a robot.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Check if we need to adapt structure or if server action is updated
            // We'll pass generic data, server action will need update
            const result = await submitQuote({ ...data, captchaToken });

            if (result.success) {
                setSubmitted(true);
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
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Quote Requested!</h3>
                <p className="text-slate-600">
                    Our sales team will contact you shortly via {watch("email")}.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-green-700 font-semibold hover:underline min-h-[44px] flex items-center justify-center mx-auto"
                >
                    Submit another request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl shadow-tech border border-gray-100 text-left">
            {serverError && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium border border-red-100">
                    {serverError}
                </div>
            )}

            {/* Section 1: Basics */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Company Basics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.companyName}</label>
                        <input
                            {...register("companyName")}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.companyName ? "border-red-500" : "border-gray-200"} focus:border-primary focus:outline-none transition-all`}
                            placeholder="e.g. Imperial Logistics"
                        />
                        {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.industry}</label>
                        <div className="relative">
                            <select
                                {...register("industry")}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.industry ? "border-red-500" : "border-gray-200"} focus:border-primary focus:outline-none appearance-none bg-white`}
                            >
                                <option value="">Select...</option>
                                <option value="Logistics">{t.quote.options.industry.logistics}</option>
                                <option value="Construction">{t.quote.options.industry.construction}</option>
                                <option value="Mining">{t.quote.options.industry.mining}</option>
                                <option value="Agriculture">{t.quote.options.industry.agriculture}</option>
                                <option value="Other">{t.quote.options.industry.other}</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>
                        {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
                    </div>
                </div>
            </div>

            {/* Section 2: Fleet & Needs */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Fleet & Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.fleetSize}</label>
                        <div className="relative">
                            <select
                                {...register("fleetSize")}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.fleetSize ? "border-red-500" : "border-gray-200"} focus:border-primary focus:outline-none appearance-none bg-white`}
                            >
                                <option value="">{t.quote.options.selectSize}</option>
                                <option value="1-10">{t.quote.options.size1}</option>
                                <option value="11-50">{t.quote.options.size2}</option>
                                <option value="50+">{t.quote.options.size3}</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>
                        {errors.fleetSize && <p className="text-red-500 text-xs mt-1">{errors.fleetSize.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">{t.quote.form.productNeeds}</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: "fuel", label: t.quote.options.products.fuel },
                                { id: "lubricants", label: t.quote.options.products.lubricants },
                                { id: "bulk", label: t.quote.options.products.bulk },
                                { id: "vouchers", label: t.quote.options.products.vouchers }
                            ].map((item) => (
                                <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={item.id}
                                        checked={selectedProducts.includes(item.id)}
                                        onChange={(e) => handleCheckboxChange("productNeeds", item.id, e.target.checked)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                    />
                                    <span className="text-sm text-slate-600 font-medium">{item.label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.productNeeds && <p className="text-red-500 text-xs mt-1">{errors.productNeeds.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">{t.quote.form.serviceInterests}</label>
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6">
                        {[
                            { id: "employeeMgmt", label: t.quote.options.services.employeeMgmt },
                            { id: "eVouchers", label: t.quote.options.services.eVouchers },
                            { id: "reporting", label: t.quote.options.services.reporting }
                        ].map((item) => (
                            <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    checked={selectedServices.includes(item.id)}
                                    onChange={(e) => handleCheckboxChange("serviceInterests", item.id, e.target.checked)}
                                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                />
                                <span className="text-sm text-slate-600 font-medium">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 3: Contact */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Contact Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.email}</label>
                        <input
                            type="email"
                            {...register("email")}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-200"} focus:border-primary focus:outline-none transition-all`}
                            placeholder="name@company.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.quote.form.phone}</label>
                        <input
                            type="tel"
                            {...register("phone")}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-gray-200"} focus:border-primary focus:outline-none transition-all`}
                            placeholder="+229..."
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                </div>
            </div>

            {/* Captcha & Submit */}
            {process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== 'true' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <div className="flex justify-center py-2">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={(token: string | null) => setCaptchaToken(token)}
                        theme="light"
                    />
                </div>
            )}
            <button
                type="submit"
                disabled={isSubmitting || (process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== 'true' && !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken)}
                className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
