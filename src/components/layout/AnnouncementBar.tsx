"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function AnnouncementBar() {
  const [text, setText] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getSettings() {
      const { data } = await supabase
        .from("cms_settings")
        .select("value")
        .eq("key", "announcement")
        .single();
      
      if (data?.value) {
        setText(data.value);
      }
    }
    getSettings();

    const channel = supabase
      .channel('cms_changes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'cms_settings', filter: 'key=eq.announcement' }, 
        (payload: any) => {
          setText(payload.new.value);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!text) return null;

  return (
    <div className="w-full bg-[var(--gold)] py-1 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-[10px] font-black uppercase tracking-[0.2em] text-black font-outfit">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
