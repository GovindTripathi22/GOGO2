'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Lock, ArrowRight, AlertCircle, Mail, KeyRound, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== 'true' && !captchaToken) {
            setError('Please complete the captcha verification.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, captchaToken }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.success) {
                // Redirect immediately on success
                router.push('/admin');
                router.refresh(); // Ensure middleware/server components update
            }
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#FED75F]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#ED6A21]/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block group">
                        <h1 className="text-4xl font-bold italic tracking-tighter text-white mb-2">
                            GOGO
                        </h1>
                        <div className="h-1 w-12 bg-[#FED75F] mx-auto rounded-full group-hover:w-24 transition-all duration-300" />
                    </Link>
                    <p className="mt-4 text-neutral-400 font-medium">Admin & CMS Portal</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                >
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-[#FED75F]/20 rounded-lg text-[#FED75F]">
                            <Lock className="w-5 h-5" />
                        </div>
                        Secure Login
                    </h2>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-200 font-medium">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400 ml-1">Email Access</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-[#FED75F] transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@gogo.bj"
                                    className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[#FED75F] focus:ring-1 focus:ring-[#FED75F] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400 ml-1">Password</label>
                            <div className="relative group">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-[#FED75F] transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-neutral-600 focus:outline-none focus:border-[#FED75F] focus:ring-1 focus:ring-[#FED75F] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== 'true' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                            <div className="flex justify-center py-2 scale-90 origin-center">
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    onChange={(token: string | null) => setCaptchaToken(token)}
                                    theme="dark"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || (process.env.NEXT_PUBLIC_DISABLE_CAPTCHA !== 'true' && !captchaToken)}
                            className="w-full bg-[#FED75F] hover:bg-[#FDBA31] text-neutral-950 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-[#FED75F]/20 hover:shadow-[#FED75F]/40"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Access CRM
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <p className="text-xs text-neutral-500">
                            Authorized personnel only.
                        </p>
                        {process.env.NEXT_PUBLIC_DISABLE_CAPTCHA === 'true' && (
                            <p className="text-[10px] text-yellow-500/50 mt-2 font-mono uppercase tracking-widest">
                                TEST MODE: CAPTCHA BYPASSED
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


