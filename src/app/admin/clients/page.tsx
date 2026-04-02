"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Search, UserX, ShieldBan, Shield, Calendar, User, Phone, MapPin, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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

export default function AdminClientsPage() {
  const { t, language, dir } = useLanguage();
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
    const { error } = await supabase.from("profiles").update({ is_frozen: !current }).eq("id", id);
    if (!error) {
       setClients(prev => prev.map(c => c.id === id ? { ...c, is_frozen: !current } : c));
    }
  };

  const deleteClient = async (id: string) => {
    const confirmMsg = language === 'ar' ? "هل أنت متأكد من حذف هذا العميل؟" : "Are you sure you want to delete this client?";
    if (!confirm(confirmMsg)) return;
    
    const supabase = createClient();
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (!error) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  };

  const filtered = clients.filter(c => 
    c.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    c.business_name?.toLowerCase().includes(search.toLowerCase()) || 
    c.phone?.includes(search)
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
              {t("admin.clients.title")}
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playfair text-white italic">
            Private <span className="text-gold-gradient non-italic font-bold">Network✦</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute top-1/2 -translate-y-1/2 left-4 text-white/20 group-focus-within:text-[var(--gold)] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={language === 'ar' ? "البحث عن عميل..." : "Search clients..."} 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-white/5 py-4 pl-12 pr-6 rounded-2xl text-sm text-white focus:border-[var(--gold)]/30 transition-all outline-none glass-panel" 
            />
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-white/5 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-start" dir={dir}>
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                <th className="px-8 py-6 text-start">{t("common.name")}</th>
                <th className="px-8 py-6 text-start">{t("common.phone")}</th>
                <th className="px-8 py-6 text-start">{t("common.status")}</th>
                <th className="px-8 py-6 text-start">{t("common.date")}</th>
                <th className="px-8 py-6 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] uppercase tracking-ultra text-white/20 font-black">{t("common.loading")}</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <User size={48} />
                      <span className="text-[10px] uppercase tracking-ultra font-black">{language === 'ar' ? 'لا يوجد عملاء' : 'NO CLIENTS FOUND'}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--gold)] glass-panel border border-white/5">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white font-outfit truncate max-w-[200px]">{client.full_name || "—"}</p>
                          <p className="text-[10px] text-[var(--gold)]/60 font-black uppercase tracking-widest">{client.business_name || "Personal Client"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Phone size={12} className="text-white/20" />
                          <span className="text-sm font-bold text-white/80">{client.phone || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-white/20" />
                          <span className="text-[10px] text-white/30 uppercase tracking-widest">{client.wilaya || "—"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                          client.role === 'admin' 
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                            : 'bg-white/5 text-white/40 border-white/5'
                        }`}>
                          {client.role === 'admin' ? (language === 'ar' ? 'مدير' : 'ADMIN') : (language === 'ar' ? 'مشتري' : 'CLIENT')}
                        </span>
                        {client.is_frozen && (
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-2">
                            <ShieldBan size={10} /> {language === 'ar' ? 'مجمد' : 'FROZEN'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-2 text-[11px] text-white/30 font-bold uppercase tracking-wider">
                        <Calendar size={14} className="opacity-50" />
                        {new Date(client.created_at).toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'en-GB')}
                      </div>
                    </td>
                    <td className="px-8 py-8 text-end">
                      <div className="flex items-center justify-center gap-2">
                        {client.role !== 'admin' && (
                          <>
                            <button 
                              onClick={() => toggleFreeze(client.id, client.is_frozen)} 
                              className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all border border-white/5 ${
                                client.is_frozen 
                                  ? "text-emerald-500 hover:bg-emerald-500/10" 
                                  : "text-amber-500 hover:bg-amber-500/10"
                              }`}
                              title={client.is_frozen ? t("admin.clients.unfreeze") : t("admin.clients.freeze")}
                            >
                              {client.is_frozen ? <Shield size={18} /> : <ShieldBan size={18} />}
                            </button>
                            <button 
                              onClick={() => deleteClient(client.id)}
                              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5"
                              title={t("admin.clients.delete")}
                            >
                              <UserX size={18} />
                            </button>
                          </>
                        )}
                        <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-[var(--gold)] hover:bg-white/10 transition-all border border-white/5">
                          <MoreHorizontal size={18} />
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
