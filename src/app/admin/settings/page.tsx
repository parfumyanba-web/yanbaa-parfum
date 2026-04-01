"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { createClient } from "@/utils/supabase/client";
import { Save, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSettingsClient() {
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
    await supabase.from("platform_settings").upsert(updates);
    
    setSaving(false);
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar role="admin" />
      <main className="flex-1 lg:mr-60 p-6 md:p-12 pt-20">
        <div className="max-w-3xl">
          <h1 className="font-playfair text-4xl text-white mb-2">إعدادات المنصة</h1>
          <p className="text-white/30 text-[11px] uppercase tracking-widest mb-10">إدارة معلومات الاتصال وبيانات المنصة</p>

          <form onSubmit={handleSave} className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] border border-white/10 p-8 space-y-5">
              
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50">رقم واتساب (مثل: 213555000000)</label>
                <input required type="text" name="whatsapp_number" value={settings.whatsapp_number} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 py-3.5 px-4 text-sm text-white focus:border-[#D4AF37]/50 transition-all outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50">البريد الإلكتروني للتواصل</label>
                <input required type="email" name="contact_email" value={settings.contact_email} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 py-3.5 px-4 text-sm text-white focus:border-[#D4AF37]/50 transition-all outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50">العنوان</label>
                <input required type="text" name="address" value={settings.address} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 py-3.5 px-4 text-sm text-white focus:border-[#D4AF37]/50 transition-all outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50 flex items-center gap-2">
                  <AlertCircle size={14} className="text-[#D4AF37]" />
                  تكلفة التوصيل (للتوثيق الداخلي فقط)
                </label>
                <input required type="number" name="delivery_fee" value={settings.delivery_fee} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 py-3.5 px-4 text-sm text-white focus:border-[#D4AF37]/50 transition-all outline-none" />
              </div>

            </motion.div>

            <button type="submit" disabled={saving || loading}
              className="flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #D4AF37, #A88820)", color: "#0a0a0a" }}>
              <Save size={14} />
              {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
