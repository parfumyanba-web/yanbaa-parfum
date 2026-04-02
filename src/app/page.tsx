import React from "react";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { constructMetadata } from "@/utils/seo";
import HomeClient from "@/components/home/HomeClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: seoData } = await supabase
    .from("cms_settings")
    .select("value")
    .eq("key", "seo_home")
    .single();

  if (!seoData?.value) return constructMetadata();

  try {
    const seo = typeof seoData.value === 'string' ? JSON.parse(seoData.value) : seoData.value;
    return constructMetadata({
      title_ar: seo.title_ar,
      title_fr: seo.title_fr,
      description_ar: seo.desc_ar,
      description_fr: seo.desc_fr,
    });
  } catch {
    return constructMetadata();
  }
}

export default function Home() {
  return <HomeClient />;
}
