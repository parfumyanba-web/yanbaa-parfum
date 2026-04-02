"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const CATEGORIES = [
  { id: "oriental", ar: "عطور شرقية", fr: "Parfums Orientaux", icon: "🕌" },
  { id: "floral", ar: "روائح زهرية", fr: "Notes Florales", icon: "🌸" },
  { id: "woody", ar: "نكهات خشبية", fr: "Accords Boisés", icon: "🌲" },
  { id: "musk", ar: "عالم المسك", fr: "Univers du Musc", icon: "✨" },
];

export function CategorySection() {
  const { language, dir } = useLanguage();

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0a0a0a]" dir={dir}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[1px] bg-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase font-black">
              {language === 'ar' ? 'اكتشف مجموعاتنا' : 'DÉCOUVREZ NOS COLLECTIONS'}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl text-white italic"
          >
            {language === 'ar' ? 'فن تركيب العطور' : "L'Art de la Parfumerie"}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.id} href={`/store?category=${cat.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-64 glass-card flex flex-col items-center justify-center p-8 overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                
                <span className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
                <h3 className="font-playfair text-2xl text-white mb-2 group-hover:text-[var(--gold)] transition-colors">
                  {language === 'ar' ? cat.ar : cat.fr}
                </h3>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold opacity-0 group-hover:opacity-100 transition-all">
                  {language === 'ar' ? 'تسوق الآن' : 'SHOP NOW'}
                </span>

                {/* Border Animation */}
                <div className="absolute inset-0 border border-white/5 rounded-[24px] group-hover:border-[var(--gold)]/30 transition-colors" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
