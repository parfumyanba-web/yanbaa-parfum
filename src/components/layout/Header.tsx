"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, LayoutDashboard, Search, User, Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLanguage } from "@/context/LanguageContext";
import AnnouncementBar from "./AnnouncementBar";
import { Button } from "@/components/ui/Button";

export default function Header() {
  const { t, language, setLanguage, dir } = useLanguage();
  const { items, setIsOpen } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        className="fixed top-0 left-0 right-0 z-[300] flex flex-col w-full"
      >
        <AnnouncementBar />
        
        <div className={`w-full transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
          <nav className={`mx-auto max-w-7xl h-16 w-[95%] glass-nav rounded-full flex items-center justify-between px-6 lg:px-8 border border-white/5`}>
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-[var(--gold)]/30 flex items-center justify-center bg-black/50 overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-20 transition-opacity"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-[var(--gold)] text-lg font-bold font-outfit relative z-10">Y</span>
              </div>
              <span className="hidden md:block font-outfit text-xl font-bold tracking-[0.2em] text-white">
                YANBAA
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 mx-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-2 text-[11px] uppercase tracking-widest text-white/60 hover:text-white rounded-full transition-all hover:bg-white/5 font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              {/* Search Icon */}
              <Button variant="icon" className="text-white/70 hover:text-[var(--gold)] hidden sm:flex">
                <Search size={18} />
              </Button>

              {/* Language Switcher */}
              <div className="hidden md:flex items-center gap-1 ml-2">
                <button 
                  onClick={() => setLanguage("ar")}
                  className={`text-[9px] font-black w-7 h-7 rounded-full flex items-center justify-center transition-all ${language === 'ar' ? 'bg-[var(--gold)] text-black' : 'text-white/40 hover:text-white'}`}
                >
                  ع
                </button>
                <button 
                  onClick={() => setLanguage("fr")}
                  className={`text-[9px] font-black w-7 h-7 rounded-full flex items-center justify-center transition-all ${language === 'fr' ? 'bg-[var(--gold)] text-black' : 'text-white/40 hover:text-white'}`}
                >
                  FR
                </button>
              </div>

              <div className="w-px h-6 bg-white/10 mx-2 hidden md:block" />

              {/* Account Icon */}
              <Link href="/account" className="hidden sm:flex">
                <Button variant="icon" className="text-white/70 hover:text-[var(--gold)]">
                  <User size={18} />
                </Button>
              </Link>

              {/* Cart Icon */}
              <Button 
                variant="icon" 
                className="relative text-white/70 hover:text-[var(--gold)]"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center text-black shadow-lg bg-[var(--gold)]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button 
                variant="icon" 
                className="lg:hidden text-white/70"
                onClick={() => setMenuOpen(p => !p)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? 100 : -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[250] bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col pt-32 px-10 lg:hidden"
            dir={dir}
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-playfair font-bold text-white/90 hover:text-[var(--gold)] transition-colors inline-block"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto mb-20 space-y-8">
              <div className="flex gap-4">
                <button onClick={() => setLanguage("ar")} className={`flex-1 py-4 rounded-2xl border font-bold ${language === "ar" ? "bg-[var(--gold)] border-[var(--gold)] text-black" : "border-white/10 text-white/50"}`}>
                  العربية
                </button>
                <button onClick={() => setLanguage("fr")} className={`flex-1 py-4 rounded-2xl border font-bold ${language === "fr" ? "bg-[var(--gold)] border-[var(--gold)] text-black" : "border-white/10 text-white/50"}`}>
                  Français
                </button>
              </div>
              
              <Link href="/account" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs">
                  {t("nav.account")}
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
