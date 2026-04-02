"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function FavoritesPage() {
  const { t, language, dir } = useLanguage();

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
              {t("dash.favorites")}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Curated <span className="text-gold-gradient non-italic font-bold">Selection✦</span>
          </h1>
        </div>

        <Link 
          href="/store" 
          className="h-14 px-8 rounded-2xl bg-gold-gradient flex items-center justify-center gap-3 text-black shadow-lg shadow-[var(--gold)]/20 hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-widest"
        >
          <ShoppingBag size={18} />
          {t("nav.store")}
        </Link>
      </div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-32 glass-card border-dashed border-white/5 bg-white/[0.01]"
      >
        <div className="relative mb-8">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-white/10"
          >
            <Heart size={40} strokeWidth={1} />
          </motion.div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-black">
            <Sparkles size={14} />
          </div>
        </div>

        <div className="text-center space-y-4 max-w-sm px-6">
          <h3 className="text-2xl font-playfair text-white italic">
            {t("account.favorites.empty")}
          </h3>
          <p className="text-[10px] text-white/20 font-black uppercase tracking-widest leading-relaxed">
            Your personal curation of Yanba fine fragrances will appear here once you mark them as favorites in the store.
          </p>
        </div>

        <Link 
          href="/store" 
          className="mt-12 flex items-center gap-3 text-[var(--gold)] font-black uppercase tracking-widest text-[10px] hover:gap-5 transition-all"
        >
          {dir === 'rtl' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          Explore Collection
          {dir === 'rtl' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
        </Link>
      </motion.div>
    </div>
  );
}
