"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Language = "ar" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  ar: {
    /* ── Navigation ── */
    "nav.home": "الرئيسية",
    "nav.store": "المتجر",
    "nav.collections": "المجموعات",
    "nav.about": "عن ينبع",
    "nav.account": "حسابي",
    "nav.admin": "لوحة الإدارة",
    "nav.logout": "تسجيل الخروج",
    "nav.login": "تسجيل الدخول",
    "nav.register": "إنشاء حساب",

    /* ── Hero / Home ── */
    "hero.title": "جوهر العطور",
    "hero.title1": "عطور فاخرة من ينبع",
    "hero.subtitle1": "من الجزائر إلى العالم",
    "hero.title2": "مجموعة العود الملكي",
    "hero.subtitle2": "رفاهية لا تقاوم",
    "hero.title3": "اكتشف عالم الرائحة",
    "hero.subtitle": "من قلب الجزائر إلى زجاجتك",
    "hero.cta": "اكتشف المجموعة",
    "home.newArrivals": "الوافدون الجدد",
    "home.featured": "منتجات مميزة",
    "home.bestsellers": "الأكثر مبيعاً",
    "home.whatsapp": "تحدث معنا على واتساب",

    /* ── Store ── */
    "store.title": "المتجر",
    "store.subtitle": "عطور جملة وتجزئة للجزائر",
    "store.search": "ابحث عن عطر...",
    "store.all": "الكل",
    "store.noProducts": "لا توجد منتجات تطابق بحثك.",
    "store.price": "السعر",
    "store.unit": "اختر الكمية",
    "store.unit.100g": "100 غرام",
    "store.unit.500g": "500 غرام",
    "store.unit.1kg": "1 كيلوغرام",
    "store.unit.10kg": "10 كيلوغرام",
    "store.addToCart": "أضف إلى السلة",
    "store.viewDetails": "عرض التفاصيل",
    "store.inStock": "متوفر",
    "store.outOfStock": "غير متوفر",
    "store.currency": "د.ج",
    "store.per": "لكل",
    "store.brand": "الماركة",
    "store.group": "المجموعة",

    /* ── Product Detail ── */
    "product.description": "الوصف",
    "product.selectUnit": "اختر الوحدة",
    "product.addToCart": "أضف إلى السلة",
    "product.backToStore": "العودة إلى المتجر",

    /* ── Cart ── */
    "cart.title": "سلة التسوق",
    "cart.empty": "سلتك فارغة",
    "cart.total": "المجموع",
    "cart.checkout": "تأكيد الطلب",
    "cart.remove": "حذف",
    "cart.continueShopping": "مواصلة التسوق",
    "cart.loginRequired": "يجب تسجيل الدخول لتأكيد الطلب",
    "cart.explore": "اكتشف المجموعات",
    "cart.subtotal": "المجموع الفرعي",
    "cart.shippingInfo": "رسوم التوصيل تُحسب عند الدفع",
    "cart.totalB2B": "المجموع الكلي (جملة)",

    /* ── Checkout ── */
    "checkout.title": "تأكيد الطلب",
    "checkout.info": "معلوماتك",
    "checkout.name": "الاسم الكامل",
    "checkout.store": "اسم المحل",
    "checkout.wilaya": "الولاية",
    "checkout.commune": "البلدية",
    "checkout.phone": "رقم الهاتف",
    "checkout.payment": "طريقة الدفع",
    "checkout.cod": "الدفع عند الاستلام",
    "checkout.delivery": "رسوم التوصيل",
    "checkout.total": "المجموع الكلي",
    "checkout.submit": "تأكيد الطلب",
    "checkout.success": "تم تأكيد طلبك بنجاح!",
    "checkout.successMsg": "سيتواصل معك فريقنا قريباً لتأكيد التوصيل.",
    "checkout.viewOrders": "عرض طلباتي",
    "checkout.note": "ملاحظة",

    /* ── Auth ── */
    "auth.login": "تسجيل الدخول",
    "auth.register": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.fullName": "الاسم الكامل",
    "auth.storeName": "اسم المحل / المتجر",
    "auth.wilaya": "الولاية",
    "auth.commune": "البلدية",
    "auth.phone": "رقم الهاتف",
    "auth.haveAccount": "لديك حساب بالفعل؟",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.submit.login": "دخول",
    "auth.submit.register": "إنشاء حساب",
    "auth.error.mismatch": "كلمات المرور غير متطابقة",
    "auth.error.generic": "حدث خطأ، حاول مجدداً",
    "auth.selectWilaya": "اختر الولاية",
    "auth.selectCommune": "اختر البلدية",

    /* ── Dashboard Common ── */
    "dash.overview": "الرئيسية",
    "dash.orders": "الطلبات",
    "dash.favorites": "المفضلة",
    "dash.profile": "الملف الشخصي",
    "dash.settings": "الإعدادات",
    "dash.products": "المنتجات",
    "dash.clients": "العملاء",
    "dash.inventory": "المخزون",
    "dash.cms": "إدارة المحتوى",
    "dash.tags": "الوسوم",
    "dash.brands": "الماركات",
    "dash.groups": "المجموعات",
    "dash.revenue": "إجمالي المبيعات",
    "dash.pending": "الطلبات المعلقة",
    "dash.partners": "العملاء الجدد",
    "dash.aov": "متوسط قيمة الطلب",
    "dash.returnToStore": "العودة إلى المتجر",
    "dash.welcome": "مرحباً",

    /* ── Order Status ── */
    "status.pending": "في الانتظار",
    "status.processing": "قيد المعالجة",
    "status.shipped": "تم الشحن",
    "status.delivered": "تم التسليم",
    "status.cancelled": "ملغى",

    /* ── Admin ── */
    "admin.title": "لوحة الإدارة",
    "admin.clients.title": "إدارة العملاء",
    "admin.clients.freeze": "تجميد الحساب",
    "admin.clients.unfreeze": "تفعيل الحساب",
    "admin.clients.delete": "حذف الحساب",
    "admin.clients.changePass": "تغيير كلمة المرور",
    "admin.orders.title": "إدارة الطلبات",
    "admin.orders.updateStatus": "تحديث حالة الطلب",
    "admin.products.title": "إدارة المنتجات",
    "admin.settings.title": "إعدادات المنصة",
    "admin.settings.whatsapp": "رقم واتساب",
    "admin.settings.email": "البريد الإلكتروني",
    "admin.settings.address": "العنوان",
    "admin.settings.website": "الموقع الإلكتروني",
    "admin.settings.save": "حفظ الإعدادات",

    /* ── Account ── */
    "account.title": "لوحة التحكم",
    "account.orders.title": "طلباتي",
    "account.favorites.title": "المفضلة",
    "account.favorites.empty": "لم تضف أي منتج إلى المفضلة بعد.",
    "account.profile.title": "الملف الشخصي",
    "account.profile.edit": "تعديل المعلومات",
    "account.profile.changePass": "تغيير كلمة المرور",
    "account.profile.save": "حفظ التغييرات",

    /* ── About ── */
    "about.title": "عن ينبع للعطور",
    "about.subtitle": "من الجزائر إلى العالم",
    "about.story": "قصتنا",
    "about.storyText": "ينبع للعطور علامة جزائرية أصيلة، تجمع بين عراقة الشرق وأناقة الغرب. نُقدم لكم أفضل العطور بأسعار منافسة تناسب السوق الجزائري.",
    "about.mission": "رسالتنا",
    "about.contact": "تواصل معنا",
    "about.desc": "وصف عن المتجر وعن منتجاتنا الفاخرة والعصرية.",

    /* ── Footer ── */
    "footer.address": "الجزائر العاصمة، الجزائر",

    /* ── Collections / About ── */
    "collections.title": "المجموعات",

    /* ── Common ── */
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.confirm": "تأكيد",
    "common.back": "رجوع",
    "common.loading": "جاري التحميل...",
    "common.search": "بحث",
    "common.name": "الاسم",
    "common.email": "البريد الإلكتروني",
    "common.phone": "الهاتف",
    "common.date": "التاريخ",
    "common.total": "المجموع",
    "common.status": "الحالة",
    "common.actions": "إجراءات",
    "common.ref": "الرقم المرجعي",
    "common.units": "الوحدة",
    "common.valuation": "القيمة",
    "common.noData": "لا توجد بيانات",
    "common.viewAll": "عرض الكل",
    "common.newOrder": "طلب جديد",
  },

  fr: {
    /* ── Navigation ── */
    "nav.home": "Accueil",
    "nav.store": "Boutique",
    "nav.collections": "Collections",
    "nav.about": "À Propos",
    "nav.account": "Mon Compte",
    "nav.admin": "Administration",
    "nav.logout": "Se Déconnecter",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",

    /* ── Hero / Home ── */
    "hero.title": "L'Essence du Parfum",
    "hero.title1": "Parfums de Luxe Yanba",
    "hero.subtitle1": "D'Algérie au monde entier",
    "hero.title2": "Collection Oud Royal",
    "hero.subtitle2": "Luxe irresistible",
    "hero.title3": "Découvrez le Monde des Senteurs",
    "hero.subtitle": "Du cœur de l'Algérie à votre flacon",
    "hero.cta": "Découvrir la Collection",
    "home.newArrivals": "Nouveautés",
    "home.featured": "Produits Vedettes",
    "home.bestsellers": "Meilleures Ventes",
    "home.whatsapp": "Discuter sur WhatsApp",

    /* ── Store ── */
    "store.title": "Boutique",
    "store.subtitle": "Parfums en gros et détail pour l'Algérie",
    "store.search": "Rechercher un parfum...",
    "store.all": "Tout",
    "store.noProducts": "Aucun produit ne correspond à votre recherche.",
    "store.price": "Prix",
    "store.unit": "Choisir la quantité",
    "store.unit.100g": "100 grammes",
    "store.unit.500g": "500 grammes",
    "store.unit.1kg": "1 kilogramme",
    "store.unit.10kg": "10 kilogrammes",
    "store.addToCart": "Ajouter au Panier",
    "store.viewDetails": "Voir les Détails",
    "store.inStock": "En Stock",
    "store.outOfStock": "Épuisé",
    "store.currency": "DA",
    "store.per": "par",
    "store.brand": "Marque",
    "store.group": "Collection",

    /* ── Product Detail ── */
    "product.description": "Description",
    "product.selectUnit": "Choisissez l'unité",
    "product.addToCart": "Ajouter au Panier",
    "product.backToStore": "Retour à la Boutique",

    /* ── Cart ── */
    "cart.title": "Mon Panier",
    "cart.empty": "Votre panier est vide",
    "cart.total": "Total",
    "cart.checkout": "Confirmer la Commande",
    "cart.remove": "Supprimer",
    "cart.continueShopping": "Continuer mes Achats",
    "cart.loginRequired": "Vous devez être connecté pour confirmer votre commande",
    "cart.explore": "Explorer les Collections",
    "cart.subtotal": "Sous-total",
    "cart.shippingInfo": "Frais de livraison calculés au paiement",
    "cart.totalB2B": "Montant Total (B2B)",

    /* ── Checkout ── */
    "checkout.title": "Confirmation de Commande",
    "checkout.info": "Vos Informations",
    "checkout.name": "Nom Complet",
    "checkout.store": "Nom du Magasin",
    "checkout.wilaya": "Wilaya",
    "checkout.commune": "Commune",
    "checkout.phone": "Numéro de Téléphone",
    "checkout.payment": "Mode de Paiement",
    "checkout.cod": "Paiement à la Livraison",
    "checkout.delivery": "Frais de Livraison",
    "checkout.total": "Total Général",
    "checkout.submit": "Confirmer la Commande",
    "checkout.success": "Commande confirmée avec succès !",
    "checkout.successMsg": "Notre équipe vous contactera bientôt pour confirmer la livraison.",
    "checkout.viewOrders": "Voir mes Commandes",
    "checkout.note": "Remarque",

    /* ── Auth ── */
    "auth.login": "Connexion",
    "auth.register": "S'inscrire",
    "auth.email": "Adresse E-mail",
    "auth.password": "Mot de Passe",
    "auth.confirmPassword": "Confirmer le Mot de Passe",
    "auth.fullName": "Nom Complet",
    "auth.storeName": "Nom du Magasin / Commerce",
    "auth.wilaya": "Wilaya",
    "auth.commune": "Commune",
    "auth.phone": "Numéro de Téléphone",
    "auth.haveAccount": "Vous avez déjà un compte ?",
    "auth.noAccount": "Pas encore de compte ?",
    "auth.submit.login": "Se Connecter",
    "auth.submit.register": "Créer un Compte",
    "auth.error.mismatch": "Les mots de passe ne correspondent pas",
    "auth.error.generic": "Une erreur s'est produite, veuillez réessayer",
    "auth.selectWilaya": "Sélectionner la Wilaya",
    "auth.selectCommune": "Sélectionner la Commune",

    /* ── Dashboard Common ── */
    "dash.overview": "Tableau de Bord",
    "dash.orders": "Commandes",
    "dash.favorites": "Favoris",
    "dash.profile": "Profil",
    "dash.settings": "Paramètres",
    "dash.products": "Produits",
    "dash.clients": "Clients",
    "dash.inventory": "Inventaire",
    "dash.cms": "Gestion CMS",
    "dash.tags": "Étiquettes",
    "dash.brands": "Marques",
    "dash.groups": "Collections",
    "dash.revenue": "Chiffre d'Affaires",
    "dash.pending": "Commandes en Attente",
    "dash.partners": "Nouveaux Clients",
    "dash.aov": "Panier Moyen",
    "dash.returnToStore": "Retour à la Boutique",
    "dash.welcome": "Bienvenue",

    /* ── Order Status ── */
    "status.pending": "En Attente",
    "status.processing": "En Cours",
    "status.shipped": "Expédié",
    "status.delivered": "Livré",
    "status.cancelled": "Annulé",

    /* ── Admin ── */
    "admin.title": "Panneau d'Administration",
    "admin.clients.title": "Gestion des Clients",
    "admin.clients.freeze": "Geler le Compte",
    "admin.clients.unfreeze": "Activer le Compte",
    "admin.clients.delete": "Supprimer le Compte",
    "admin.clients.changePass": "Changer le Mot de Passe",
    "admin.orders.title": "Gestion des Commandes",
    "admin.orders.updateStatus": "Mettre à Jour le Statut",
    "admin.products.title": "Gestion des Produits",
    "admin.settings.title": "Paramètres de la Plateforme",
    "admin.settings.whatsapp": "Numéro WhatsApp",
    "admin.settings.email": "Adresse E-mail",
    "admin.settings.address": "Adresse",
    "admin.settings.website": "Site Web",
    "admin.settings.save": "Enregistrer les Paramètres",

    /* ── Account ── */
    "account.title": "Mon Espace Personnel",
    "account.orders.title": "Mes Commandes",
    "account.favorites.title": "Mes Favoris",
    "account.favorites.empty": "Vous n'avez encore aucun favori.",
    "account.profile.title": "Mon Profil",
    "account.profile.edit": "Modifier mes Informations",
    "account.profile.changePass": "Changer le Mot de Passe",
    "account.profile.save": "Enregistrer",

    /* ── About ── */
    "about.title": "À Propos de Yanba Parfums",
    "about.subtitle": "D'Algérie au monde entier",
    "about.story": "Notre Histoire",
    "about.storyText": "Yanba Parfums est une marque algérienne authentique qui allie l'élégance de l'Orient et du Occident. Nous proposons les meilleurs parfums à des prix compétitifs adaptés au marché algérien.",
    "about.mission": "Notre Mission",
    "about.contact": "Nous Contacter",
    "about.desc": "Description complète du magasin et de nos produits de luxe contemporains.",

    /* ── Footer ── */
    "footer.address": "Alger, Algérie",

    /* ── Collections / About ── */
    "collections.title": "Collections",

    /* ── Common ── */
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.confirm": "Confirmer",
    "common.back": "Retour",
    "common.loading": "Chargement...",
    "common.search": "Rechercher",
    "common.name": "Nom",
    "common.email": "E-mail",
    "common.phone": "Téléphone",
    "common.date": "Date",
    "common.total": "Total",
    "common.status": "Statut",
    "common.actions": "Actions",
    "common.ref": "Référence",
    "common.units": "Unité",
    "common.valuation": "Valeur",
    "common.noData": "Aucune donnée",
    "common.viewAll": "Voir Tout",
    "common.newOrder": "Nouvelle Commande",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("yanba-lang") as Language;
    if (saved === "ar" || saved === "fr") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("yanba-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);

  const t = useCallback((key: string): string => {
    return DICTIONARY[language][key] ?? key;
  }, [language]);

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
