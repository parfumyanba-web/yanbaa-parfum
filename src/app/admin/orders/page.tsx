"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { createClient } from "@/utils/supabase/client";
import { Search, ChevronDown, CheckCircle, Clock, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const STATUS_MAP = {
  pending: { label: "قيد الانتظار", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  processing: { label: "قيد التجهيز", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  shipped: { label: "في الطريق", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
  delivered: { label: "تم التوصيل", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  cancelled: { label: "ملغي", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
};

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("orders").select("*, profiles(full_name)").order("created_at", { ascending: false });
    if (data) setOrders(data as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient();
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  const filtered = orders.filter(o => 
    o.id.includes(search) || 
    o.store_name?.includes(search) || 
    o.phone?.includes(search)
  );

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar role="admin" />
      <main className="flex-1 lg:mr-60 p-6 md:p-12 pt-20">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <h1 className="font-playfair text-4xl text-white mb-2">الطلبيات</h1>
              <p className="text-white/30 text-[11px] uppercase tracking-widest text-right">متابعة وتحديث حالات الطلب</p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute top-1/2 -translate-y-1/2 text-white/20 right-4" size={17} />
              <input type="text" placeholder="البحث برقم الطلب، المحل، أو الهاتف..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-3 px-4 pr-12 text-sm text-white focus:border-[#D4AF37]/50 transition-all outline-none" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/[0.02] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right whitespace-nowrap">
                <thead className="bg-white/5 border-b border-white/10 text-white/40 text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 font-normal">رقم الطلب والتاريخ</th>
                    <th className="px-6 py-4 font-normal">العميل والمحل</th>
                    <th className="px-6 py-4 font-normal">عنوان التوصيل (الدفع عند الاستلام)</th>
                    <th className="px-6 py-4 font-normal">المبلغ الإجمالي</th>
                    <th className="px-6 py-4 font-normal">الحالة والإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-white/20">جاري التحميل...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-white/20">لا توجد طلبيات</td></tr>
                  ) : (
                    filtered.map(order => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-white/80 font-mono text-xs">{order.id.split("-")[0]}</p>
                          <p className="text-white/40 text-xs mt-1" dir="ltr">{new Date(order.created_at).toLocaleString("fr-FR")}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-white font-bold">{order.store_name || order.profiles?.full_name || "—"}</p>
                          <p className="text-white/40 text-xs mt-1">{order.phone || "—"}</p>
                        </td>
                        <td className="px-6 py-4 flex items-start gap-2">
                          <Truck size={14} className="text-[#D4AF37]/50 mt-0.5" />
                          <div>
                            <p className="text-white/80">{order.wilaya} — {order.commune}</p>
                            <p className="text-white/40 text-xs mt-1">توصيل: {order.delivery_fee} دج</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-playfair text-lg" style={{ color: "#D4AF37" }}>
                          {order.total_amount.toLocaleString("fr-DZ")} <span className="text-xs font-inter text-white/40">دج</span>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-sm border outline-none cursor-pointer appearance-none text-center ${STATUS_MAP[order.status].bg} ${STATUS_MAP[order.status].color} ${STATUS_MAP[order.status].border}`}
                          >
                            {Object.entries(STATUS_MAP).map(([val, conf]) => (
                              <option key={val} value={val} className="bg-[#111] text-white py-2">{conf.label}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
