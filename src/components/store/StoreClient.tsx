"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Eye, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

import { ProductCard } from "./ProductCard";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export default function StoreClient() {
  const { t, dir } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: t("store.all") },
    { id: "شرقي", label: "شرقي / Oriental" },
    { id: "زهري", label: "زهري / Floral" },
    { id: "خشبي", label: "خشبي / Boisé" },
  ];

  const filtered = useMemo(() => MOCK_PRODUCTS.filter(p => {
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  }), [selectedCategory, searchQuery]);

  return (
    <div dir={dir} className="relative min-h-screen bg-[var(--deep-bg)] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--gold)]/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 right-[-10%] w-[600px] h-[600px] bg-[var(--gold)]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <main className="relative z-10 pt-36 pb-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Immersive Store Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 px-4">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[var(--gold)]" />
                <span className="text-[10px] tracking-ultra text-[var(--gold)] uppercase font-bold text-shadow-gold">{t("nav.store")}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-5xl md:text-7xl text-white mb-6 leading-tight"
              >
                {t("store.title")}
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[var(--text-muted)] text-base md:text-lg font-outfit">
                {t("store.subtitle")}
              </motion.p>
            </div>

            {/* Glowing Search Box */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative w-full md:w-[350px]">
              <div className="absolute inset-0 bg-[var(--gold)]/10 blur-xl rounded-full" />
              <div className="relative glass-panel rounded-full overflow-hidden flex items-center px-5 py-2 hover:border-[var(--gold)]/50 transition-colors">
                <Search size={18} className="text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder={t("store.search")}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none py-3 px-4 text-sm text-white font-outfit outline-none placeholder:text-white/30"
                />
              </div>
            </motion.div>
          </div>

          {/* Glass Category Pills */}
          <div className="flex flex-wrap gap-3 mb-12 px-4">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="px-6 py-3 tracking-widest"
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="px-4">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-40 flex flex-col items-center justify-center glass-panel rounded-3xl"
                >
                  <Search size={40} className="text-[var(--text-muted)] mb-6 opacity-30" />
                  <p className="font-playfair text-3xl text-white/50">{t("store.noProducts")}</p>
                  <p className="font-outfit text-white/30 mt-2 text-sm">{dir === 'rtl' ? "جرب استخدام كلمات بحث مختلفة" : "Essayez différents termes de recherche"}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
