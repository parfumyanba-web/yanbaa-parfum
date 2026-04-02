"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Tag, Plus, Info, Database, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminTagsPage() {
  const { t, language, dir } = useLanguage();
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTags = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("products").select("tags");
    
    if (data) {
      const allTags = new Set<string>();
      data.forEach(p => {
        if (p.tags && Array.isArray(p.tags)) {
          p.tags.forEach(t => allTags.add(t));
        }
      });
      setTags(Array.from(allTags));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);

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
              {language === 'ar' ? 'تصنيفات العطور' : 'FRAGRANCE TAXONOMY'}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Visual <span className="text-gold-gradient non-italic font-bold">Tags✦</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 glass-card border-white/5 p-8 flex flex-col gap-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-gold-gradient flex items-center justify-center text-black">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-xl font-playfair text-white mb-2 italic">How it works</h3>
            <p className="text-sm text-white/40 leading-relaxed font-inter uppercase tracking-wide text-[10px] font-black italic">
              {language === 'ar' 
                ? 'يتم إنشاء العلامات تلقائياً عند إضافتها لأي منتج. أي علامة تُضاف لمنتج ستظهر هنا وتُعرض في المتجر ديناميكياً.'
                : 'Tags are generated automatically when added to any product. Any tag added to a product will appear here and in the store dynamically.'}
            </p>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
            <Database size={20} className="text-[var(--gold)]" />
            <div>
              <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Total Active Tags</p>
              <p className="text-2xl font-playfair text-white italic">{tags.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Tag Cloud */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card border-white/5 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-[var(--gold)]" />
              <span className="text-[10px] font-black uppercase tracking-ultra text-white/20">Active Database</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {loading ? (
              <div className="flex items-center gap-3 px-6 py-12 w-full justify-center opacity-20">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest">Indexing catalog...</span>
              </div>
            ) : tags.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-20 w-full opacity-10">
                <Tag size={48} />
                <span className="text-[10px] font-black uppercase tracking-widest text-center">No tags detected in product catalog</span>
              </div>
            ) : (
              tags.map((tag, idx) => (
                <motion.div 
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="group relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/5 glass-panel transition-all hover:bg-white/10 hover:border-[var(--gold)]/30 cursor-pointer"
                >
                  <Tag size={12} className="text-white/20 group-hover:text-[var(--gold)] transition-colors" />
                  <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{tag}</span>
                  <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[var(--gold)] blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
