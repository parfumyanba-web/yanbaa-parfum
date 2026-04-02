"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Bell, Globe, Layout, Image as ImageIcon, AlertCircle, Sparkles, Megaphone, Search, Zap } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminCMSPage() {
  const { t, language, dir } = useLanguage();
  const [announcement, setAnnouncement] = useState("");
  const [isActive, setIsActive] = useState(true);
  
  // SEO States
  const [seoHome, setSeoHome] = useState({
    title_ar: "", title_fr: "",
    desc_ar: "", desc_fr: "",
    keys_ar: "", keys_fr: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchSettings() {
      const { data: annData } = await supabase
        .from("cms_settings")
        .select("value")
        .eq("key", "announcement_bar")
        .single();
      
      if (annData?.value) {
        setAnnouncement(annData.value.text);
        setIsActive(annData.value.active);
      }

      const { data: seoData } = await supabase
        .from("cms_settings")
        .select("value")
        .eq("key", "seo_home")
        .single();

      if (seoData?.value) {
        setSeoHome(seoData.value);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    const results = await Promise.all([
      supabase.from("cms_settings").upsert({
        key: "announcement_bar",
        value: { text: announcement, active: isActive },
        updated_at: new Date().toISOString(),
      }),
      supabase.from("cms_settings").upsert({
        key: "seo_home",
        value: seoHome,
        updated_at: new Date().toISOString(),
      })
    ]);

    const error = results.find(r => r.error);

    if (error) {
      setMessage("Error: " + (error as any).error?.message || "Unknown error");
    } else {
      setMessage(language === 'ar' ? 'تم الحفظ والنتشار بنجاح' : 'Published successfully.');
      setTimeout(() => setMessage(null), 3000);
    }
    setIsSaving(false);
  };

  const inputClass = "w-full bg-black/20 border border-white/5 py-3 px-4 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none glass-panel";

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
              {language === 'ar' ? 'إدارة المحتوى' : 'CONTENT MANAGEMENT'}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Platform <span className="text-gold-gradient non-italic font-bold">Studio✦</span>
          </h1>
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="h-14 px-8 rounded-2xl bg-gold-gradient flex items-center justify-center gap-3 text-black shadow-lg shadow-[var(--gold)]/20 hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-widest disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? (language === 'ar' ? 'جاري النشر...' : 'PUBLISHING...') : (language === 'ar' ? 'نشر التحديثات' : 'PUBLISH UPDATES')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcement Bar Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border-white/5 p-8 space-y-8 h-fit"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <Megaphone size={20} className="text-[var(--gold)]" />
              <span className="text-[10px] font-black uppercase tracking-ultra text-white/20">Global Announcement Bar</span>
            </div>
            
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`w-12 h-6 rounded-full relative transition-all duration-500 border ${
                isActive ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/10"
              }`}
            >
              <div 
                className={`absolute top-1 w-[14px] h-[14px] rounded-full transition-all duration-500 shadow-sm ${
                  isActive 
                    ? "right-1 bg-emerald-400" 
                    : "left-1 bg-white/20"
                }`} 
              />
            </button>
          </div>

          <div className="space-y-6">
            <div className="group space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                {language === 'ar' ? 'نص الإعلان' : 'Broadcast Message'}
              </label>
              <textarea 
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows={4} 
                className="w-full bg-black/20 border border-white/5 py-4 px-6 rounded-2xl text-sm font-inter text-white focus:border-[var(--gold)]/30 transition-all outline-none resize-none glass-panel"
              />
            </div>
          </div>
        </motion.div>

        {/* Home Page SEO Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card border-white/5 p-8 space-y-8"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <Globe size={20} className="text-[var(--gold)]" />
            <span className="text-[10px] font-black uppercase tracking-ultra text-white/20">Home Page Meta Strategy</span>
          </div>

          <div className="space-y-8">
            {/* Arabic Metadata */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[8px] font-bold">AR</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Arabic Identity</span>
              </div>
              <input 
                type="text" value={seoHome.title_ar} placeholder="Home Page Title (AR)" 
                onChange={e => setSeoHome({...seoHome, title_ar: e.target.value})} className={inputClass} 
              />
              <textarea 
                value={seoHome.desc_ar} placeholder="Meta Description (AR)" rows={3}
                onChange={e => setSeoHome({...seoHome, desc_ar: e.target.value})} className={inputClass + " resize-none"} 
              />
            </div>

            {/* French Metadata */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[8px] font-bold">FR</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">French Identity</span>
              </div>
              <input 
                type="text" value={seoHome.title_fr} placeholder="Home Page Title (FR)" 
                onChange={e => setSeoHome({...seoHome, title_fr: e.target.value})} className={inputClass} 
              />
              <textarea 
                value={seoHome.desc_fr} placeholder="Meta Description (FR)" rows={3}
                onChange={e => setSeoHome({...seoHome, desc_fr: e.target.value})} className={inputClass + " resize-none"} 
              />
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 right-12 glass-card border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] px-8 py-4 shadow-2xl flex items-center gap-4 z-50 font-black text-[10px] uppercase tracking-widest backdrop-blur-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
              <AlertCircle size={16} />
            </div>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
