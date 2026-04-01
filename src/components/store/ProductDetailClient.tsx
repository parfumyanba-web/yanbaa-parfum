"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";

const UNITS = ["100g", "500g", "1kg", "10kg"] as const;
type Unit = typeof UNITS[number];
const UNIT_MULTIPLIERS: Record<Unit, number> = { "100g": 1, "500g": 5, "1kg": 10, "10kg": 100 };

const PRODUCTS: Record<string, { name: string; category: string; brand: string; group: string; basePrice: number; description: string; tags: string[]; image?: string | null }> = {
  "1": { name: "عود ملكي / Oud Royal", category: "شرقي", brand: "ينبع", group: "عود", basePrice: 12500, description: "مزيج فاخر من عود كمبوديا مع وردة الطائف. يتميز بعمق وغنى لا مثيل له، ويبقى على البشرة لساعات طويلة — تجربة عطرية ملكية بامتياز.", tags: ["جديد"], image: null },
  "2": { name: "ياسمين منتصف الليل", category: "زهري", brand: "ينبع", group: "زهري", basePrice: 8500, description: "ياسمين الليل مع نفحات المسك الأبيض الناعم. عطر يحمل سحر الليل وهدوءه في آنٍ واحد.", tags: ["الأكثر مبيعاً"], image: null },
  "3": { name: "صندل ذهبي / Santal Doré", category: "خشبي", brand: "ينبع", group: "خشبي", basePrice: 9800, description: "خشب الصندل الهندي النادر مع لمسات العنبر والمسك الأبيض. دفء حنون يلفّ حواسك.", tags: [], image: null },
  "4": { name: "وردة الصحراء", category: "زهري", brand: "ينبع", group: "زهري", basePrice: 7500, description: "جمال الصحراء الجزائرية في كل نقطة — وردة نضرة تتحدى القيظ بأناقة.", tags: ["جديد"], image: null },
};

export default function ProductDetailClient({ id }: { id: string }) {
  const { t, dir } = useLanguage();
  const { addItem } = useCartStore();
  const [selectedUnit, setSelectedUnit] = useState<Unit>("100g");
  const [added, setAdded] = useState(false);

  const product = PRODUCTS[id];

  if (!product) {
    return (
    <div dir={dir} className="min-h-screen bg-[var(--deep-bg)] flex items-center justify-center">
        <div className="text-center glass-panel p-16 rounded-3xl">
          <p className="font-playfair text-3xl text-white/50 mb-6">المنتج غير موجود</p>
          <Link href="/store" className="text-[var(--gold)] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
            {t("product.backToStore")}
          </Link>
        </div>
      </div>
    );
  }

  const finalPrice = product.basePrice * UNIT_MULTIPLIERS[selectedUnit];

  const handleAdd = () => {
    addItem({ id, name: product.name, price: finalPrice, image: "", category: product.category, unit: selectedUnit });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div dir={dir} className="min-h-screen bg-[var(--deep-bg)] flex flex-col pt-24 lg:pt-0">
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1800px] w-full mx-auto">
        
        {/* Left: Immersive Image Pane */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full lg:w-1/2 lg:h-screen lg:sticky top-0 bg-gradient-to-br from-[#120f0d] to-[#09090b] border-r border-[var(--border-subtle)] flex items-center justify-center relative overflow-hidden min-h-[50vh]"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[var(--color-gold)]/5 blur-3xl pointer-events-none" />
          
          {product.image ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-h-[80vh] aspect-[3/4]"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 50 }}
              className="group"
            >
              <span className="font-playfair text-[150px] md:text-[200px] text-[var(--color-gold)]/10 select-none levitate drop-shadow-2xl inline-block group-hover:text-[var(--color-gold)]/20 transition-all duration-700 relative z-10">✦</span>
            </motion.div>
          )}
          
          {/* Breadcrumb Absolute */}
          <Link href="/store" className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-[var(--gold)] text-xs font-bold uppercase tracking-widest transition-colors group z-10 glass-panel px-4 py-2 rounded-full">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
            {t("product.backToStore")}
          </Link>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="absolute top-6 right-6 flex flex-wrap gap-2 z-10">
              {product.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-widest px-4 py-2 bg-[rgba(255,255,255,0.05)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] text-white rounded-full font-bold shadow-lg">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Info & Checkout Pane */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center min-h-[50vh] relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-xl mx-auto w-full relative z-10"
          >
            <p className="text-[10px] md:text-[12px] uppercase tracking-ultra text-[var(--gold)] mb-4 font-bold flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--gold)]" />
              {product.brand} · {product.group}
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl text-white leading-[1.1] mb-8">
              {product.name}
            </h1>
            
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-outfit mb-12">
              {product.description}
            </p>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <label className="text-[11px] uppercase tracking-widest text-white/50 block">{t("product.selectUnit")}</label>
                <div className="relative">
                  <select
                    value={selectedUnit}
                    onChange={e => setSelectedUnit(e.target.value as Unit)}
                    className="w-full appearance-none input-glass py-4 px-5 text-sm font-outfit rounded-xl cursor-pointer shadow-lg"
                  >
                    {UNITS.map(u => (
                      <option key={u} value={u} className="bg-[#111] text-white py-2">{t(`store.unit.${u}`)}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute top-1/2 -translate-y-1/2 text-[var(--gold)] pointer-events-none" style={{ [dir === 'rtl' ? 'left' : 'right']: '20px' }} />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] uppercase tracking-widest text-white/50 block">{t("store.price")}</label>
                <div className="glass-panel py-3 px-5 rounded-xl border-[var(--gold)]/30 bg-[var(--gold)]/5 flex items-center flex-1 h-[56px]">
                  <p className="font-playfair text-2xl font-bold text-[var(--gold)] w-full flex justify-between items-baseline">
                    {finalPrice.toLocaleString("fr-DZ")}
                    <span className="text-sm text-white/40 font-outfit font-light">{t("store.currency")}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-8 border-t border-[var(--border-subtle)]">
              <Button
                variant="primary"
                onClick={handleAdd}
                className={`w-full py-5 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_8px_30px_rgba(245,211,138,0.2)] ${
                  added ? "bg-[#10B981] hover:bg-[#059669] text-white" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} />
                  {added ? t("common.confirm") : t("store.addToCart")}
                </div>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
