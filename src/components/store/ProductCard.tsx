"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

import { UNITS, UNIT_MULTIPLIERS, type Unit } from "@/data/mockProducts";

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  group: string;
  basePrice: number;
  description: string;
  image: string | null;
  tags?: string[];
}

export function ProductCard({ product }: { product: Product }) {
  const { t, dir } = useLanguage();
  const { addItem } = useCartStore();
  const [selectedUnit, setSelectedUnit] = useState<Unit>("100g");

  const finalPrice = product.basePrice * UNIT_MULTIPLIERS[selectedUnit];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group glass-card overflow-hidden flex flex-col relative"
    >
      {/* Visual Area */}
      <div className="aspect-[4/5] relative bg-gradient-to-br from-[var(--surface-1)] to-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gold)]/5 group-hover:bg-[var(--gold)]/10 transition-colors duration-700 blur-2xl font-black" />
        
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        ) : (
          <span className="font-playfair text-7xl text-[var(--gold)]/10 levitate select-none relative z-10 transition-transform duration-1000">✦</span>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-4 inset-x-4 flex flex-wrap gap-2 pointer-events-none">
            {product.tags.map(tag => (
              <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[var(--gold)] border border-[var(--gold)]/20 shadow-xl">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[4px]">
          <Link href={`/store/${product.id}`}
            className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black hover:border-transparent transition-all hover:scale-110 shadow-2xl">
            <Eye size={20} />
          </Link>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-6 relative z-10 flex flex-col flex-grow bg-gradient-to-t from-black to-transparent">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/60 mb-2 font-bold">{product.brand} · {product.group}</p>
        
        <Link href={`/store/${product.id}`} className="mb-2 inline-block">
          <h3 className="font-playfair text-2xl text-white group-hover:text-gold-gradient transition-all line-clamp-1 leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <p className="font-outfit text-xs text-white/40 line-clamp-2 mb-8 flex-grow leading-relaxed">
          {product.description}
        </p>

        {/* Selection & Add to Cart Container */}
        <div className="flex flex-col gap-4 mt-auto">
          {/* Custom Select Box */}
          <div className="relative">
            <select
              value={selectedUnit}
              onChange={e => setSelectedUnit(e.target.value as Unit)}
              className="w-full appearance-none bg-white/5 border border-white/5 py-3 px-5 text-[11px] font-black uppercase tracking-widest text-white/70 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors"
            >
              {UNITS.map(u => (
                <option key={u} value={u} className="bg-[#0a0a0a] text-white py-2">{t(`store.unit.${u}`)}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" style={{ [dir === 'rtl' ? 'left' : 'right']: '20px' }} />
          </div>

          <div className="flex items-center justify-between">
            <p className="font-outfit text-2xl font-light text-white">
              {finalPrice.toLocaleString("fr-DZ")} <span className="text-[10px] text-white/30 uppercase tracking-widest ml-1">{t("store.currency")}</span>
            </p>
            <Button
              variant="icon"
              className="w-12 h-12 bg-white/5 border border-white/5 text-[var(--gold)] hover:bg-gold-gradient hover:text-black hover:border-transparent transition-all shadow-xl"
              onClick={() => addItem({ id: product.id, name: product.name, price: finalPrice, image: product.image || "", category: product.category, unit: selectedUnit })}
            >
              <ShoppingBag size={18} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
