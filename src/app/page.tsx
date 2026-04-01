"use client";

import React from "react";
import FragranceScroll from "@/components/home/FragranceScroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCartStore } from "@/store/useCartStore";

const MOCK_TAG_PRODUCTS = [
  { id: "1", name: "عود ملكي / Oud Royal", category: "شرقي", brand: "ينبع", basePrice: 12500, tag: "جديد / Nouveauté" },
  { id: "2", name: "ياسمين منتصف الليل", category: "زهري", brand: "ينبع", basePrice: 8500, tag: "الأكثر مبيعاً / Best-Seller" },
  { id: "4", name: "وردة الصحراء", category: "زهري", brand: "ينبع", basePrice: 7500, tag: "جديد / Nouveauté" },
  { id: "5", name: "مسك الغزال الأصلي", category: "مسك", brand: "ينبع", basePrice: 15000, tag: "حصرية / Exclusif" },
];

export default function Home() {
  const { t, dir } = useLanguage();
  const { addItem } = useCartStore();

  return (
    <div dir={dir}>
      
      {/* Epic 120-Frames Fragrance Animation */}
      <FragranceScroll />

      {/* Marquee Section */}
      <div className="py-6 border-y border-[var(--border-subtle)] bg-[var(--surface-1)] backdrop-blur-md overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: dir === 'rtl' ? [0, 1000] : [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-16 items-center px-8"
        >
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="font-playfair text-2xl md:text-4xl text-[var(--text-muted)] opacity-50 uppercase italic tracking-widest">LUXURY PERFUMES</span>
              <span className="text-[var(--gold)]">✦</span>
              <span className="font-outfit text-2xl md:text-4xl text-white opacity-50 uppercase font-light tracking-ultra">ALGERIA</span>
              <span className="text-[var(--gold)]">✦</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Modern Bento Grid Tags Section */}
      <section className="relative z-10 py-32 px-4 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="font-playfair text-4xl md:text-6xl text-white mb-4">
              {t("store.featured")}
            </h2>
            <p className="font-outfit text-[var(--text-muted)] max-w-md">{dir === 'rtl' ? "اكتشف مجموعتنا المختارة بعناية من العطور الأكثر طلباً وتميزاً." : "Découvrez notre sélection des parfums les plus demandés et exclusifs."}</p>
          </div>
          <Link href="/store" className="flex items-center gap-2 text-[var(--gold)] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group">
            {t("store.viewAll")}
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TAG_PRODUCTS.map((prod, i) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group bg-[var(--surface-1)] border border-white/5 rounded-3xl overflow-hidden flex flex-col relative ${i === 0 ? "md:col-span-2 lg:col-span-2 aspect-[2/1]" : "aspect-[4/5] min-h-[300px]"}`}
            >
              {/* Image/Visual Area */}
              <Link href={`/store/${prod.id}`} className="absolute inset-0 z-0 bg-gradient-to-b from-[#111] to-black flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-[var(--gold)]/5 group-hover:bg-[var(--gold)]/10 transition-colors duration-500" />
                <span className="font-playfair text-6xl md:text-8xl text-[var(--gold)]/20 levitate drop-shadow-2xl">✦</span>
              </Link>

              {/* Top Bar with Tags and Cart */}
              <div className="relative z-20 flex items-start justify-between p-6">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10 shadow-lg">
                  {prod.tag}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addItem({ id: prod.id, name: prod.name, price: prod.basePrice, image: "", category: prod.category, unit: "100g" });
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[var(--gold)] hover:text-black hover:scale-110 transition-all shadow-xl"
                  title="Add to cart"
                >
                  <ShoppingBag size={18} />
                </button>
              </div>

              <div className="flex-1" />

              {/* Info Area */}
              <div className="p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent relative z-20 w-full mt-auto">
                <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--gold)] mb-2 font-bold opacity-90">{prod.brand} · {prod.category}</p>
                <Link href={`/store/${prod.id}`}>
                  <h3 className="font-playfair text-2xl md:text-4xl text-white mb-2 group-hover:text-[var(--gold)] transition-colors truncate drop-shadow-md">{prod.name}</h3>
                </Link>
                <p className="text-lg md:text-xl font-outfit text-white/90 font-light">
                  {prod.basePrice.toLocaleString("fr-DZ")} <span className="text-xs md:text-sm text-[var(--text-muted)]">{t("store.currency")}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
