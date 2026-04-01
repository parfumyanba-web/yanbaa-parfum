import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t, dir } = useLanguage();

  return (
    <footer dir={dir} className="relative mt-20 border-t border-[var(--border-subtle)] bg-[#09090b] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--gold)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--deep-bg)] shadow-[0_0_20px_rgba(245,211,138,0.1)]">
                  <span className="text-[var(--gold)] font-bold font-outfit">Y</span>
                </div>
                <span className="font-outfit text-3xl font-bold tracking-widest text-white group-hover:text-gold-gradient transition-all">
                  YANBA
                </span>
              </div>
            </Link>
            <p className="text-[var(--text-muted)] max-w-sm text-sm leading-relaxed font-outfit">
              {t("about.desc")}
            </p>
            <form className="relative max-w-sm mt-6">
              <input 
                type="email" 
                placeholder={dir === 'rtl' ? "اشترك في قائمتنا البريدية..." : "Abonnez-vous à notre newsletter..."} 
                className="w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-full py-4 px-6 text-sm text-white focus:outline-none focus:border-[var(--gold)] transition-all placeholder:text-white/20 font-outfit"
              />
              <button className="absolute top-1/2 -translate-y-1/2 end-2 w-10 h-10 rounded-full bg-gold-gradient text-black flex items-center justify-center hover:scale-105 transition-transform">
                <Send size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </form>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-playfair text-xl tracking-wide">{t("nav.store")}</h4>
            <ul className="space-y-4">
              {["collections", "new", "bestsellers"].map((item) => (
                <li key={item}>
                  <Link href="/store" className="text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors text-sm flex items-center gap-2 group font-outfit">
                    <span className="w-4 h-[1px] bg-[var(--border-strong)] group-hover:w-6 group-hover:bg-[var(--gold)] transition-all" />
                    {dir === 'rtl' ? (item === 'collections' ? 'المجموعات' : item === 'new' ? 'وصل حديثاً' : 'الأكثر مبيعاً') : (item === 'collections' ? 'Collections' : item === 'new' ? 'Nouveautés' : 'Meilleures Ventes')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-white font-playfair text-xl tracking-wide">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-[var(--text-muted)] text-sm group">
                <div className="w-10 h-10 rounded-full bg-[var(--surface-1)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--gold)] group-hover:text-[var(--gold)] transition-all">
                  <MapPin size={16} />
                </div>
                <div className="pt-2 font-outfit">
                  <p className="text-white mb-1">{t("footer.address")}</p>
                  <p>الجزائر العاصمة، الجزائر<br/>Alger, Algérie</p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-[var(--text-muted)] text-sm group">
                <div className="w-10 h-10 rounded-full bg-[var(--surface-1)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--gold)] group-hover:text-[var(--gold)] transition-all">
                  <Phone size={16} />
                </div>
                <p className="font-outfit" dir="ltr">+213 550 00 00 00</p>
              </li>
              <li className="flex items-center gap-4 text-[var(--text-muted)] text-sm group">
                <div className="w-10 h-10 rounded-full bg-[var(--surface-1)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--gold)] group-hover:text-[var(--gold)] transition-all">
                  <Mail size={16} />
                </div>
                <p className="font-outfit">contact@yanba-parfum.com</p>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-muted)] text-xs font-outfit tracking-widest uppercase">
            © {new Date().getFullYear()} YANBA PERFUMES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-1)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-black hover:bg-[var(--gold)] hover:border-[var(--gold)] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-1)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-black hover:bg-[var(--gold)] hover:border-[var(--gold)] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
