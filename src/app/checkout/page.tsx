import { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Secure B2B Checkout",
  description: "Finalize your wholesale order with Yanbu Perfumes. Secure business transactions and professional logistics.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
