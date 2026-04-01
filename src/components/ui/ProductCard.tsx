"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, Star, Plus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
}

export default function ProductCard({ id, name, description, price, image, category, rating = 5 }: ProductCardProps) {
  const { addItem } = useCartStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white/5 border border-white/10 overflow-hidden hover:border-gold-500/30 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        
        {/* Quick Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <button 
            onClick={() => addItem({ id, name, description, price, image, category })}
            className="p-3 bg-white text-black rounded-full hover:bg-gold-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
          >
            <Plus size={20} />
          </button>
          <button className="p-3 bg-white text-black rounded-full hover:bg-gold-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
            <Eye size={20} />
          </button>
        </div>

        {/* Category Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-gold-500">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair text-xl text-white group-hover:text-gold-500 transition-colors uppercase tracking-wider">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-gold-500">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-inter">{rating}.0</span>
          </div>
        </div>
        
        <p className="text-white/40 text-xs font-inter line-clamp-2 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Business Price</span>
            <span className="text-lg font-playfair text-gold-500 font-medium">
              ${price.toLocaleString()} <span className="text-[10px] text-white/40">/ Unit</span>
            </span>
          </div>
          <span className="text-[10px] text-gold-500/60 uppercase tracking-widest border-b border-gold-500/20 pb-0.5">
            Bulk Tiers Available
          </span>
        </div>
      </div>
    </motion.div>
  );
}
