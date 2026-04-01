import { Metadata } from "next";
import StoreClient from "@/components/store/StoreClient";

export const metadata: Metadata = {
  title: "B2B Showroom",
  description: "Explore the exclusive Yanbu Perfumes wholesale collection. Premium fragrances for elite business partners.",
};

export default function StorePage() {
  return <StoreClient />;
}
