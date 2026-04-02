"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  Package, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Receipt
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CLIENT_ORDERS = [
  { id: "YP-2026-8812", date: "Oct 12, 2026", total: "12,450.00", status: "Processing", items: "48 Fragrances", type: "Wholesale" },
  { id: "YP-2026-7754", date: "Sep 28, 2026", total: "8,200.00", status: "Delivered", items: "24 Fragrances", type: "Wholesale" },
];

export default function ClientOrders() {
  const { t, language, dir } = useLanguage();

  return (
    <div className="space-y-8 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-8 h-[1px] bg-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase font-black">
              {t("dash.orders")}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Transaction <span className="text-gold-gradient non-italic font-bold">History✦</span>
          </h1>
        </div>

        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={16} />
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-white/40">
            Secure B2B Ledger
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {CLIENT_ORDERS.map((order, idx) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card border-white/5 p-8 group hover:border-[var(--gold)]/20 transition-all"
          >
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
              {/* Order Basic Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Reference</span>
                  <span className="text-white font-bold text-sm tracking-tight">#{order.id.split('-').pop()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Date Issued</span>
                  <span className="text-white/60 text-xs font-medium">{order.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Shipment</span>
                  <div className="flex items-center gap-2">
                    <Package size={12} className="text-[var(--gold)]/40" />
                    <span className="text-white/60 text-xs font-medium">{order.items}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Status</span>
                  <div className="flex items-center gap-2">
                    {order.status === "Delivered" 
                      ? <CheckCircle size={12} className="text-emerald-400" /> 
                      : <Clock size={12} className="text-[var(--gold)]" />}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      order.status === "Delivered" ? "text-emerald-400" : "text-[var(--gold)]"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Total */}
              <div className="flex flex-wrap items-center gap-8 xl:pl-8 xl:border-l border-white/5">
                <div className="flex flex-col items-start xl:items-end min-w-[120px]">
                  <span className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Valuation</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-playfair text-2xl text-white font-bold">{order.total}</span>
                    <span className="text-[10px] text-[var(--gold)] font-black">{t("store.currency")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="w-12 h-12 glass-panel border-white/5 text-white/20 hover:text-[var(--gold)] hover:border-[var(--gold)]/30 transition-all flex items-center justify-center rounded-2xl group/btn">
                    <Receipt size={20} className="transition-transform group-hover/btn:-translate-y-0.5" />
                  </button>
                  <button className="w-12 h-12 glass-panel border-white/5 text-white/20 hover:text-[var(--gold)] hover:border-[var(--gold)]/30 transition-all flex items-center justify-center rounded-2xl group/btn">
                    <Download size={20} className="transition-transform group-hover/btn:translate-y-0.5" />
                  </button>
                  <button className="h-12 px-6 glass-panel border-white/5 text-[10px] font-black uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all rounded-2xl flex items-center gap-2">
                    Details
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {CLIENT_ORDERS.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 glass-card border-dashed border-white/5 opacity-50"
        >
          <Receipt size={40} className="text-white/10 mb-6" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">
            No transaction records found in the secure ledger.
          </p>
        </motion.div>
      )}
    </div>
  );
}
