"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import FragranceScroll from "@/components/home/FragranceScroll";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function HomeClient() {
  const { language, dir } = useLanguage();

  return (
    <div dir={dir} className="bg-[#0a0a0a] min-h-screen overflow-hidden">
      {/* 1. Immersive Hero (Fragrance Scroll) */}
      <FragranceScroll />

      {/* 2. Categorization Section */}
      <CategorySection />

      {/* 3. New Arrivals Section */}
      <FeaturedProducts 
        tag="جديد" 
        titleAr="أحدث الابتكارات العطرية" 
        titleFr="Nos Dernières Créations" 
      />

      {/* 4. Luxury Collections Bento (Mini) */}
      <section className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
            {/* Left Box: Heritage */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gold-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <span className="text-gold-gradient text-xs font-black uppercase tracking-[0.4em] mb-4">HERITAGE</span>
                <h3 className="font-playfair text-4xl md:text-5xl text-white mb-6">
                  {language === 'ar' ? 'أصالة الماضي، دقة الحاضر' : "L'Héritage du Futur"}
                </h3>
                <p className="text-white/40 text-[10px] md:text-sm max-w-md leading-loose">
                  {language === 'ar' 
                    ? 'نجمع بين أسرار العطور التقليدية وأحدث تقنيات الاستخلاص لنقدم لكم تجربة لا تنسى.' 
                    : 'Nous marions les secrets de la parfumerie traditionnelle aux technologies les plus modernes pour une expérience inoubliable.'}
                </p>
              </div>
            </motion.div>

            {/* Right Box: Collections */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black to-transparent">
                <span className="text-[10px] text-[var(--gold)] font-black tracking-ultra uppercase mb-4 block">COLLECTIONS EXCLUSIVES</span>
                <h3 className="font-playfair text-3xl md:text-4xl text-white mb-6">
                  {language === 'ar' ? 'اكتشف مجموعاتنا الحصرية' : 'Découvrez nos collections exclusives'}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <FeaturedProducts 
        tag="الأكثر مبيعاً" 
        titleAr="العطور الأكثر طلباً" 
        titleFr="Nos Meilleurs Succès" 
      />

      {/* 6. Newsletter / CTA (Refined) */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gold)]/5 blur-[120px] rounded-full scale-150 opacity-20" />
        <div className="max-w-4xl mx-auto glass-card p-16 text-center relative z-10">
          <h3 className="font-playfair text-4xl md:text-6xl text-white mb-8 italic">
            {language === 'ar' ? 'احصل على عروض حصرية' : 'Restez Connectés'}
          </h3>
          <p className="text-white/40 text-sm md:text-base mb-12 max-w-xl mx-auto">
            {language === 'ar' 
              ? 'اشترك في بريدنا الإلكتروني لتصلك أحدث العطور والعروض الخاصة بمنصتنا.' 
              : 'Inscrivez-vous à notre newsletter pour recevoir nos dernières créations et offres exclusives.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Votre Email'}
              className="flex-grow bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-[var(--gold)]/50 transition-colors"
            />
            <button className="bg-gold-gradient text-black font-black uppercase text-[10px] tracking-widest px-10 py-4 rounded-2xl hover:scale-105 transition-all">
              {language === 'ar' ? 'اشتراك' : "S'INSCRIRE"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
