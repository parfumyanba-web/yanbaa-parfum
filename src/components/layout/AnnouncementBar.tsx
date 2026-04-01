"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function AnnouncementBar() {
  const [settings, setSettings] = useState<{ text: string, active: boolean } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getSettings() {
      const { data } = await supabase
        .from("cms_settings")
        .select("value")
        .eq("key", "announcement_bar")
        .single();
      
      if (data?.value) {
        setSettings(data.value);
      }
    }
    getSettings();

    // Set up real-time subscription
    const channel = supabase
      .channel('cms_changes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'cms_settings', filter: 'key=eq.announcement_bar' }, 
        (payload: any) => {
          setSettings(payload.new.value);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!settings || !settings.active) return null;

  return (
    <div className="w-full bg-[var(--gold)] py-1.5 overflow-hidden border-b border-black/10">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="mx-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-black font-outfit">
          {settings.text}
        </span>
        <span className="mx-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-black font-outfit" aria-hidden="true">
          {settings.text}
        </span>
        <span className="mx-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-black font-outfit" aria-hidden="true">
          {settings.text}
        </span>
      </div>
    </div>
  );
}
