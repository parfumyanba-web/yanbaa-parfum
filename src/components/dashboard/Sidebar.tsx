"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingCart, Package, Users, Settings,
  LogOut, ShoppingBag, Heart, User, Tag, Globe
} from "lucide-react";
import { signOut } from "@/actions/auth";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function DashboardSidebar({ role = "admin" }: { role?: "admin" | "client" }) {
  const pathname = usePathname();
  const { t, dir } = useLanguage();

  const ADMIN_ITEMS = [
    { label: t("dash.overview"), href: "/admin", icon: LayoutDashboard },
    { label: t("dash.orders"), href: "/admin/orders", icon: ShoppingCart },
    { label: t("dash.products"), href: "/admin/products", icon: Package },
    { label: t("dash.clients"), href: "/admin/clients", icon: Users },
    { label: t("dash.tags"), href: "/admin/tags", icon: Tag },
    { label: t("dash.settings"), href: "/admin/settings", icon: Settings },
  ];

  const CLIENT_ITEMS = [
    { label: t("dash.overview"), href: "/account", icon: LayoutDashboard },
    { label: t("dash.orders"), href: "/account/orders", icon: ShoppingBag },
    { label: t("dash.favorites"), href: "/account/favorites", icon: Heart },
    { label: t("dash.profile"), href: "/account/profile", icon: User },
  ];

  const items = role === "admin" ? ADMIN_ITEMS : CLIENT_ITEMS;

  return (
    <aside
      dir={dir}
      className="fixed top-0 bottom-0 w-[280px] bg-[var(--deep-bg)] flex flex-col z-40 overflow-hidden border-e border-[var(--border-subtle)]"
      style={{ insetInlineStart: 0 }}
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--gold)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Brand */}
      <Link href="/" className="px-8 py-8 flex items-center gap-4 group relative z-10">
        <div className="w-10 h-10 rounded-full border border-[var(--gold)]/50 flex items-center justify-center bg-[var(--deep-bg)] shadow-[0_0_20px_rgba(245,211,138,0.1)] group-hover:scale-105 transition-transform">
          <span className="text-[var(--gold)] text-lg font-bold font-outfit">Y</span>
        </div>
        <span className="font-playfair text-xl font-bold text-white group-hover:text-gold-gradient transition-all">
          YANBA
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-8 overflow-y-auto space-y-1 px-4 relative z-10 custom-scrollbar">
        <p className="text-[10px] uppercase tracking-ultra text-[var(--gold)]/60 px-4 mb-6 font-bold">
          {role === "admin" ? t("admin.title") : t("account.title")}
        </p>
        
        {items.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                isActive ? "text-black" : "text-white/40 hover:text-white"
              }`}
            >
              {isActive ? (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-2xl bg-gold-gradient shadow-[0_4px_20px_rgba(245,211,138,0.2)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : (
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[var(--gold)]/20 bg-white/0 group-hover:bg-white/[0.02] transition-colors" />
              )}
              
              <item.icon size={18} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10 text-[11px] uppercase tracking-widest font-bold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 relative z-10 space-y-3">
        <div className="h-px w-full bg-[var(--border-subtle)] mb-6" />
        
        <Link href="/store" className="flex items-center justify-center gap-3 px-4 py-4 rounded-xl text-[10px] uppercase tracking-widest font-bold border border-[var(--border-subtle)] text-white/50 hover:text-[var(--gold)] hover:border-[var(--gold)]/50 transition-all group glass-panel">
          <Globe size={16} className="group-hover:rotate-12 transition-transform" />
          {t("dash.returnToStore")}
        </Link>
        
        <button
          onClick={async () => { await signOut(); }}
          className="flex items-center justify-center gap-3 px-4 py-4 rounded-xl text-[10px] uppercase tracking-widest font-bold bg-white/[0.02] border border-[var(--border-subtle)] text-[#EF4444] hover:bg-[#EF4444] hover:text-white hover:border-[#EF4444] transition-all"
        >
          <LogOut size={16} />
          {t("nav.logout")}
        </button>
      </div>
    </aside>
  );
}
