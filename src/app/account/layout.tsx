"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dir, language } = useLanguage();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070707] flex text-white font-inter" dir={dir}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[60] glass-panel border-b border-white/5 px-6 h-16 flex items-center justify-between">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold-gradient" />
          <span className="font-playfair font-black text-sm tracking-widest uppercase italic">Yanba✦</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
          <Bell size={18} />
        </div>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 z-[80] transition-all duration-500 ease-premium
        ${isSidebarOpen 
          ? (dir === 'rtl' ? 'right-0' : 'left-0') 
          : (dir === 'rtl' ? '-right-full' : '-left-full lg:left-0')}
      `}>
        <DashboardSidebar role="client" />
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40"
        >
          <X size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-h-screen relative">
        {/* Desktop Top Nav */}
        <div className="hidden lg:flex fixed top-0 z-[40] glass-panel border-b border-white/5 h-20 items-center justify-end px-12 transition-all duration-300" 
             style={{ 
               left: dir === 'rtl' ? 0 : '280px', 
               right: dir === 'rtl' ? '280px' : 0 
             }}>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] italic">Silver Tier</span>
              <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">LOYALTY MEMBER</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20">
              <Bell size={18} />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="pt-24 lg:pt-32 p-6 md:p-12 lg:px-20 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
