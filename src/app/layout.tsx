import type { Metadata } from "next";
import { Outfit, Alexandria } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { constructMetadata } from "@/utils/seo";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const alexandria = Alexandria({ variable: "--font-alexandria", subsets: ["arabic", "latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${outfit.variable} ${alexandria.variable}`}>
      <body className="bg-[#09090b] text-white antialiased font-alexandria overflow-x-hidden">
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
