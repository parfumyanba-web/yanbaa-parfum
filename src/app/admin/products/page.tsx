"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Search, Plus, Edit2, Trash2, Package, Tag, Layers, Database, ChevronRight, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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

export default function AdminProductsPage() {
  const { t, language, dir } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("products").select("*").order("name", { ascending: true });
    if (data) setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string, name: string) => {
    const confirmMsg = language === 'ar' 
      ? `هل أنت متأكد من حذف المنتج "${name}"؟` 
      : `Are you sure you want to delete "${name}"?`;
    if (!confirm(confirmMsg)) return;

    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filtered = products.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) || 
    p.brand?.toLowerCase().includes(search.toLowerCase()) ||
    p.group_name?.toLowerCase().includes(search.toLowerCase())
  );

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
              {t("admin.products.title")}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Catalog <span className="text-gold-gradient non-italic font-bold">Manager✦</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute top-1/2 -translate-y-1/2 left-4 text-white/20 group-focus-within:text-[var(--gold)] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={language === 'ar' ? "ابحث عن منتج..." : "Search products..."} 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-white/5 py-4 pl-12 pr-6 rounded-2xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none glass-panel" 
            />
          </div>
          <button className="h-14 w-14 rounded-2xl bg-gold-gradient flex items-center justify-center text-black shadow-lg shadow-[var(--gold)]/20 hover:scale-105 active:scale-95 transition-all">
            <Plus size={24} />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-white/5 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-start" dir={dir}>
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                <th className="px-8 py-6 text-start">{language === 'ar' ? 'المنتج' : 'PRODUCT'}</th>
                <th className="px-8 py-6 text-start">{language === 'ar' ? 'الماركة والمجموعة' : 'BRAND & GROUP'}</th>
                <th className="px-8 py-6 text-start">{language === 'ar' ? 'المخزون' : 'STOCK'}</th>
                <th className="px-8 py-6 text-start">{language === 'ar' ? 'الوسوم' : 'TAGS'}</th>
                <th className="px-8 py-6 text-end">{language === 'ar' ? 'السعر' : 'PRICE'}</th>
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
                      <Package size={48} />
                      <span className="text-[10px] uppercase tracking-ultra font-black">{language === 'ar' ? 'لا توجد منتجات' : 'NO PRODUCTS FOUND'}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--gold)] glass-panel border border-white/5">
                          <Database size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white font-outfit truncate max-w-[200px]">{product.name}</p>
                          <p className="text-[10px] text-white/30 tracking-widest uppercase">ID: {product.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Layers size={14} className="text-white/20" />
                          <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">{product.brand || "—"}</span>
                        </div>
                        <span className="text-[10px] text-[var(--gold)]/60 font-black uppercase tracking-widest">{product.group_name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border ${
                        product.inventory_count > 10 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : product.inventory_count > 0 
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {product.inventory_count > 0 ? `${product.inventory_count} ${language === 'ar' ? 'متوفر' : 'IN STOCK'}` : (language === 'ar' ? 'نفد' : 'OUT')}
                      </span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-wrap gap-2 max-w-[200px]">
                        {product.tags && product.tags.length > 0 ? product.tags.slice(0, 3).map(tag => (
                          <div key={tag} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] text-white/40 font-black uppercase">
                            <Tag size={10} />
                            {tag}
                          </div>
                        )) : <span className="text-white/10">—</span>}
                        {product.tags && product.tags.length > 3 && (
                          <span className="text-[9px] text-white/20 font-black">+{product.tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-8 text-end">
                      <div className="flex flex-col gap-1">
                        <p className="text-lg font-playfair text-white">
                          {product.base_price.toLocaleString("fr-DZ")} <span className="text-[10px] text-white/20 uppercase">{t("store.currency")}</span>
                        </p>
                        <span className="text-[9px] text-white/20 uppercase tracking-widest">Base Rate</span>
                      </div>
                    </td>
                    <td className="px-8 py-8 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-[var(--gold)] hover:bg-white/10 transition-all border border-white/5">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteProduct(product.id, product.name)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5">
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
      </motion.div>
    </div>
  );
}
