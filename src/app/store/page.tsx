import { Metadata } from "next";
import StoreClient from "@/components/store/StoreClient";
import { constructMetadata } from "@/utils/seo";

export const metadata: Metadata = constructMetadata({
  title_ar: "معرض الجملة | ينبع للعطور",
  title_fr: "B2B Showroom | Yanba Parfum",
  description_ar: "تصفح مجموعة عطور ينبع الحصرية للجملة. عطور فاخرة لشركاء الأعمال المميزين.",
  description_fr: "Explorez la collection exclusive de vente en gros de Yanba Parfum. Des fragrances haut de gamme pour nos partenaires privilégiés.",
});

export default function StorePage() {
  return <StoreClient />;
}
