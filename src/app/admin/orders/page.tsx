"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Search, Filter, Truck, Calendar, User, ShoppingBag, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Order = {
  id: string;
  created_at: string;
  total_amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  store_name: string;
  phone: string;
  wilaya: string;
  commune: string;
  delivery_fee: number;
  profiles?: { full_name: string };
};

export default function AdminOrdersPage() {
  const { t, language, dir } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchOrders = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false });
    if (data) setOrders(data as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (!error) {
       setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as any } : o));
    }
  };

  const filtered = orders.filter(o => {
    const matchesSearch = 
      o.id.toLowerCase().includes(search.toLowerCase()) || 
      o.store_name?.toLowerCase().includes(search.toLowerCase()) || 
      o.phone?.includes(search);
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              {t("admin.orders.title")}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Manage <span className="text-gold-gradient non-italic font-bold">Orders✦</span>
          </h1>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute top-1/2 -translate-y-1/2 left-4 text-white/20 group-focus-within:text-[var(--gold)] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={language === 'ar' ? "البحث..." : "Search orders..."} 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-white/5 py-4 pl-12 pr-6 rounded-2xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none glass-panel" 
            />
          </div>
          <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all glass-panel">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-3 custom-scrollbar no-scrollbar" dir={dir}>
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all whitespace-nowrap border ${
              statusFilter === status 
                ? "bg-gold-gradient text-black border-transparent shadow-lg shadow-[var(--gold)]/20" 
                : "bg-white/5 border-white/5 text-white/40 hover:border-white/10"
            }`}
          >
            {status === 'all' ? (language === 'ar' ? 'الكل' : 'ALL') : t(`status.${status}`)}
          </button>
        ))}
      </div>

      {/* Orders Table Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-white/5 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-start" dir={dir}>
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                <th className="px-8 py-6 text-start">{t("common.ref")}</th>
                <th className="px-8 py-6 text-start">{t("dash.clients")}</th>
                <th className="px-8 py-6 text-start">{t("checkout.wilaya")}</th>
                <th className="px-8 py-6 text-start">{t("common.status")}</th>
                <th className="px-8 py-6 text-end">{t("common.total")}</th>
                <th className="px-8 py-6 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] uppercase tracking-ultra text-white/20 font-black">{t("common.loading")}</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <ShoppingBag size={48} />
                      <span className="text-[10px] uppercase tracking-ultra font-black">{language === 'ar' ? 'لا توجد طلبات' : 'NO ORDERS FOUND'}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-black text-white font-outfit uppercase">#{order.id.slice(0, 8)}</span>
                        <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest">
                          <Calendar size={12} />
                          {new Date(order.created_at).toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'en-GB')}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[var(--gold)] glass-panel">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white font-outfit truncate max-w-[150px]">{order.store_name || order.profiles?.full_name || "—"}</p>
                          <p className="text-[10px] text-white/30 tracking-wider">{order.phone || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-2">
                        <Truck size={14} className="text-white/20" />
                        <span className="text-[11px] font-bold text-white/60 tracking-wider uppercase">{order.wilaya}</span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="relative inline-block w-40">
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`w-full bg-transparent border-none text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl cursor-pointer outline-none appearance-none text-center transition-all ${
                            order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                            order.status === 'processing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            order.status === 'shipped' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                            order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                            <option key={s} value={s} className="bg-black text-white">{t(`status.${s}`)}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-8 py-8 text-end">
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-lg font-playfair text-white">
                          {order.total_amount.toLocaleString("fr-DZ")} <span className="text-[10px] uppercase text-white/20">{t("store.currency")}</span>
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-[#D4AF37]/60">COD Payment</span>
                      </div>
                    </td>
                    <td className="px-8 py-8 text-center">
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-[var(--gold)] hover:bg-white/10 transition-all glass-panel">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
