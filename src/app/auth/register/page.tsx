"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { User, Store, Mail, Lock, Phone, ChevronDown, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";
import { register } from "@/actions/auth";
import { useLanguage } from "@/context/LanguageContext";
import { WILAYAS, getCommunesByWilaya } from "@/data/wilayas";

export default function RegisterPage() {
  const { t, language, dir } = useLanguage();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [communes, setCommunes] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (selectedWilaya) {
      setCommunes(getCommunesByWilaya(selectedWilaya, language));
    }
  }, [selectedWilaya, language]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError(t("auth.error.mismatch"));
      setIsLoading(false);
      return;
    }
    const result = await register(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const inputClass = "w-full input-glass py-4 text-sm font-outfit transition-all placeholder:text-white/20 rounded-xl";
  const iconStart = { [dir === 'rtl' ? 'right' : 'left']: "16px" };
  const paddingStart = dir === 'rtl' ? { paddingRight: "48px", paddingLeft: "16px" } : { paddingLeft: "48px", paddingRight: "16px" };

  const Field = ({ icon: Icon, label, name, type = "text", placeholder = "" }: any) => (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</label>
      <div className="relative">
        <Icon className="absolute top-1/2 -translate-y-1/2 text-[var(--gold)]/50 pointer-events-none" style={iconStart} size={18} />
        <input type={type} name={name} required placeholder={placeholder} className={inputClass} style={paddingStart} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--deep-bg)] flex" dir={dir}>
      
      {/* Left side: Visual Pane */}
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
            {dir === 'rtl' ? "انضم إلى عالم الفخامة" : "Rejoignez l'univers du luxe"}
          </motion.h2>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50 text-lg font-outfit leading-relaxed">
            {t("hero.subtitle2")}
          </motion.p>
        </div>

        {/* Decorative elements */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] border border-[var(--border-subtle)] rounded-full border-dashed opacity-20" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] border border-[var(--border-subtle)] rounded-full opacity-20" />
      </div>

      {/* Right side: Form Pane */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 relative overflow-y-auto">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/40 hover:text-[var(--gold)] text-[10px] font-bold uppercase tracking-widest transition-colors group z-10 glass-panel px-4 py-2 rounded-full">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
          {t("nav.home")}
        </Link>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-[480px]">
          
          <div className="mb-10 lg:hidden text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--deep-bg)] mb-6">
              <span className="text-[var(--gold)] text-2xl font-bold font-outfit">Y</span>
            </div>
            <h1 className="font-playfair text-3xl text-white">{t("auth.register")}</h1>
          </div>
          
          <div className="hidden lg:block mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 mb-6 text-[9px] uppercase tracking-widest text-[var(--gold)] font-bold">
              <Sparkles size={12} /> {t("nav.account")}
            </div>
            <h1 className="font-playfair text-4xl text-white">{t("auth.register")}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field icon={User} label={t("auth.fullName")} name="fullName" placeholder="" />
              <Field icon={Store} label={t("auth.storeName")} name="businessName" placeholder="" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field icon={Mail} label={t("auth.email")} name="email" type="email" />
              <Field icon={Phone} label={t("auth.phone")} name="phone" type="tel" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{t("auth.wilaya")}</label>
                <div className="relative">
                  <ChevronDown className="absolute top-1/2 -translate-y-1/2 text-[var(--gold)] pointer-events-none" style={{ [dir === 'rtl' ? 'left' : 'right']: '16px' }} size={16} />
                  <select name="wilaya" required value={selectedWilaya} onChange={e => setSelectedWilaya(e.target.value)} className="w-full appearance-none input-glass py-4 px-4 text-sm rounded-xl cursor-pointer">
                    <option value="" className="bg-[#111] text-white/30">{t("auth.selectWilaya")}</option>
                    {WILAYAS.map(w => <option key={w.code} value={w.code} className="bg-[#111]">{language === "ar" ? `${w.code} - ${w.ar}` : `${w.code} - ${w.fr}`}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{t("auth.commune")}</label>
                <div className="relative">
                  <ChevronDown className="absolute top-1/2 -translate-y-1/2 text-[var(--gold)] pointer-events-none" style={{ [dir === 'rtl' ? 'left' : 'right']: '16px' }} size={16} />
                  <select name="commune" required disabled={!selectedWilaya} className="w-full appearance-none input-glass py-4 px-4 text-sm rounded-xl cursor-pointer disabled:opacity-40">
                    <option value="" className="bg-[#111] text-white/30">{t("auth.selectCommune")}</option>
                    {communes.map(c => <option key={c.value} value={c.value} className="bg-[#111]">{c.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{t("auth.password")}</label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 text-[var(--gold)]/50 pointer-events-none" style={iconStart} size={18} />
                <input type={showPass ? "text" : "password"} name="password" required className={inputClass} style={{ paddingInlineStart: "48px", paddingInlineEnd: "48px" }} />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute top-1/2 -translate-y-1/2 text-white/30 hover:text-[var(--gold)] transition-colors" style={{ [dir === 'rtl' ? 'left' : 'right']: '16px' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{t("auth.confirmPassword")}</label>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 text-[var(--gold)]/50 pointer-events-none" style={iconStart} size={18} />
                <input type={showConfirm ? "text" : "password"} name="confirmPassword" required className={inputClass} style={{ paddingInlineStart: "48px", paddingInlineEnd: "48px" }} />
                <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute top-1/2 -translate-y-1/2 text-white/30 hover:text-[var(--gold)] transition-colors" style={{ [dir === 'rtl' ? 'left' : 'right']: '16px' }}>
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
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
              {isLoading ? t("common.loading") : t("auth.submit.register")}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-white/50 font-outfit uppercase tracking-wider">
            {t("auth.haveAccount")}{" "}
            <Link href="/auth/login" className="text-[var(--gold)] hover:text-white font-bold transition-colors">
              {t("auth.login")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
