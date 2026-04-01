"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import DashboardSidebar from "@/components/dashboard/Sidebar";

// Favorites page — currently empty (products added to favorites will appear here)
export default function FavoritesPage() {
  const { t, dir } = useLanguage();

  return (
    <div dir={dir} className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar role="client" />
      <main className="flex-1 lg:ml-64 px-6 md:px-12 py-12 pt-20">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-4xl text-white mb-2">{t("account.favorites.title")}</h1>
              <p className="text-white/30 text-[11px] uppercase tracking-widest">{t("dash.favorites")}</p>
            </div>
            <Link href="/store"
              className="flex items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-widest font-bold transition-all"
              style={{ background: "linear-gradient(135deg, #D4AF37, #A88820)", color: "#0a0a0a" }}>
              <ShoppingBag size={14} />
              {t("nav.store")}
            </Link>
          </div>

          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-sm"
          >
            <Heart size={48} className="text-white/10 mb-6" />
            <p className="font-playfair text-2xl text-white/30 mb-2 italic">{t("account.favorites.empty")}</p>
            <Link href="/store" className="mt-6 text-[#D4AF37] text-sm hover:text-white transition-colors underline underline-offset-4">
              {t("store.title")}
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
