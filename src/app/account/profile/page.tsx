"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Save, Eye, EyeOff, ShieldCheck, Mail, Phone, Briefcase, UserCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfilePage() {
  const { t, language, dir } = useLanguage();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-8 h-[1px] bg-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase font-black">
              {t("dash.profile")}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Identity <span className="text-gold-gradient non-italic font-bold">Studio✦</span>
          </h1>
        </div>

        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
          {(["info", "password"] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab ? "bg-gold-gradient text-black shadow-lg shadow-[var(--gold)]/20" : "text-white/30 hover:text-white"
              }`}
            >
              {tab === "info" ? t("account.profile.edit") : t("account.profile.changePass")}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl">
        <AnimatePresence mode="wait">
          {activeTab === "info" ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Personal Info */}
              <div className="glass-card border-white/5 p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                  <UserCircle size={20} className="text-[var(--gold)]" />
                  <span className="text-[10px] font-black uppercase tracking-ultra text-white/20">Legal Representative</span>
                </div>

                <div className="space-y-6">
                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                      {t("auth.fullName")}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                        <User size={14} />
                      </div>
                      <input type="text" className="w-full bg-black/20 border border-white/5 py-4 pl-12 pr-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" placeholder={t("auth.fullName")} />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                      {t("auth.email")}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                        <Mail size={14} />
                      </div>
                      <input type="email" className="w-full bg-black/20 border border-white/5 py-4 pl-12 pr-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" placeholder={t("auth.email")} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div className="glass-card border-white/5 p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                  <Briefcase size={20} className="text-[var(--gold)]" />
                  <span className="text-[10px] font-black uppercase tracking-ultra text-white/20">Enterprise Details</span>
                </div>

                <div className="space-y-6">
                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                      {t("auth.storeName")}
                    </label>
                    <input type="text" className="w-full bg-black/20 border border-white/5 py-4 px-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" placeholder={t("auth.storeName")} />
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                      {t("auth.phone")}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                        <Phone size={14} />
                      </div>
                      <input type="tel" className="w-full bg-black/20 border border-white/5 py-4 pl-12 pr-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" placeholder="+213..." />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 flex justify-center pt-4">
                <button 
                  onClick={handleSave}
                  className="h-14 px-12 rounded-2xl bg-gold-gradient flex items-center justify-center gap-3 text-black shadow-lg shadow-[var(--gold)]/20 hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-widest disabled:opacity-50"
                >
                  <Save size={18} />
                  {saving ? (language === 'ar' ? 'جاري الحفظ...' : 'SAVING...') : (language === 'ar' ? 'حفظ التغييرات' : 'SAVE CHANGES')}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="password"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto glass-card border-white/5 p-8 mt-12"
            >
               <div className="flex items-center gap-3 border-b border-white/5 pb-6 mb-8">
                  <Lock size={20} className="text-[var(--gold)]" />
                  <span className="text-[10px] font-black uppercase tracking-ultra text-white/20">Security Layer</span>
                </div>

                <div className="space-y-6">
                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                      {t("auth.password")}
                    </label>
                    <div className="relative">
                      <input 
                        type={showOld ? "text" : "password"} 
                        className="w-full bg-black/20 border border-white/5 py-4 px-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" 
                      />
                      <button onClick={() => setShowOld(!showOld)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                        {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                      {t("auth.confirmPassword")}
                    </label>
                    <div className="relative">
                      <input 
                        type={showNew ? "text" : "password"} 
                        className="w-full bg-black/20 border border-white/5 py-4 px-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" 
                      />
                       <button onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={handleSave}
                    className="w-full h-14 rounded-2xl bg-gold-gradient flex items-center justify-center gap-3 text-black shadow-lg shadow-[var(--gold)]/20 hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-widest mt-8"
                  >
                    <ShieldCheck size={18} />
                    {saving ? 'UPDATING...' : 'UPDATE SECURITY KEY'}
                  </button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
