"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, dir } = useLanguage();

  const links = {
    shop: [
      { ar: "جميع العطور", fr: "Tous les Parfums", href: "/store" },
      { ar: "شـرقي", fr: "Oriental", href: "/store?category=oriental" },
      { ar: "زهـري", fr: "Floral", href: "/store?category=floral" },
      { ar: "خـشبي", fr: "Boisé", href: "/store?category=woody" },
    ],
    company: [
      { ar: "من نحن", fr: "À Propos", href: "/about" },
      { ar: "تواصل معنا", fr: "Contact", href: "/contact" },
      { ar: "سياسة الخصوصية", fr: "Confidentialité", href: "/privacy" },
    ]
  };

  return (
    <footer dir={dir} className="relative bg-[#0a0a0a] pt-24 pb-12 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gold)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Identity */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-playfair text-white tracking-widest uppercase italic">
                Yanba<span className="text-[var(--gold)]">✦</span>
              </h2>
            </Link>
            <p className="text-white/40 text-xs md:text-sm leading-loose max-w-xs font-outfit">
              {language === 'ar' 
                ? 'فخامة العطر الجزائري بلمسة عصرية. نحن نصنع ذكريات تدوم في كل رشة.' 
                : 'L’excellence de la parfumerie algérienne avec une touche de modernité. Nous créons des souvenirs durables.'}
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/40 hover:text-[var(--gold)] hover:border-[var(--gold)]/30 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--gold)]">
              {language === 'ar' ? 'المتجر' : 'BOUTIQUE'}
            </h4>
            <ul className="space-y-4">
              {links.shop.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm font-outfit">
                    {language === 'ar' ? link.ar : link.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--gold)]">
              {language === 'ar' ? 'المنصة' : 'PLATEFORME'}
            </h4>
            <ul className="space-y-4">
              {links.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm font-outfit">
                    {language === 'ar' ? link.ar : link.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--gold)]">
              {language === 'ar' ? 'تواصل معنا' : 'CONTACT'}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-white/40">
                <MapPin size={16} className="text-[var(--gold)]/60" />
                <span className="text-sm font-outfit">{language === 'ar' ? 'الجزائر العاصمة' : 'Alger, Algérie'}</span>
              </li>
              <li className="flex items-center gap-4 text-white/40">
                <Phone size={16} className="text-[var(--gold)]/60" />
                <span className="text-sm font-outfit" dir="ltr">+213 550 00 00 00</span>
              </li>
              <li className="flex items-center gap-4 text-white/40">
                <Mail size={16} className="text-[var(--gold)]/60" />
                <span className="text-sm font-outfit">contact@yanbaa-parfum.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
            © {new Date().getFullYear()} YANBA PERFUMES. CRAFTED BY EXCELLENCE.
          </p>
          <div className="flex gap-8">
            {['Terms', 'Cookie Policy'].map((text, i) => (
              <a key={i} href="#" className="text-[9px] font-black uppercase tracking-widest text-white/10 hover:text-white/40 transition-colors">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
