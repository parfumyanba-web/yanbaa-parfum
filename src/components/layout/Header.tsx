"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLanguage } from "@/context/LanguageContext";
import AnnouncementBar from "./AnnouncementBar";
import { Button } from "@/components/ui/Button";

export default function Header() {
  const { t, language, setLanguage, dir } = useLanguage();
  const { items, setIsOpen } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

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
        className="fixed top-0 left-0 right-0 z-[300] flex flex-col w-full"
      >
        <AnnouncementBar />
        <nav className="h-16 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[rgba(201,168,76,0.15)] flex items-center justify-between px-4 lg:px-6">
          {/* Right/Left Handed Logo (Depends on RTL flex-row) */}
          <Link href="/" className="flex-shrink-0 group flex items-center gap-2 rtl:ml-4 ltr:mr-4">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="w-8 h-8 rounded-full border border-[var(--color-gold)] flex items-center justify-center bg-[var(--color-bg-secondary)]">
              <span className="text-[var(--color-gold)] text-xs font-bold font-outfit">Y</span>
            </motion.div>
            <span className="font-outfit text-xl font-bold tracking-widest text-[#fff] group-hover:text-gold-gradient transition-all">
              YANBA
            </span>
          </Link>

          {/* Center Links - Desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-grow justify-center">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[#fff] transition-colors relative group font-medium"
              >
                {link.label}
                <span className="absolute bottom-1 inset-x-4 h-[2px] bg-[var(--color-gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
              </Link>
            ))}
          </div>

          {/* Left/Right Handed Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden lg:flex items-center bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-full p-1 relative rtl:mr-4 ltr:ml-4">
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
                className="absolute inset-y-1 w-[46px] bg-[var(--color-gold)] rounded-full z-0"
                initial={false}
                animate={{ x: language === (dir === 'rtl' ? 'ar' : 'fr') ? 2 : (dir === 'rtl' ? -42 : 46) }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Admin shortcut */}
            <Link href="/admin" className="hidden lg:block">
              <Button variant="icon" title={t("nav.admin")}>
                <LayoutDashboard size={16} />
              </Button>
            </Link>

            {/* Cart */}
            <Button variant="icon" className="relative" onClick={() => setIsOpen(true)}>
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center text-black shadow-lg bg-[var(--color-gold)]"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>

            {/* Account */}
            <Link href="/account" className="hidden lg:block">
              <Button variant="ghost">
                {t("nav.account")}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="icon" className="lg:hidden" onClick={() => setMenuOpen(p => !p)}>
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[250] bg-[var(--color-bg-primary)]/98 backdrop-blur-2xl flex flex-col pt-32 px-8 gap-6 lg:hidden"
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
                    className="text-3xl font-playfair font-bold text-white/80 hover:text-[var(--color-gold)] transition-colors inline-block"
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
                <button onClick={() => { setLanguage("ar"); setMenuOpen(false); }} className={`px-6 py-2 text-xs font-bold rounded-full ${language === "ar" ? "bg-[var(--color-gold)] text-black" : "text-white/50"}`}>
                  العربية
                </button>
                <button onClick={() => { setLanguage("fr"); setMenuOpen(false); }} className={`px-6 py-2 text-xs font-bold rounded-full ${language === "fr" ? "bg-[var(--color-gold)] text-black" : "text-white/50"}`}>
                  Français
                </button>
              </div>

              <Link href="/account" className="w-full max-w-[200px]" onClick={() => setMenuOpen(false)}>
                <Button variant="primary" className="w-full tracking-widest uppercase">
                  {t("nav.account")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
