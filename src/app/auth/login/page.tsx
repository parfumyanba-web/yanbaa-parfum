"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";
import { login } from "@/actions/auth";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const { t, dir } = useLanguage();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const inputClass = "w-full input-glass py-4 text-sm font-outfit transition-all placeholder:text-white/20 rounded-xl";
  const iconStart = { [dir === 'rtl' ? 'right' : 'left']: "16px" };
  const paddingStart = dir === 'rtl' ? { paddingRight: "48px", paddingLeft: "16px" } : { paddingLeft: "48px", paddingRight: "16px" };

  return (
    <div className="min-h-screen bg-[var(--deep-bg)] flex" dir={dir}>
      {/* Left Decorative Visual Pane */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-[#120f0d] to-[#09090b] items-center justify-center p-12">
        <div className="absolute inset-0 bg-[var(--gold)]/5 blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg-texture.png')] opacity-10 mix-blend-overlay" />
        
        <div className="relative z-10 text-center max-w-lg">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--deep-bg)] shadow-[0_0_40px_rgba(245,211,138,0.2)]">
              <span className="text-[var(--gold)] text-4xl font-bold font-outfit">Y</span>
            </div>
          </motion.div>
          
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="font-playfair text-5xl text-white mb-6 leading-tight">
            {dir === 'rtl' ? "مرحباً بك مجدداً" : "Bon retour parmi nous"}
          </motion.h2>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50 text-lg font-outfit leading-relaxed">
            {t("hero.subtitle")}
          </motion.p>
        </div>

        {/* Decorative elements */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] border border-[var(--border-subtle)] rounded-full border-dashed opacity-20" />
      </div>

      {/* Right Form Pane */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 relative overflow-y-auto">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/40 hover:text-[var(--gold)] text-[10px] font-bold uppercase tracking-widest transition-colors group z-10 glass-panel px-4 py-2 rounded-full">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
          {t("nav.home")}
        </Link>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <div className="mb-10 lg:hidden text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--deep-bg)] mb-6">
              <span className="text-[var(--gold)] text-2xl font-bold font-outfit">Y</span>
            </div>
            <h1 className="font-playfair text-3xl text-white">{t("auth.login")}</h1>
          </div>

          <div className="hidden lg:block mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 mb-6 text-[9px] uppercase tracking-widest text-[var(--gold)] font-bold">
              <Sparkles size={12} /> {t("nav.account")}
            </div>
            <h1 className="font-playfair text-4xl text-white">{t("auth.login")}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{t("auth.email")}</label>
              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 text-[var(--gold)]/50 pointer-events-none" style={iconStart} size={18} />
                <input
                  type="email" name="email" required
                  className={inputClass} style={paddingStart}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{t("auth.password")}</label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 text-[var(--gold)]/50 pointer-events-none" style={iconStart} size={18} />
                <input
                  type={showPass ? "text" : "password"} name="password" required
                  className={inputClass} style={{ paddingInlineStart: "48px", paddingInlineEnd: "48px" }}
                />
                <button
                  type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute top-1/2 -translate-y-1/2 text-white/30 hover:text-[var(--gold)] transition-colors"
                  style={{ [dir === 'rtl' ? 'left' : 'right']: '16px' }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl flex items-center gap-2">
                <div className="w-1 h-4 bg-red-400 rounded-full" />
                {error}
              </motion.div>
            )}

            <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 mt-4 disabled:opacity-50 hover:scale-[1.02] shadow-[0_8px_30px_rgba(245,211,138,0.2)] bg-gold-gradient text-black">
              {isLoading ? t("common.loading") : t("auth.submit.login")}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-white/50 font-outfit uppercase tracking-wider">
            {t("auth.noAccount")}{" "}
            <Link href="/auth/register" className="text-[var(--gold)] hover:text-white font-bold transition-colors">
              {t("auth.register")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
