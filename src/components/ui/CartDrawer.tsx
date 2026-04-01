"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#121212] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-gold-500" size={24} />
                <h2 className="font-playfair text-2xl text-white">Your Selection</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="text-white/20" size={32} />
                  </div>
                  <p className="font-playfair text-xl text-white/40 italic">Your cart is empty.</p>
                  <Link 
                    href="/store" 
                    onClick={() => setIsOpen(false)}
                    className="mt-8 text-gold-500 uppercase tracking-widest text-xs border-b border-gold-500/30 pb-1 hover:border-gold-500 transition-all font-inter"
                  >
                    Explore Collections
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
                    <div className="relative w-20 h-24 bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-playfair text-sm text-white group-hover:text-gold-500 transition-colors uppercase tracking-wider line-clamp-1">
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
                        <span className="text-sm font-playfair text-gold-500">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-black/40 border-t border-white/10 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Total Amount (B2B)</span>
                    <span className="text-3xl font-playfair text-gold-500">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 font-inter italic">Excluding Shipping</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gold-500 text-black py-4 flex items-center justify-center gap-3 font-inter uppercase tracking-[0.2em] text-xs font-bold hover:bg-white transition-all duration-500 group"
                >
                  Confirm B2B Order
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <p className="text-center text-[10px] text-white/30 font-inter">
                  VAT and Bulk Discounts applied at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
