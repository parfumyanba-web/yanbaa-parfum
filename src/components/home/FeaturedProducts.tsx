"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { ProductCard } from "../store/ProductCard";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface FeaturedProductsProps {
  tag: string;
  titleAr: string;
  titleFr: string;
}

export function FeaturedProducts({ tag, titleAr, titleFr }: FeaturedProductsProps) {
  const { language, dir } = useLanguage();
  
  const products = MOCK_PRODUCTS.filter(p => p.tags?.includes(tag)).slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0a0a0a]" dir={dir}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 px-4">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-[1px] bg-[var(--gold)]" />
              <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase font-black">
                {tag === 'جديد' ? (language === 'ar' ? 'جديدنا' : 'NOUVEAUTÉS') : (language === 'ar' ? 'الأكثر مبيعاً' : 'BEST SELLERS')}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl md:text-5xl text-white"
            >
              {language === 'ar' ? titleAr : titleFr}
            </motion.h2>
          </div>

          <Link href="/store" className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-[var(--gold)] transition-colors font-black">
            {language === 'ar' ? 'عرض الكل' : 'VOIR TOUT'}
            {dir === 'rtl' ? <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
