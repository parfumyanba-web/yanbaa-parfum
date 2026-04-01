"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  MapPin, 
  CreditCard, 
  Clock, 
  ArrowRight,
  Star
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const RECENT_ORDERS = [
  { id: "YP-2026-8812", date: "Oct 12, 2026", total: "$1,450.00", status: "In Transit" },
  { id: "YP-2026-7754", date: "Sep 28, 2026", total: "$3,200.00", status: "Delivered" },
];

export default function ClientDashboard() {
  const { t } = useLanguage();
  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="font-playfair text-4xl text-white mb-2">{t("dash.overview")}</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-inter">{t("store.subtitle")}</p>
        </div>
        <div className="flex gap-4">
          <Link href="/store" className="bg-gold-500 text-black px-8 py-3 text-[10px] uppercase tracking-widest font-bold font-inter hover:bg-white transition-colors">
            {t("nav.store")}
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-8">
          <Package className="text-gold-500 mb-6" size={20} />
          <h3 className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-inter">{t("dash.pending")}</h3>
          <p className="text-2xl font-playfair text-white">02</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8">
          <Star className="text-gold-500 mb-6" size={20} />
          <h3 className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-inter">Loyalty Tier</h3>
          <p className="text-2xl font-playfair text-white">Platinum</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8">
          <CreditCard className="text-gold-500 mb-6" size={20} />
          <h3 className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-inter">Outstanding Balance</h3>
          <p className="text-2xl font-playfair text-white">$0.00</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white/5 border border-white/10 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-playfair text-2xl text-white uppercase tracking-wider">{t("dash.orders")}</h2>
          <Link href="/account/orders" className="text-[10px] text-gold-500 uppercase tracking-widest border-b border-gold-500/20 pb-0.5">{t("dash.orders")}</Link>
        </div>
        
        <div className="space-y-4">
          {RECENT_ORDERS.map((order) => (
            <div key={order.id} className="flex flex-col md:flex-row justify-between items-center bg-black/40 border border-white/5 p-6 group hover:border-gold-500/20 transition-colors">
              <div className="flex items-center gap-6">
                <div className="p-3 bg-white/5 rounded-sm">
                  <Clock className="text-white/40" size={18} />
                </div>
                <div>
                  <h4 className="text-white/80 font-inter text-xs mb-1">Order {order.id}</h4>
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">{order.date}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-12 mt-4 md:mt-0">
                <div className="text-right">
                  <span className="block text-[10px] text-white/20 uppercase tracking-widest mb-1">Total Value</span>
                  <span className="font-playfair text-gold-500">{order.total}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 bg-white/5 text-[10px] uppercase tracking-widest border border-white/10 text-white/60`}>
                    {order.status}
                  </span>
                  <ArrowRight size={16} className="text-white/20 group-hover:text-gold-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
