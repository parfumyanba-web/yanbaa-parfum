"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Truck, ShoppingBag, Phone, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/useCartStore";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/utils/supabase/client";

export default function CheckoutClient() {
  const { t, dir } = useLanguage();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    store: "",
    phone: "",
    wilaya: "",
    commune: ""
  });

  const subtotal = getTotalPrice();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setFormData({
            name: profile.full_name || "",
            store: profile.business_name || "",
            phone: profile.phone || "",
            wilaya: profile.wilaya || "",
            commune: profile.commune || ""
          });
        }
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Future Supabase Connect logic here
    await new Promise(r => setTimeout(r, 1200));
    clearCart();
    setIsCompleted(true);
    setIsLoading(false);
  };

  if (isCompleted) {
    return (
      <div dir={dir} className="min-h-screen bg-[var(--deep-bg)] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/10 rounded-full blur-[150px] pointer-events-none" />
        
        <Header />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="glass-panel p-12 md:p-16 rounded-[40px] max-w-lg w-full text-center relative z-10 mx-4 shadow-[0_20px_60px_rgba(16,185,129,0.1)] border border-[#10B981]/20"
        >
          <div className="w-32 h-32 mx-auto mb-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#10B981]/20 to-transparent border border-[#10B981]/30 relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-[#10B981]/40 rounded-full" />
            <CheckCircle size={50} className="text-[#10B981]" />
          </div>
          <h1 className="font-playfair text-4xl text-white mb-6">{t("checkout.success")}</h1>
          <p className="text-white/60 font-outfit text-base mb-12 leading-loose">{t("checkout.successMsg")}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/account/orders"
              className="flex items-center justify-center py-4 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer">
              {t("checkout.viewOrders")}
            </Link>
            <Link href="/store"
              className="flex items-center justify-center py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#0a0a0a] bg-gold-gradient shadow-[0_8px_20px_var(--gold-glow)] hover:scale-[1.02] transition-all cursor-pointer">
              {t("nav.store")}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const inputClass = "w-full input-glass py-4 px-5 text-sm font-outfit transition-all placeholder:text-white/20 rounded-xl max-w-full";

  return (
    <div dir={dir} className="min-h-screen bg-[var(--deep-bg)] overflow-hidden">
      {/* Immersive bg */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--gold)]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#09090b]/80 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-10 mix-blend-overlay" />
      </div>

      <Header />
      
      <main className="relative z-10 pt-36 pb-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Back */}
          <Link href="/store" className="flex items-center gap-2 text-white/40 hover:text-[var(--gold)] text-[10px] uppercase font-bold tracking-widest mb-12 transition-colors group w-fit glass-panel px-4 py-2 rounded-full shadow-lg">
            {dir === 'rtl' ? <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />}
            {t("product.backToStore")}
          </Link>

          <h1 className="font-playfair text-5xl md:text-6xl text-white mb-16">{t("checkout.title")}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Form Area */}
            <div className="lg:col-span-7 xl:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Information Card */}
                <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)]/5 blur-3xl rounded-full" />
                  
                  <h2 className="font-playfair text-3xl text-white flex items-center gap-4 mb-8">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                      <Phone size={18} className="text-[var(--gold)]" />
                    </span>
                    {t("checkout.info")}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {[
                      { label: t("checkout.name"), name: "name", type: "text", value: formData.name },
                      { label: t("checkout.store"), name: "store", type: "text", value: formData.store },
                      { label: t("checkout.phone"), name: "phone", type: "tel", value: formData.phone },
                      { label: t("auth.wilaya"), name: "wilaya", type: "text", value: formData.wilaya },
                      { label: t("auth.commune"), name: "commune", type: "text", value: formData.commune },
                    ].map(field => (
                      <div key={field.name} className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#fff]/50 px-1">{field.label}</label>
                        <input type={field.type} name={field.name} required
                          value={field.value}
                          onChange={handleChange}
                          className={inputClass} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery/Payment Method Card */}
                <div className="glass-panel p-8 md:p-10 rounded-3xl">
                  <h2 className="font-playfair text-3xl text-white flex items-center gap-4 mb-8">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                      <Truck size={18} className="text-[var(--gold)]" />
                    </span>
                    {t("checkout.payment")}
                  </h2>
                  <div className="flex items-center gap-5 p-6 rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/5 relative overflow-hidden cursor-default">
                    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[var(--gold)]/10 to-transparent" />
                    
                    <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-[var(--gold)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white mb-1 tracking-wide">{t("checkout.cod")}</p>
                      <p className="text-[11px] font-outfit uppercase tracking-wider text-[var(--gold)]">{dir === "rtl" ? "سيتم حساب تكاليف التوصيل" : "Les frais de livraison seront calculés"}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button (Mobile Only, Desktop handles it in sticky sidebar) */}
                <div className="block lg:hidden mt-10">
                  <button type="submit" disabled={isLoading || items.length === 0}
                    className="w-full py-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-40 bg-gold-gradient text-black shadow-[0_8px_30px_rgba(245,211,138,0.2)]">
                    {isLoading ? t("common.loading") : t("checkout.submit")}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Sticky Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 glass-panel p-8 rounded-3xl z-10">
                <h3 className="font-playfair text-2xl text-white mb-6 flex items-center gap-3 border-b border-[var(--border-subtle)] pb-6">
                  <ShoppingBag size={20} className="text-[var(--gold)]" />
                  {t("cart.title")}
                </h3>
                
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-8 custom-scrollbar">
                  {items.length === 0 ? (
                    <p className="text-white/30 text-sm font-outfit italic">{t("cart.empty")}</p>
                  ) : items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm group">
                      <span className="text-white/70 font-outfit line-clamp-1 flex-1 group-hover:text-white transition-colors">{item.name} <span className="text-[10px] text-[var(--gold)] ml-2 border border-[var(--gold)]/30 rounded-full px-2 py-0.5">{item.unit} x {item.quantity}</span></span>
                      <span className="text-white font-bold ml-4 flex-shrink-0">
                        {(item.price * item.quantity).toLocaleString("fr-DZ")} <span className="text-[10px] text-white/40">{t("store.currency")}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-6 space-y-4">
                  <div className="flex justify-between text-sm font-outfit">
                    <span className="text-white/50">{t("checkout.delivery")}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)] py-1 px-3 bg-[var(--gold)]/10 rounded-full">{dir === "rtl" ? "يُحسب لاحقاً" : "À calculer"}</span>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <span className="text-white/80 text-lg">{t("cart.subtotal")}</span>
                    <span className="font-playfair text-4xl text-[var(--gold)] font-bold">
                      {subtotal.toLocaleString("fr-DZ")} <span className="text-sm font-outfit text-white/40">{t("store.currency")}</span>
                    </span>
                  </div>
                </div>

                {/* Submits form programmatically from outside */}
                <button 
                  onClick={(e) => {
                    const form = document.querySelector('form');
                    if (form) form.requestSubmit();
                  }}
                  disabled={isLoading || items.length === 0}
                  className="hidden lg:flex w-full mt-10 items-center justify-center py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 bg-gold-gradient text-black hover:scale-[1.02] shadow-[0_8px_30px_rgba(245,211,138,0.2)] cursor-pointer"
                >
                  {isLoading ? t("common.loading") : t("checkout.submit")}
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
