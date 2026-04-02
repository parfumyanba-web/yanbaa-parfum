"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Save, AlertCircle, Settings, Phone, Mail, MapPin, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminSettingsPage() {
  const { t, language, dir } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    whatsapp_number: "",
    contact_email: "",
    address: "",
    delivery_fee: ""
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("platform_settings").select("*");
      if (data) {
        const mapped: Record<string, string> = {};
        data.forEach(item => mapped[item.key] = item.value);
        setSettings({
          whatsapp_number: mapped.whatsapp_number || "",
          contact_email: mapped.contact_email || "",
          address: mapped.address || "",
          delivery_fee: mapped.delivery_fee || ""
        });
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    
    const updates = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("platform_settings").upsert(updates);
    
    setSaving(false);
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
              {t("admin.settings.title")}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Core <span className="text-gold-gradient non-italic font-bold">Parameters✦</span>
          </h1>
        </div>

        <button 
          onClick={handleSave} 
          disabled={saving || loading}
          className="h-14 px-8 rounded-2xl bg-gold-gradient flex items-center justify-center gap-3 text-black shadow-lg shadow-[var(--gold)]/20 hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-widest disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? (language === 'ar' ? 'جاري الحفظ...' : 'SAVING...') : (language === 'ar' ? 'حفظ التغييرات' : 'SAVE CHANGES')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border-white/5 p-8 space-y-8"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <Phone size={20} className="text-[var(--gold)]" />
            <span className="text-[10px] font-black uppercase tracking-ultra text-white/20">Communication Channels</span>
          </div>

          <div className="space-y-6">
            <div className="group space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                {language === 'ar' ? 'رقم واتساب' : 'WhatsApp Number'}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20">
                  <span className="text-[10px] font-bold">+</span>
                </div>
                <input 
                  type="text" 
                  name="whatsapp_number" 
                  value={settings.whatsapp_number} 
                  onChange={handleChange}
                  placeholder="213 5XX XX XX XX"
                  className="w-full bg-black/20 border border-white/5 py-4 pl-14 pr-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" 
                />
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Contact Email'}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20">
                  <Mail size={12} />
                </div>
                <input 
                  type="email" 
                  name="contact_email" 
                  value={settings.contact_email} 
                  onChange={handleChange}
                  placeholder="contact@yanba.com"
                  className="w-full bg-black/20 border border-white/5 py-4 pl-14 pr-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" 
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Operational Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card border-white/5 p-8 space-y-8"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <Truck size={20} className="text-[var(--gold)]" />
            <span className="text-[10px] font-black uppercase tracking-ultra text-white/20">Logistics & Base</span>
          </div>

          <div className="space-y-6">
            <div className="group space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                {language === 'ar' ? 'العنوان الفعلي' : 'Physical Address'}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20">
                  <MapPin size={12} />
                </div>
                <input 
                  type="text" 
                  name="address" 
                  value={settings.address} 
                  onChange={handleChange}
                  placeholder="Algiers, Algeria"
                  className="w-full bg-black/20 border border-white/5 py-4 pl-14 pr-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" 
                />
              </div>
            </div>

            <div className="group space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest text-white/30 font-black group-focus-within:text-[var(--gold)] transition-colors">
                  {language === 'ar' ? 'تكلفة التوصيل الأساسية' : 'Base Delivery Fee'}
                </label>
                <div className="flex items-center gap-1 text-[9px] text-[var(--gold)]/40 font-black tracking-widest uppercase">
                  <AlertCircle size={10} />
                  Internal Quote Only
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 font-bold text-[10px]">
                  {t("store.currency")}
                </div>
                <input 
                  type="number" 
                  name="delivery_fee" 
                  value={settings.delivery_fee} 
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-black/20 border border-white/5 py-4 pl-14 pr-6 rounded-xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Security Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 opacity-50 max-w-2xl mx-auto text-center justify-center"
      >
        <Settings size={16} className="text-white/20" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
          {language === 'ar' 
            ? 'يتم تشفير جميع التغييرات وتحديثها لحظياً عبر خوادم Supabase' 
            : 'All changes are encrypted and updated in real-time via Supabase secure infrastructure'}
        </p>
      </motion.div>
    </div>
  );
}
