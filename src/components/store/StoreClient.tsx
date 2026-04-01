"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Eye, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const UNITS = ["100g", "500g", "1kg", "10kg"] as const;
type Unit = typeof UNITS[number];

const UNIT_MULTIPLIERS: Record<Unit, number> = {
  "100g": 1,
  "500g": 5,
  "1kg": 10,
  "10kg": 100,
};

const PRODUCTS = [
  { id: "1", name: "عود ملكي / Oud Royal", category: "شرقي", brand: "ينبع", group: "عود", basePrice: 12500, description: "مزيج فاخر من عود كمبوديا مع وردة الطائف.", image: null, tags: ["جديد"] },
  { id: "2", name: "ياسمين منتصف الليل / Jasmin de Minuit", category: "زهري", brand: "ينبع", group: "زهري", basePrice: 8500, description: "ياسمين الليل مع نفحات المسك الأبيض.", image: null, tags: ["الأكثر مبيعاً"] },
  { id: "3", name: "صندل ذهبي / Santal Doré", category: "خشبي", brand: "ينبع", group: "خشبي", basePrice: 9800, description: "خشب الصندل الهندي مع لمسات العنبر.", image: null, tags: [] },
  { id: "4", name: "وردة الصحراء / Rose du Désert", category: "زهري", brand: "ينبع", group: "زهري", basePrice: 7500, description: "جمال الصحراء في كل نقطة.", image: null, tags: ["جديد"] },
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const { t, dir } = useLanguage();
  const { addItem } = useCartStore();
  const [selectedUnit, setSelectedUnit] = useState<Unit>("100g");

  const finalPrice = product.basePrice * UNIT_MULTIPLIERS[selectedUnit];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group glass-panel rounded-2xl overflow-hidden flex flex-col relative"
    >
      {/* Visual Area */}
      <div className="aspect-[3/4] relative bg-gradient-to-br from-[var(--surface-1)] to-[var(--color-bg-primary)] flex items-center justify-center overflow-hidden">
        {/* Glow behind the icon */}
        <div className="absolute inset-0 bg-[var(--color-gold)]/5 group-hover:bg-[var(--color-gold)]/10 transition-colors duration-700 blur-2xl" />
        
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          />
        ) : (
          <span className="font-playfair text-6xl text-[var(--color-gold)]/20 levitate select-none relative z-10">✦</span>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-4 inset-x-4 flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-full text-white border border-[rgba(255,255,255,0.1)]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <Link href={`/store/${product.id}`}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold-gradient hover:text-black hover:border-transparent transition-all hover:scale-110 shadow-lg">
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-6 relative z-10 flex flex-col flex-grow bg-gradient-to-t from-[var(--deep-bg)] to-transparent border-t border-[var(--border-subtle)]">
        <p className="text-[9px] uppercase tracking-ultra text-[var(--gold)]/80 mb-2">{product.brand} · {product.group}</p>
        
        <Link href={`/store/${product.id}`} className="mb-2 inline-block">
          <h3 className="font-playfair text-xl text-white group-hover:text-gold-gradient transition-all line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="font-outfit text-sm text-[var(--text-muted)] line-clamp-2 mb-6 flex-grow leading-relaxed">
          {product.description}
        </p>

        {/* Selection & Add to Cart Container */}
        <div className="flex flex-col gap-3 mt-auto">
          {/* Custom Select Box */}
          <div className="relative">
            <select
              value={selectedUnit}
              onChange={e => setSelectedUnit(e.target.value as Unit)}
              className="w-full appearance-none input-glass py-2.5 px-4 text-xs font-outfit rounded-xl cursor-pointer"
            >
              {UNITS.map(u => (
                <option key={u} value={u} className="bg-[#111] text-white py-2">{t(`store.unit.${u}`)}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" style={{ [dir === 'rtl' ? 'left' : 'right']: '16px' }} />
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-outfit text-xl font-light text-white">
              {finalPrice.toLocaleString("fr-DZ")} <span className="text-[10px] text-[var(--text-muted)]">{t("store.currency")}</span>
            </p>
            <Button
              variant="icon"
              className="w-10 h-10 shadow-lg"
              onClick={() => addItem({ id: product.id, name: product.name, price: finalPrice, image: "", category: product.category, unit: selectedUnit })}
            >
              <ShoppingBag size={14} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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

  const filtered = useMemo(() => PRODUCTS.filter(p => {
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
