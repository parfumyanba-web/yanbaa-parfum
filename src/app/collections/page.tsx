"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const COLLECTIONS = [
  { id: "oud", nameAr: "مجموعة العود", nameFr: "Collection Oud", descAr: "أجود أنواع العود الطبيعي", descFr: "Les meilleurs ouds naturels", count: 8 },
  { id: "floral", nameAr: "مجموعة الأزهار", nameFr: "Collection Florale", descAr: "زهور فاتنة من كل الأصقاع", descFr: "Fleurs envoûtantes du monde entier", count: 12 },
  { id: "woody", nameAr: "مجموعة الخشبية", nameFr: "Collection Boisée", descAr: "عطور فاخرة بنفحات خشبية", descFr: "Parfums luxueux aux notes boisées", count: 6 },
  { id: "fresh", nameAr: "مجموعة المنعشة", nameFr: "Collection Fraîche", descAr: "نسيم منعش في كل وقت", descFr: "Un souffle frais à tout moment", count: 5 },
];

export default function CollectionsPage() {
  const { t, dir, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div dir={dir} className="min-h-screen bg-[var(--deep-bg)]">
      <div className="pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-5xl md:text-6xl text-white mb-3"
            >
              {t("collections.title")}
            </motion.h1>
            <div className="h-px w-16 bg-[#D4AF37]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLECTIONS.map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/store?category=${col.id}`}
                  className="group block border border-white/8 hover:border-[#D4AF37]/30 transition-all duration-500"
                  style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(212,175,55,0.02) 100%)" }}
                >
                  {/* Visual */}
                  <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[#1a1510] to-[#0a0a0a] relative overflow-hidden">
                    <Layers size={40} className="text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06), transparent)" }} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                      {isAr ? col.nameAr : col.nameFr}
                    </h3>
                    <p className="text-white/30 text-sm leading-relaxed">{isAr ? col.descAr : col.descFr}</p>
                    <p className="text-[#D4AF37]/60 text-[10px] uppercase tracking-widest mt-4">{col.count} {t("dash.products")}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
