import { Metadata } from 'next';
import ProductDetailClient from "@/components/store/ProductDetailClient";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { constructMetadata } from "@/utils/seo";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: product } = await supabase
    .from("products")
    .select("name_ar, name_fr, description_ar, description_fr")
    .eq("id", id)
    .single();

  if (!product) return constructMetadata();

  return constructMetadata({
    title_ar: product.name_ar,
    title_fr: product.name_fr,
    description_ar: product.description_ar,
    description_fr: product.description_fr,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
