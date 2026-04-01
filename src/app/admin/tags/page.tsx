"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { createClient } from "@/utils/supabase/client";
import { Tag, Plus, Trash2 } from "lucide-react";

export default function AdminTagsClient() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState("");

  const fetchTags = async () => {
    setLoading(true);
    const supabase = createClient();
    // Unique tags from products
    const { data } = await supabase.from("products").select("tags");
    
    if (data) {
      const allTags = new Set<string>();
      data.forEach(p => {
        if (p.tags && Array.isArray(p.tags)) {
          p.tags.forEach(t => allTags.add(t));
        }
      });
      setTags(Array.from(allTags));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar role="admin" />
      <main className="flex-1 lg:mr-60 p-6 md:p-12 pt-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-playfair text-4xl text-white mb-2">إدارة العلامات (Tags)</h1>
            <p className="text-white/30 text-[11px] uppercase tracking-widest text-right">العلامات المستخدمة في المنتجات وعرض الصفحة الرئيسية</p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-8">
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              يتم إنشاء العلامات تلقائياً عند إضافتها لأي منتج في قسم <strong>إدارة المنتجات</strong>. أي علامة تُضاف لمنتج (مثل: <span className="text-[#D4AF37]">"وصل حديثاً"</span> أو <span className="text-[#D4AF37]">"الأكثر مبيعاً"</span>) ستظهر هنا وتُعرض في الصفحة الرئيسية ديناميكياً.
            </p>

            <div className="flex flex-wrap gap-3">
              {loading ? (
                <span className="text-white/30 text-sm">جاري جلب العلامات...</span>
              ) : tags.length === 0 ? (
                <span className="text-white/30 text-sm">لا توجد أي علامات مستخدمة حالياً في المنتجات.</span>
              ) : (
                tags.map(tag => (
                  <div key={tag} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-sm">
                    <Tag size={14} className="text-[#D4AF37]" />
                    <span className="text-sm font-bold text-white tracking-wide">{tag}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
