import type { Metadata } from "next";
import { Outfit, Alexandria } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const alexandria = Alexandria({ variable: "--font-alexandria", subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: {
    default: "ينبع للعطور | متجر العطور الجزائري",
    template: "%s | ينبع للعطور"
  },
  description: "ينبع للعطور — أجود العطور بأسعار الجملة للسوق الجزائري. عطور شرقية وغربية أصيلة.",
  keywords: ["عطور", "ينبع", "جزائر", "جملة", "عود", "مسك", "parfum", "Algérie", "gros"],
  openGraph: {
    title: "ينبع للعطور",
    description: "أجود العطور للسوق الجزائري",
    siteName: "ينبع للعطور",
    locale: "ar_DZ",
    type: "website",
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${outfit.variable} ${alexandria.variable}`}>
      <body className="bg-[#09090b] text-white antialiased font-alexandria">
        <LanguageProvider>
          <Header />
          <CartDrawer />
          <main className="pt-16 min-h-screen w-full flex flex-col relative">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
