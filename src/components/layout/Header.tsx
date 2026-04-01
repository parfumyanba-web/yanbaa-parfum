"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLanguage } from "@/context/LanguageContext";
import { signOut } from "@/actions/auth";
import AnnouncementBar from "./AnnouncementBar";

export default function Header() {
  const { t, language, setLanguage, dir } = useLanguage();
  const { items, setIsOpen } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/store", label: t("nav.store") },
    { href: "/collections", label: t("nav.collections") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <>
      <header
        dir={dir}
        className={`fixed top-0 inset-x-0 z-50 flex flex-col items-center transition-all duration-500 w-full`}
      >
        <AnnouncementBar />
        <div 
          className={`flex items-center justify-between mx-auto transition-all duration-500 rounded-full px-4 md:px-8 py-3 w-[calc(100%-1rem)] xl:w-[1100px] mt-2 lg:mt-4 ${
            scrolled ? "glass-nav shadow-lg" : "bg-[rgba(10,10,10,0.5)] backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group flex items-center gap-2">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="w-8 h-8 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--deep-bg)]">
              <span className="text-[var(--gold)] text-xs font-bold font-outfit">Y</span>
            </motion.div>
            <span className="font-outfit text-xl font-bold tracking-widest text-[#fff] group-hover:text-gold-gradient transition-all">
              YANBA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[#fff] transition-colors relative group font-medium"
              >
                {link.label}
                <span className="absolute bottom-1 inset-x-4 h-[2px] bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden lg:flex items-center bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-full p-1 relative">
              <button
                onClick={() => setLanguage("ar")}
                className={`relative z-10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors rounded-full ${language === 'ar' ? 'text-black' : 'text-white/50 hover:text-white'}`}
              >
                AR
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`relative z-10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors rounded-full ${language === 'fr' ? 'text-black' : 'text-white/50 hover:text-white'}`}
              >
                FR
              </button>
              <motion.div 
                className="absolute inset-y-1 w-[46px] bg-[var(--gold)] rounded-full z-0"
                initial={false}
                animate={{ x: language === (dir === 'rtl' ? 'ar' : 'fr') ? 2 : (dir === 'rtl' ? -42 : 46) }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Admin shortcut */}
            <Link
              href="/admin"
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-white/50 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all mag-btn"
              title={t("nav.admin")}
            >
              <LayoutDashboard size={14} className="relative z-10" />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-white/50 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all mag-btn"
            >
              <ShoppingBag size={14} className="relative z-10" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center text-black shadow-lg"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Account */}
            <Link href="/account"
              className="hidden lg:flex items-center gap-2 px-5 py-2 text-[11px] font-bold tracking-widest uppercase bg-gold-gradient rounded-full"
            >
              {t("nav.account")}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(p => !p)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-white/50 hover:text-white transition-all mag-btn"
            >
              {menuOpen ? <X size={16} className="relative z-10" /> : <Menu size={16} className="relative z-10" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--deep-bg)]/98 backdrop-blur-2xl flex flex-col pt-32 px-8 gap-6 lg:hidden"
            dir={dir}
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-playfair font-bold text-white/80 hover:text-[var(--gold)] transition-colors inline-block"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col items-center gap-6"
            >
              <div className="flex bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-full p-1">
                <button onClick={() => { setLanguage("ar"); setMenuOpen(false); }} className={`px-6 py-2 text-xs font-bold rounded-full ${language === "ar" ? "bg-[var(--gold)] text-black" : "text-white/50"}`}>
                  العربية
                </button>
                <button onClick={() => { setLanguage("fr"); setMenuOpen(false); }} className={`px-6 py-2 text-xs font-bold rounded-full ${language === "fr" ? "bg-[var(--gold)] text-black" : "text-white/50"}`}>
                  Français
                </button>
              </div>

              <Link href="/account" className="px-8 py-3 w-full max-w-[200px] text-center text-xs font-bold tracking-widest uppercase bg-gold-gradient rounded-full" onClick={() => setMenuOpen(false)}>
                {t("nav.account")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
