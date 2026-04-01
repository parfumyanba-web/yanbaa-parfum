"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Globe, Layout, Image as ImageIcon, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AdminCMS() {
  const [announcement, setAnnouncement] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from("cms_settings")
        .select("value")
        .eq("key", "announcement_bar")
        .single();
      
      if (data?.value) {
        setAnnouncement(data.value.text);
        setIsActive(data.value.active);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from("cms_settings")
      .upsert({
        key: "announcement_bar",
        value: { text: announcement, active: isActive },
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setMessage("Error updating settings: " + error.message);
    } else {
      setMessage("Settings updated successfully.");
      setTimeout(() => setMessage(null), 3000);
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-playfair text-4xl text-white mb-2">Platform Content (CMS)</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-inter">Manage Global Brand Messaging</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gold-500 text-black px-8 py-3 flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold font-inter hover:bg-white transition-all disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? "Saving Changes..." : "Publish Updates"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcement Bar Section */}
        <div className="bg-white/5 border border-white/10 p-8 space-y-8">
          <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
            <Bell className="text-gold-500" size={20} />
            <h2 className="font-playfair text-xl text-white uppercase tracking-wider">Top Announcement Bar</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-inter">Display Status</label>
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isActive ? "bg-gold-500/30" : "bg-white/10"}`}
              >
                <div 
                  className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    isActive ? "right-1 bg-gold-500" : "left-1 bg-white/20"
                  }`} 
                />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-inter">Announcement Text (Multilingual)</label>
              <textarea 
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows={3} 
                placeholder="e.g. Free shipping on all wholesale orders over $10,000"
                className="w-full bg-black/40 border border-white/10 py-3 px-4 text-sm font-inter text-white focus:border-gold-500/50 outline-none resize-none"
              />
              <p className="text-[10px] text-white/20 italic">This message appears at the very top of all store pages.</p>
            </div>
          </div>
        </div>

        {/* Brand Theme / Assets Section (Placeholder) */}
        <div className="bg-white/5 border border-white/10 p-8 space-y-8 opacity-60">
          <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
            <Globe className="text-white/40" size={20} />
            <h2 className="font-playfair text-xl text-white uppercase tracking-wider">Localization & SEO</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Layout size={32} className="text-white/10 mb-4" />
            <p className="text-xs text-white/20 font-inter max-w-xs">Localized SEO meta-tags and homepage hero management will be available here soon.</p>
          </div>
        </div>
      </div>

      {message && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-12 right-12 bg-gold-500 text-black px-8 py-4 shadow-2xl flex items-center gap-4 z-50 font-bold text-xs uppercase tracking-widest"
        >
          <AlertCircle size={18} />
          {message}
        </motion.div>
      )}
    </div>
  );
}
