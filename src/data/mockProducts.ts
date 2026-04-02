export const UNITS = ["100g", "500g", "1kg", "10kg"] as const;
export type Unit = typeof UNITS[number];

export const UNIT_MULTIPLIERS: Record<Unit, number> = {
  "100g": 1,
  "500g": 5,
  "1kg": 10,
  "10kg": 100,
};

export const MOCK_PRODUCTS = [
  { 
    id: "1", 
    name: "عود ملكي / Oud Royal", 
    category: "شرقي", 
    brand: "ينبع", 
    group: "عود", 
    basePrice: 12500, 
    description: "مزيج فاخر من عود كمبوديا مع وردة الطائف.", 
    image: null, 
    tags: ["جديد"] 
  },
  { 
    id: "2", 
    name: "ياسمين منتصف الليل / Jasmin de Minuit", 
    category: "زهري", 
    brand: "ينبع", 
    group: "زهري", 
    basePrice: 8500, 
    description: "ياسمين الليل مع نفحات المسك الأبيض.", 
    image: null, 
    tags: ["الأكثر مبيعاً"] 
  },
  { 
    id: "3", 
    name: "صندل ذهبي / Santal Doré", 
    category: "خشبي", 
    brand: "ينبع", 
    group: "خشبي", 
    basePrice: 9800, 
    description: "خشب الصندل الهندي مع لمسات العنبر.", 
    image: null, 
    tags: [] 
  },
  { 
    id: "4", 
    name: "وردة الصحراء / Rose du Désert", 
    category: "زهري", 
    brand: "ينبع", 
    group: "زهري", 
    basePrice: 7500, 
    description: "جمال الصحراء في كل نقطة.", 
    image: null, 
    tags: ["جديد"] 
  },
  { 
    id: "5", 
    name: "مسك الفانيليا / Musk Vanilla", 
    category: "زهري", 
    brand: "ينبع", 
    group: "مسك", 
    basePrice: 6500, 
    description: "نعومة المسك مع حلاوة الفانيليا.", 
    image: null, 
    tags: ["الأكثر مبيعاً"] 
  },
  { 
    id: "6", 
    name: "عنبر الليل / Ambre de Nuit", 
    category: "شرقي", 
    brand: "ينبع", 
    group: "عنبر", 
    basePrice: 11000, 
    description: "عنبر دافئ مع نفحات البخور.", 
    image: null, 
    tags: [] 
  }
];
