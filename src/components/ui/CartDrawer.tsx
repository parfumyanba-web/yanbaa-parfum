"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CartDrawer() {
  const { t, dir } = useLanguage();
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: dir === "rtl" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: dir === "rtl" ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed top-0 h-full w-full max-w-md bg-[var(--color-bg-primary)]/95 backdrop-blur-xl z-[400] shadow-2xl flex flex-col ${
              dir === "rtl" ? "left-0 border-r" : "right-0 border-l"
            } border-[var(--border-subtle)]`}
            dir={dir}
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[var(--color-gold)]" size={20} />
                <h2 className="font-playfair text-xl text-white tracking-widest uppercase">{t("cart.title")}</h2>
              </div>
              <Button variant="icon" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </Button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="text-white/20" size={32} />
                  </div>
                  <p className="font-playfair text-xl text-white/40 italic">{t("cart.empty")}</p>
                  <Link 
                    href="/store" 
                    onClick={() => setIsOpen(false)}
                    className="mt-8"
                  >
                    <Button variant="ghost" className="text-[var(--color-gold)]">
                      {t("cart.explore")}
                    </Button>
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-20 h-24 bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-xl overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--color-gold)]/20 font-playfair text-xl">
                          ✦
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-playfair text-sm text-white group-hover:text-[var(--color-gold)] transition-colors uppercase tracking-wider line-clamp-1">
                          {item.name}
                        </h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <span className="text-[10px] text-white/30 uppercase tracking-widest mb-3">
                        {item.category}
                      </span>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-white/10 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-white/5 text-white/60"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-xs font-inter text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-white/5 text-white/60"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-playfair font-bold text-[var(--color-gold)]">
                          {item.price.toLocaleString("fr-DZ")} <span className="text-[10px] opacity-40">{t("store.currency")}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-[var(--color-bg-secondary)]/50 backdrop-blur-md border-t border-[var(--border-subtle)] space-y-6 mt-auto">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">{t("cart.totalB2B")}</span>
                    <span className="text-3xl font-playfair font-bold text-[var(--color-gold)]">
                      {getTotalPrice().toLocaleString("fr-DZ")} <span className="text-sm font-outfit text-white/40">{t("store.currency")}</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 font-inter italic">{t("cart.shippingInfo")}</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full block"
                >
                  <Button variant="primary" className="w-full py-6 tracking-[0.2em] uppercase text-xs">
                    {t("cart.checkout")}
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
