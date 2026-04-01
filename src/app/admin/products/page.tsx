"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { createClient } from "@/utils/supabase/client";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: string;
  name: string;
  category_id: string;
  base_price: number;
  inventory_count: number;
  brand: string;
  group_name: string;
  tags: string[];
};

export default function AdminProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف المنتج "${name}" نهائياً؟`)) return;
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const filtered = products.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) || 
    p.brand?.toLowerCase().includes(search.toLowerCase()) ||
    p.group_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar role="admin" />
      <main className="flex-1 lg:mr-60 p-6 md:p-12 pt-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <h1 className="font-playfair text-4xl text-white mb-2">إدارة المنتجات</h1>
              <p className="text-white/30 text-[11px] uppercase tracking-widest text-right">إضافة، تعديل، وحذف العطور</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute top-1/2 -translate-y-1/2 text-white/20 right-4" size={17} />
                <input type="text" placeholder="البحث باسم العطر، العلامة، أو المجموعة..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 py-3 px-4 pr-12 text-sm text-white focus:border-[#D4AF37]/50 transition-all outline-none" />
              </div>
              <button className="flex items-center justify-center w-12 h-12 flex-shrink-0 transition-all hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #D4AF37, #A88820)", color: "#0a0a0a" }}>
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/[0.02] border border-white/10 overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-white/5 border-b border-white/10 text-white/40 text-[11px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-normal">العطر</th>
                  <th className="px-6 py-4 font-normal">العلامة التجارية والمجموعة</th>
                  <th className="px-6 py-4 font-normal">السعر الأساسي</th>
                  <th className="px-6 py-4 font-normal">العلامات (Tags)</th>
                  <th className="px-6 py-4 font-normal">المخزون</th>
                  <th className="px-6 py-4 font-normal">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-white/20">جاري التحميل...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-white/20">لا توجد منتجات</td></tr>
                ) : (
                  filtered.map(product => (
                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{product.name}</td>
                      <td className="px-6 py-4">
                        <p className="text-white/80">{product.brand || "—"}</p>
                        <p className="text-[#D4AF37]/60 text-xs mt-1">{product.group_name || "—"}</p>
                      </td>
                      <td className="px-6 py-4 font-playfair text-[#D4AF37] text-lg">
                        {product.base_price.toLocaleString("fr-DZ")} <span className="text-[10px] font-inter text-white/40">دج</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.tags && product.tags.length > 0 ? product.tags.map(t => (
                            <span key={t} className="px-2 py-1 text-[10px] bg-white/5 border border-white/10 rounded-sm text-white/60">
                              {t}
                            </span>
                          )) : <span className="text-white/20">—</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] rounded-sm ${product.inventory_count > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {product.inventory_count > 0 ? `${product.inventory_count} متوفر` : "نفد"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button title="تعديل المنتج" className="p-2 rounded-sm border border-white/10 text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => deleteProduct(product.id, product.name)} title="حذف المنتج" className="p-2 rounded-sm border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/50 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
