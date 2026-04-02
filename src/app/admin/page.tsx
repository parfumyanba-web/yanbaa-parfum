"use client";

import React from "react";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowUpRight, 
  Clock 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { StatsCard } from "@/components/admin/StatsCard";
import { motion } from "framer-motion";

const RECENT_ORDERS = [
  { id: "ORD-9283", client: "Ahmed Benali", status: "pending", total: 45000, date: "2024-03-20" },
  { id: "ORD-9284", client: "Sarl Parfum D'Or", status: "processing", total: 125000, date: "2024-03-19" },
  { id: "ORD-9285", client: "Yasmine Boutique", status: "shipped", total: 12500, date: "2024-03-19" },
  { id: "ORD-9286", client: "Kamel Cosmetics", status: "delivered", total: 89000, date: "2024-03-18" },
];

export default function AdminOverviewPage() {
  const { language, t, dir } = useLanguage();

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="w-10 h-[1px] bg-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase font-black">
              {language === 'ar' ? 'نظرة عامة' : 'ADMIN OVERVIEW'}
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-playfair text-white italic"
          >
            {t("dash.welcome")}, <span className="text-gold-gradient non-italic font-bold">Admin✦</span>
          </motion.h1>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 py-2 px-4 glass-card border-white/5 rounded-2xl"
        >
          <Clock size={16} className="text-[var(--gold)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
            {new Date().toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-DZ', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label={t("dash.revenue")} 
          value="1,450,000 د.ج" 
          icon={DollarSign} 
          trend={{ value: "12%+", isUp: true }}
          delay={0.1}
        />
        <StatsCard 
          label={t("dash.pending")} 
          value="12" 
          icon={ShoppingBag} 
          trend={{ value: "4", isUp: false }}
          delay={0.2}
        />
        <StatsCard 
          label={t("dash.partners")} 
          value="84" 
          icon={Users} 
          trend={{ value: "3", isUp: true }}
          delay={0.3}
        />
        <StatsCard 
          label={t("dash.products")} 
          value="48" 
          icon={Package} 
          delay={0.4}
        />
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-card border-white/5 overflow-hidden flex flex-col h-full"
        >
          <div className="p-8 pb-4 flex items-center justify-between">
            <h3 className="text-xl font-playfair text-white italic">{t("dash.orders")}</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-[var(--gold)] hover:underline">
              {t("common.viewAll")}
            </button>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-start" dir={dir}>
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                  <th className="px-8 py-6 text-start">{t("common.ref")}</th>
                  <th className="px-8 py-6 text-start">{t("dash.clients")}</th>
                  <th className="px-8 py-6 text-start">{t("common.status")}</th>
                  <th className="px-8 py-6 text-end">{t("common.total")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 text-sm font-black text-white/60 font-outfit">{order.id}</td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-white font-outfit truncate max-w-[150px]">{order.client}</p>
                      <p className="text-[10px] text-white/30 truncate">{order.date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        order.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                        order.status === 'shipped' ? 'bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20' :
                        'bg-green-500/10 text-green-500 border border-green-500/20'
                      }`}>
                        {t(`status.${order.status}`)}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-end">
                      <p className="text-sm font-bold text-white font-outfit">
                        {order.total.toLocaleString("fr-DZ")} <span className="text-[10px] text-white/20">{t("store.currency")}</span>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions / Activity (Right) */}
        <div className="space-y-8 h-full">
          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-8 border-white/5 space-y-6"
          >
            <h3 className="text-xl font-playfair text-white italic">{language === 'ar' ? 'إجراءات سريعة' : 'Actions Rapides'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--gold)]/30 transition-all gap-2 group">
                <Package size={20} className="text-[var(--gold)] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{language === 'ar' ? 'منتج جديد' : 'NP. PRODUIT'}</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--gold)]/30 transition-all gap-2 group">
                <Users size={20} className="text-[var(--gold)] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{language === 'ar' ? 'عميل جديد' : 'NP. CLIENT'}</span>
              </button>
            </div>
          </motion.div>

          {/* Performance Summary (Bilingual) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-8 border-white/5 flex-grow"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-playfair text-white italic">{language === 'ar' ? 'الأداء العام' : 'Performance'}</h3>
              <ArrowUpRight size={18} className="text-[var(--gold)]" />
            </div>
            
            <div className="space-y-8">
              {[
                { label: language === 'ar' ? 'عطور شرقية' : 'Oriental', val: 78, color: 'var(--gold)' },
                { label: language === 'ar' ? 'مسك وأزهار' : 'Floral', val: 56, color: '#white' },
                { label: language === 'ar' ? 'خلاصة الخشب' : 'Woody', val: 34, color: '#333' },
              ].map((cat, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                    <span className="text-white/40">{cat.label}</span>
                    <span className="text-white">{cat.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.val}%` }}
                      transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                      className="h-full bg-gold-gradient rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
