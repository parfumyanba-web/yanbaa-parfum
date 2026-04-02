"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingCart, Package, Users, Settings,
  LogOut, ShoppingBag, Heart, User, Tag, Globe, ChevronRight
} from "lucide-react";
import { signOut } from "@/actions/auth";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

interface SidebarProps {
  role?: "admin" | "client";
  onClose?: () => void;
}

export default function DashboardSidebar({ role = "admin", onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t, dir, language } = useLanguage();

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
      className="fixed top-0 bottom-0 w-[280px] bg-[#0d0d0d] flex flex-col z-50 overflow-hidden border-e border-white/5 shadow-2xl"
      style={{ insetInlineStart: 0 }}
    >
      {/* Absolute Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Brand & Identity */}
      <div className="px-8 pt-10 pb-12 relative z-10">
        <Link href="/" className="inline-block mb-10 group" onClick={onClose}>
          <h2 className="text-2xl font-playfair text-white tracking-widest uppercase italic group-hover:text-gold-gradient transition-all">
            Yanba<span className="text-[var(--gold)]">✦</span>
          </h2>
        </Link>

        {/* Mini Profile (Mock for now) */}
        <div className="glass-card mb-4 p-4 flex items-center gap-4 border-white/5">
          <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-black font-black text-xs uppercase">
            {role === 'admin' ? 'AD' : 'CL'}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-[11px] font-black uppercase tracking-widest truncate">
              {role === 'admin' ? 'Administrator' : 'Yanba Client'}
            </p>
            <p className="text-white/30 text-[9px] uppercase tracking-widest truncate">
              {role === 'admin' ? 'admin@yanba.com' : 'Verified Member'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto px-4 relative z-10 custom-scrollbar space-y-1">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--gold)]/40 px-4 mb-6 font-black italic">
          {role === "admin" ? (language === 'ar' ? 'الإدارة' : 'MANAGEMENT') : (language === 'ar' ? 'حسابي' : 'ACCOUNT')}
        </p>
        
        {items.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative ${
                isActive ? "text-black" : "text-white/40 hover:text-white"
              }`}
            >
              {isActive ? (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-2xl bg-gold-gradient shadow-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : (
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/5 bg-white/0 group-hover:bg-white/[0.03] transition-all" />
              )}
              
              <item.icon size={18} className={`relative z-10 transition-transform duration-500 ${!isActive && 'group-hover:scale-110 group-hover:rotate-6'}`} />
              <span className="relative z-10 text-[11px] uppercase tracking-[0.2em] font-black">
                {item.label}
              </span>
              {!isActive && (
                <ChevronRight size={14} className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout & Store Area */}
      <div className="p-6 relative z-10 space-y-4 border-t border-white/5 bg-black/20">
        <Link href="/store" className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-black text-white/30 hover:text-[var(--gold)] hover:bg-white/5 transition-all group">
          <Globe size={16} className="group-hover:rotate-90 transition-transform duration-700" />
          {t("dash.returnToStore")}
        </Link>
        
        <button
          onClick={async () => { await signOut(); }}
          className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-black bg-[#ff3b3b]/10 border border-[#ff3b3b]/20 text-[#ff3b3b] hover:bg-[#ff3b3b] hover:text-white transition-all shadow-lg"
        >
          <LogOut size={16} />
          {t("nav.logout")}
        </button>
      </div>
    </aside>
  );
}
