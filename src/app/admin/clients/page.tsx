"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { createClient } from "@/utils/supabase/client";
import { Search, UserX, ShieldBan, Shield, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Profile = {
  id: string;
  full_name: string;
  business_name: string;
  phone: string;
  wilaya: string;
  is_frozen: boolean;
  role: string;
  created_at: string;
};

export default function AdminClientsClient() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setClients(data as Profile[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const toggleFreeze = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase.from("profiles").update({ is_frozen: !current }).eq("id", id);
    fetchClients();
  };

  const deleteClient = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العميل نهائياً؟")) return;
    const supabase = createClient();
    // This requires a secure edge function generally to delete from auth.users, 
    // but we'll delete the profile for now which cascades or marks as deleted.
    await supabase.from("profiles").delete().eq("id", id);
    fetchClients();
  };

  const filtered = clients.filter(c => 
    c.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    c.business_name?.toLowerCase().includes(search.toLowerCase()) || 
    c.phone?.includes(search)
  );

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar role="admin" />
      <main className="flex-1 lg:mr-60 p-6 md:p-12 pt-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <h1 className="font-playfair text-4xl text-white mb-2">إدارة العملاء</h1>
              <p className="text-white/30 text-[11px] uppercase tracking-widest text-right">مراقبة وحظر وحذف الحسابات</p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute top-1/2 -translate-y-1/2 text-white/20 right-4" size={17} />
              <input type="text" placeholder="البحث بالاسم، المحل، أو الهاتف..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-3 px-4 pr-12 text-sm text-white focus:border-[#D4AF37]/50 transition-all outline-none" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/[0.02] border border-white/10 overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-white/5 border-b border-white/10 text-white/40 text-[11px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-normal">العميل والمحل</th>
                  <th className="px-6 py-4 font-normal">معلومات الاتصال</th>
                  <th className="px-6 py-4 font-normal">الحالة / الدور</th>
                  <th className="px-6 py-4 font-normal">تاريخ التسجيل</th>
                  <th className="px-6 py-4 font-normal">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-white/20">جاري التحميل...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-white/20">لا يوجد عملاء</td></tr>
                ) : (
                  filtered.map(client => (
                    <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-white font-bold">{client.full_name || "—"}</p>
                        <p className="text-white/40 text-xs mt-1">{client.business_name || "—"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white/80">{client.phone || "—"}</p>
                        <p className="text-[#D4AF37]/60 text-xs mt-1">{client.wilaya || "—"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2 items-start">
                          <span className={`px-2 py-1 text-[10px] rounded-sm ${client.role === "admin" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-white/5 text-white/40"}`}>
                            {client.role === "admin" ? "مدير" : "مشتري"}
                          </span>
                          {client.is_frozen && (
                            <span className="px-2 py-1 text-[10px] rounded-sm bg-red-500/20 text-red-400 flex items-center gap-1">
                              <ShieldBan size={10} /> مجمد
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/40 text-xs" dir="ltr">
                        {new Date(client.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {client.role !== "admin" && (
                            <>
                              <button onClick={() => toggleFreeze(client.id, client.is_frozen)} title={client.is_frozen ? "إلغاء التجميد" : "تجميد الحساب"}
                                className={`p-2 rounded-sm border transition-colors ${client.is_frozen ? "border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black" : "border-white/10 text-white/40 hover:text-red-400 hover:border-red-400"}`}>
                                {client.is_frozen ? <Shield size={16} /> : <ShieldBan size={16} />}
                              </button>
                              <button onClick={() => deleteClient(client.id)} title="حذف العميل"
                                className="p-2 rounded-sm border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400 transition-colors">
                                <UserX size={16} />
                              </button>
                            </>
                          )}
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
