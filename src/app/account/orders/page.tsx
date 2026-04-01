"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Package, Truck, CheckCircle, Clock } from "lucide-react";

const CLIENT_ORDERS = [
  { id: "YP-2026-8812", date: "Oct 12, 2026", total: "$12,450.00", status: "Processing", items: "48 Fragrances", type: "Wholesale" },
  { id: "YP-2026-7754", date: "Sep 28, 2026", total: "$8,200.00", status: "Delivered", items: "24 Fragrances", type: "Wholesale" },
];

export default function ClientOrders() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-playfair text-4xl text-white mb-2">Purchase History</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-inter">Manage your B2B transactions & invoices</p>
      </div>

      <div className="space-y-6">
        {CLIENT_ORDERS.map((order) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-8 group hover:border-gold-500/30 transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Order Basic Info */}
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Order Ref</span>
                  <span className="text-white font-medium text-lg">{order.id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Date Issued</span>
                  <span className="text-white/80 text-sm">{order.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Shipment</span>
                  <span className="text-white/80 text-sm font-inter">{order.items}</span>
                </div>
              </div>

              {/* Status & Total */}
              <div className="flex flex-wrap items-center gap-12">
                <div className="flex flex-col items-start lg:items-end">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Delivery Status</span>
                  <div className="flex items-center gap-2">
                    {order.status === "Delivered" ? <CheckCircle size={14} className="text-green-400" /> : <Clock size={14} className="text-gold-500" />}
                    <span className={`text-[10px] uppercase tracking-[0.2em] ${order.status === "Delivered" ? "text-green-400" : "text-gold-500"}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-start lg:items-end">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Valuation</span>
                  <span className="font-playfair text-2xl text-gold-500">{order.total}</span>
                </div>

                <div className="flex items-center gap-4">
                  <button className="p-3 bg-white/5 border border-white/10 text-white/60 hover:text-gold-500 hover:border-gold-500/30 transition-all rounded-sm group/btn">
                    <FileText size={20} className="transition-transform group-hover/btn:-translate-y-0.5" />
                  </button>
                  <button className="p-3 bg-white/5 border border-white/10 text-white/60 hover:text-gold-500 hover:border-gold-500/30 transition-all rounded-sm group/btn">
                    <Download size={20} className="transition-transform group-hover/btn:translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {CLIENT_ORDERS.length === 0 && (
        <div className="py-24 text-center border border-dashed border-white/5 bg-white/2">
          <p className="text-white/20 font-playfair text-2xl italic tracking-widest">No transaction history found.</p>
        </div>
      )}
    </div>
  );
}
