"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Award, Globe, MapPin, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, dir } = useLanguage();

  const values = [
    { icon: Leaf, titleAr: "جودة أصيلة", titleFr: "Qualité Authentique", descAr: "نختار أجود المواد الخام من مصادرها الأصلية.", descFr: "Nous sélectionnons les meilleures matières premières." },
    { icon: Award, titleAr: "شراكة موثوقة", titleFr: "Partenariat de Confiance", descAr: "علاقات طويلة الأمد مع عملائنا.", descFr: "Des relations durables avec nos clients." },
    { icon: Globe, titleAr: "تغطية وطنية", titleFr: "Couverture Nationale", descAr: "نصل إلى جميع ولايات الجزائر.", descFr: "Nous couvrons toutes les wilayas d'Algérie." },
  ];

  const isAr = dir === "rtl";

  return (
    <div dir={dir} className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end pb-20 pt-32 px-6 md:px-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #D4AF37 0px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #D4AF37 0px, transparent 1px, transparent 80px)" }}
        />

        <div className="relative max-w-[1400px] mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.5em] text-[#D4AF37]/60 mb-4"
          >
            {t("about.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-5xl md:text-7xl text-white mb-6 leading-tight"
          >
            {t("about.title")}
          </motion.h1>
          <div className="h-px w-24 bg-[#D4AF37] mb-6" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/40 max-w-2xl text-base leading-loose"
          >
            {t("about.storyText")}
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-playfair text-3xl text-white mb-12">{t("about.mission")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, titleAr, titleFr, descAr, descFr }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-luxury p-8 group"
              >
                <div className="w-12 h-12 border border-[#D4AF37]/20 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Icon size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-playfair text-xl text-white mb-3">
                  {isAr ? titleAr : titleFr}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {isAr ? descAr : descFr}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-playfair text-3xl text-white mb-12">{t("about.contact")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, labelAr: "الجزائر — الجزائر العاصمة", labelFr: "Algérie — Alger" },
              { icon: Phone, labelAr: "+213 555 00 00 00", labelFr: "+213 555 00 00 00", href: "tel:+213555000000" },
              { icon: MessageCircle, labelAr: "تحدث معنا على واتساب", labelFr: "Discutez sur WhatsApp", href: "https://wa.me/213555000000" },
            ].map(({ icon: Icon, labelAr, labelFr, href }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                    className="card-luxury p-6 flex items-center gap-4 group block">
                    <Icon size={20} className="text-[#D4AF37] flex-shrink-0" />
                    <span className="text-white/60 text-sm group-hover:text-white transition-colors">
                      {isAr ? labelAr : labelFr}
                    </span>
                  </a>
                ) : (
                  <div className="card-luxury p-6 flex items-center gap-4">
                    <Icon size={20} className="text-[#D4AF37] flex-shrink-0" />
                    <span className="text-white/60 text-sm">{isAr ? labelAr : labelFr}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
