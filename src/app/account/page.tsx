"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  MapPin, 
  CreditCard, 
  Clock, 
  ArrowRight,
  Star,
  ShoppingBag,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const RECENT_ORDERS = [
  { id: "YP-2026-8812", date: "Oct 12, 2026", total: "1,450.00", status: "In Transit" },
  { id: "YP-2026-7754", date: "Sep 28, 2026", total: "3,200.00", status: "Delivered" },
];

export default function ClientDashboard() {
  const { t, language, dir } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-8 h-[1px] bg-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase font-black italic">
              {language === 'ar' ? 'أهلاً بك مرة أخرى' : 'WELCOME BACK'}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Dashboard <span className="text-gold-gradient non-italic font-bold">Overview✦</span>
          </h1>
        </div>
        
        <Link 
          href="/store" 
          className="h-14 px-8 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest"
        >
          <ShoppingBag size={18} />
          {t("nav.store")}
        </Link>
      </div>

      {/* Quick Stats */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={item} className="glass-card p-8 group hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gold-gradient/10 flex items-center justify-center text-[var(--gold)]">
              <Package size={24} />
            </div>
            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest italic group-hover:text-[var(--gold)]/20 transition-colors">Active</span>
          </div>
          <h3 className="text-white/40 text-[10px] uppercase tracking-ultra mb-1 font-black">{t("dash.pending")}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-playfair text-white font-bold">02</p>
            <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Shipments</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-8 group hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Star size={24} />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Zap size={10} className="text-emerald-400" />
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest italic">Stable</span>
            </div>
          </div>
          <h3 className="text-white/40 text-[10px] uppercase tracking-ultra mb-1 font-black">Loyalty Tier</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-playfair text-gold-gradient font-bold">Silver</p>
            <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Active Status</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-8 group hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)]">
              <CreditCard size={24} />
            </div>
          </div>
          <h3 className="text-white/40 text-[10px] uppercase tracking-ultra mb-1 font-black">Outstanding Balance</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-playfair text-white font-bold">0.00</p>
            <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{t("store.currency")}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Orders Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8 space-y-8"
      >
        <div className="flex justify-between items-center border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-gold-gradient rounded-full" />
            <div>
              <h2 className="font-playfair text-2xl text-white italic">{t("dash.orders")}</h2>
              <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">Recent Acquisitions</p>
            </div>
          </div>
          <Link href="/account/orders" className="text-[10px] text-[var(--gold)] font-black uppercase tracking-widest hover:translate-x-2 transition-transform flex items-center gap-2">
            Show History
            <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="space-y-4">
          {RECENT_ORDERS.map((order, idx) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (idx * 0.1) }}
              className="flex flex-col md:flex-row justify-between items-center glass-panel p-6 border-white/5 hover:border-[var(--gold)]/20 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-[var(--gold)] transition-colors">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Order <span className="text-[var(--gold)] italic">#{order.id.split('-').pop()}</span></h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{order.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Yanba Logistics</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-12 mt-6 md:mt-0">
                <div className="text-right">
                  <span className="block text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Total Valuation</span>
                  <span className="font-playfair text-lg text-white font-bold">{order.total} <span className="text-[10px] text-[var(--gold)]">{t("store.currency")}</span></span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                      order.status === 'Delivered' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-[var(--gold)]/10 border-[var(--gold)]/20 text-[var(--gold)]'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-[var(--gold)] group-hover:text-black transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
