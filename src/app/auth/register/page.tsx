"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { User, Store, Mail, Lock, Phone, ChevronDown, Eye, EyeOff, ArrowLeft, Sparkles, MapPin, Briefcase } from "lucide-react";
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

  const inputClass = "w-full bg-white/5 border border-white/10 py-4 px-12 text-sm text-white rounded-2xl focus:border-[var(--gold)]/40 focus:bg-white/[0.08] transition-all outline-none";

  return (
    <div className="min-h-screen bg-[#070707] flex font-inter" dir={dir}>
      
      {/* Left side: Visual Pane (Luxury Brand Image) */}
      <div className="hidden lg:flex w-[45%] relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#121212] items-center justify-center p-20 border-r border-white/5">
        <div className="absolute inset-0 bg-gold-gradient opacity-[0.03] blur-[150px]" />
        
        <div className="relative z-10 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="mb-12 flex justify-center"
          >
            <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl relative group">
               <div className="absolute inset-0 rounded-full bg-gold-gradient opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
               <span className="text-[var(--gold)] text-5xl font-playfair font-bold">Y</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="font-playfair text-5xl text-white mb-8 leading-tight italic"
          >
            Noble <span className="text-gold-gradient non-italic font-bold">Partnership✦</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="text-white/30 text-sm font-black uppercase tracking-[0.3em] leading-relaxed"
          >
            {language === 'ar' ? 'انضم إلى شبكتنا الحصرية من بائعي العطور الفاخرة' : 'Join our exclusive network of luxury fragrance partners'}
          </motion.p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] text-white/10 font-bold uppercase tracking-[0.5em]">
          Yanba Fine Fragrances © 2026
        </div>
      </div>

      {/* Right side: Form Pane */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 md:p-16 lg:p-24 relative overflow-y-auto">
        <Link 
          href="/" 
          className="absolute top-12 left-12 flex items-center gap-2 text-white/20 hover:text-white transition-all group z-10"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10">
            <ArrowLeft size={14} className="rtl:rotate-180" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">{t("nav.home")}</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-[540px] space-y-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-6 font-black uppercase tracking-widest text-[9px] text-[var(--gold)]">
              <Sparkles size={12} /> B2B Portal
            </div>
            <h1 className="text-4xl font-playfair text-white italic">{t("auth.register")}</h1>
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Initialize your professional account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-black px-1">{t("auth.fullName")}</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input type="text" name="fullName" required className={inputClass} placeholder="Full Name" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-black px-1">{t("auth.storeName")}</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input type="text" name="businessName" required className={inputClass} placeholder="Entity Name" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-black px-1">{t("auth.phone")}</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input type="tel" name="phone" required className={inputClass} placeholder="+213..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-black px-1">{t("auth.address")}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input type="text" name="address" required className={inputClass} placeholder="Full Physical Address" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-black px-1">{t("auth.wilaya")}</label>
                <div className="relative">
                  <select 
                    name="wilaya" 
                    required 
                    value={selectedWilaya} 
                    onChange={e => setSelectedWilaya(e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 py-4 px-6 text-sm text-white rounded-2xl appearance-none outline-none focus:border-[var(--gold)]/40 transition-all cursor-pointer"
                  >
                    <option value="" className="bg-[#111]">{t("auth.selectWilaya")}</option>
                    {WILAYAS.map(w => <option key={w.code} value={w.code} className="bg-[#111]">{language === "ar" ? `${w.code} - ${w.ar}` : `${w.code} - ${w.fr}`}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-black px-1">{t("auth.commune")}</label>
                <div className="relative">
                  <select 
                    name="commune" 
                    required 
                    disabled={!selectedWilaya} 
                    className="w-full bg-white/5 border border-white/10 py-4 px-6 text-sm text-white rounded-2xl appearance-none outline-none focus:border-[var(--gold)]/40 transition-all cursor-pointer disabled:opacity-20"
                  >
                    <option value="" className="bg-[#111]">{t("auth.selectCommune")}</option>
                    {communes.map(c => <option key={c.value} value={c.value} className="bg-[#111]">{c.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-black px-1">{t("auth.password")}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input type={showPass ? "text" : "password"} name="password" required className={inputClass} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 font-black px-1">{t("auth.confirmPassword")}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input type={showConfirm ? "text" : "password"} name="confirmPassword" required className={inputClass} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-400/10 border border-red-400/20 px-6 py-4 rounded-xl">
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-16 rounded-2xl bg-gold-gradient text-black font-black uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-[var(--gold)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Processing Access...' : t("auth.submit.register")}
            </button>
          </form>

          <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            {t("auth.haveAccount")}{" "}
            <Link href="/auth/login" className="text-[var(--gold)] hover:text-white transition-colors">
              {t("auth.login")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
