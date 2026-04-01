"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Save, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import DashboardSidebar from "@/components/dashboard/Sidebar";

export default function ProfilePage() {
  const { t, dir } = useLanguage();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 py-3.5 px-4 text-sm text-white transition-all";

  return (
    <div dir={dir} className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar role="client" />
      <main className="flex-1 lg:ml-64 px-6 md:px-12 py-12 pt-20">
        <div className="max-w-2xl mx-auto space-y-10">
          {/* Header */}
          <div>
            <h1 className="font-playfair text-4xl text-white mb-2">{t("account.profile.title")}</h1>
            <p className="text-white/30 text-[11px] uppercase tracking-widest">{t("dash.profile")}</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/5 p-1 border border-white/10">
            {(["info", "password"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-200 ${
                  activeTab === tab ? "bg-[#D4AF37] text-black" : "text-white/40 hover:text-white"
                }`}>
                {tab === "info" ? t("account.profile.edit") : t("account.profile.changePass")}
              </button>
            ))}
          </div>

          {/* Info Tab */}
          {activeTab === "info" && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSave}
              className="space-y-5 bg-white/[0.03] border border-white/10 p-8"
            >
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50">{t("auth.fullName")}</label>
                <input type="text" className={inputClass} placeholder={t("auth.fullName")} />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50">{t("auth.storeName")}</label>
                <input type="text" className={inputClass} placeholder={t("auth.storeName")} />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50">{t("auth.phone")}</label>
                <input type="tel" className={inputClass} placeholder="+213..." />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50">{t("auth.email")}</label>
                <input type="email" className={inputClass} placeholder={t("auth.email")} />
              </div>
              <button type="submit"
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #D4AF37, #A88820)", color: "#0a0a0a" }}>
                <Save size={14} />
                {saved ? "✓" : t("account.profile.save")}
              </button>
            </motion.form>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSave}
              className="space-y-5 bg-white/[0.03] border border-white/10 p-8"
            >
              {[
                { label: t("auth.password"), show: showOld, setShow: setShowOld, name: "oldPass" },
                { label: t("auth.confirmPassword"), show: showNew, setShow: setShowNew, name: "newPass" },
              ].map(({ label, show, setShow, name }) => (
                <div key={name} className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-white/50">{label}</label>
                  <div className="relative">
                    <input type={show ? "text" : "password"} name={name}
                      className="w-full bg-white/5 border border-white/10 py-3.5 px-4 text-sm text-white transition-all pr-12" />
                    <button type="button" onClick={() => setShow(p => !p)}
                      className="absolute top-1/2 -translate-y-1/2 right-4 text-white/30 hover:text-white transition-colors">
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ))}
              <button type="submit"
                className="flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #D4AF37, #A88820)", color: "#0a0a0a" }}>
                <Lock size={14} />
                {saved ? "✓" : t("account.profile.save")}
              </button>
            </motion.form>
          )}
        </div>
      </main>
    </div>
  );
}
