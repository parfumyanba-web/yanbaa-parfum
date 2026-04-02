import { Metadata } from "next";

export type SEOData = {
  title_ar: string;
  title_fr: string;
  description_ar: string;
  description_fr: string;
  keywords_ar: string[];
  keywords_fr: string[];
};

export const defaultSEO: SEOData = {
  title_ar: "ينبع للعطور | متجر العطور الجزائري",
  title_fr: "Yanba Parfum | Parfumerie Fine en Algérie",
  description_ar: "ينبع للعطور — أجود العطور بأسعار الجملة للسوق الجزائري. عطور شرقية وغربية أصيلة.",
  description_fr: "Yanba Parfum — Les meilleures fragrances aux prix de gros pour le marché algérien.",
  keywords_ar: ["عطور", "ينبع", "جزائر", "جملة", "عود", "مسك"],
  keywords_fr: ["parfum", "Algérie", "gros", "oud", "musk"],
};

export function constructMetadata(data: Partial<SEOData> = {}): Metadata {
  const seo = { ...defaultSEO, ...data };
  
  return {
    title: {
      default: seo.title_ar,
      template: `%s | ينبع للعطور`
    },
    description: seo.description_ar,
    keywords: [...seo.keywords_ar, ...seo.keywords_fr],
    openGraph: {
      title: seo.title_ar,
      description: seo.description_ar,
      siteName: "Yanba Parfum",
      locale: "ar_DZ",
      type: "website",
    },
    alternates: {
      languages: {
        'ar-DZ': '/',
        'fr-DZ': '/fr',
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
}
