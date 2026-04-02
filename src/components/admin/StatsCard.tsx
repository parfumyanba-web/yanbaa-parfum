"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  delay?: number;
}

export function StatsCard({ label, value, icon: Icon, trend, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6 flex flex-col gap-4 border-white/5 group hover:border-[var(--gold)]/30 transition-all duration-500"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--gold)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded-lg ${trend.isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-1">{label}</p>
        <p className="text-2xl md:text-3xl font-playfair text-white">{value}</p>
      </div>
    </motion.div>
  );
}
