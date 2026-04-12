export type Category = 'social' | 'ai' | 'web' | 'gaming';

export interface Product {
    id: string;
    title: string;
    category: Category;
    desc: string;
    basePrice: number;
    image: string;
    rating: string;
    outOfStock: boolean;
    features: string[];
    originalPrice?: number;
}

export const products: Product[] = [

  {
    id: "شات-جي-بي-تي-بلس",
    title: "شات جي بي تي بلس (ChatGPT Plus) - شهر واحد",
    category: "ai",
    desc: "استمتع بأقوى نسخة من شات جي بي تي مع سرعة وأداء متقدم. دخول بجهازين، تجديد اشتراك أوفر، ضمان كامل المدة، ودعم فني مستمر.",
    basePrice: 20000.0,
    originalPrice: 33500.0,
    image: "/assets/chatgpt-plus-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["دخول بجهازين", "تجديد اشتراك أوفر", "ضمان كامل المدة", "دعم فني مستمر"]
  },
  {
    id: "جيميني-برو",
    title: "جيميني برو (Gemini Pro)",
    category: "ai",
    desc: "وصول إلى النسخة المتقدمة من جيميني. أداء فائق وتحليل أعمق للبيانات.",
    basePrice: 15000.0,
    originalPrice: 25000.0,
    image: "/assets/gemini-pro-v3.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["دخول بجهازين", "تجديد اشتراك أوفر", "ضمان كامل المدة", "دعم فني مستمر"]
  },

  // Web Services
  {
    id: "إنشاء-متاجر-إلكترونية",
    title: "إنشاء متاجر إلكترونية",
    category: "web",
    desc: "خدمة إنشاء المتاجر الإلكترونية المتكاملة: تصميم عصري، إدارة المنتجات، ربط بوابة الدفع الآمنة، وتهيئة محركات البحث (SEO).",
    basePrice: 130000.0,
    originalPrice: 216660.0,
    image: "/assets/ecommerce-store-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["تصاميم احترافية", "دفع آمن", "تسويق فعال", "متوافق مع الهواتف"]
  },
  {
    id: "تأجير-موقع",
    title: "تأجير موقع إلكتروني",
    category: "web",
    desc: "نظام اشتراك شهري، قوالب متنوعة وجاهزة، حلول دفع مدمجة ودعم فني مستمر.",
    basePrice: 25000.0,
    originalPrice: 41660.0,
    image: "/assets/webstore-rental-v1.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["قوالب احترافية", "دفع آمن", "تحديثات دورية"]
  },
  {
    id: "تطوير-مواقع",
    title: "تعديل وتطوير المواقع",
    category: "web",
    desc: "تطوير المواقع الإلكترونية، إصلاح الأخطاء البرمجية وإضافة ميزات جديدة مخصصة.",
    basePrice: 85000.0,
    originalPrice: 141660.0,
    image: "/assets/web-modification-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["تطوير مخصص", "إصلاح الأخطاء", "تحسين الأداء"]
  },

  // Social Media
  {
    id: "متابعين-إنستغرام",
    title: "زيادة متابعين إنستغرام",
    category: "social",
    desc: "عرض مذهل! إذا تم شراء ألف متابع يأتي معها هدية ألف لايك وألفين مشاهدة. السعر للمتابع الواحد.",
    basePrice: 9.40,
    originalPrice: 15.60,
    image: "/assets/instagram-followers-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["هدية 1000 لايك", "هدية 2000 مشاهدة (لشراء ألف متابع)", "توصيل لليوزرنيم", "خدمة مضمونة"]
  },
  {
    id: "متابعين-تيك-توك",
    title: "زيادة متابعين تيك توك",
    category: "social",
    desc: "عرض مذهل! إذا تم شراء ألف متابع يأتي معها هدية ألف لايك وألفين مشاهدة. السعر للمتابع الواحد.",
    basePrice: 9.40,
    originalPrice: 15.60,
    image: "/assets/tiktok-followers-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["هدية 1000 لايك", "هدية 2000 مشاهدة (لشراء ألف متابع)", "توصيل لليوزرنيم", "خدمة مضمونة"]
  },
  {
    id: "متابعين-فيسبوك",
    title: "زيادة متابعين فيسبوك",
    category: "social",
    desc: "عرض مذهل! إذا تم شراء ألف متابع يأتي معها هدية ألف لايك وألفين مشاهدة. السعر للمتابع الواحد.",
    basePrice: 9.40,
    originalPrice: 15.60,
    image: "/assets/facebook-followers-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["هدية 1000 لايك", "هدية 2000 مشاهدة (لشراء ألف متابع)", "نمو مستمر", "خدمة مضمونة"]
  },

  // Gaming
  {
    id: "شدات-ببجي",
    title: "شحن شدات UC ببجي موبايل",
    category: "gaming",
    desc: "توصيل مباشر للمعرف ID، حزم وعروض حصرية، شحن آمن ومضمون، ودعم فني مستمر.",
    basePrice: 1000.0,
    originalPrice: 1700.0,
    image: "/assets/pubg-uc-v4.webp",
    rating: "5.0",
    outOfStock: true,
    features: ["توصيل مباشر للمعرف ID", "حزم وعروض حصرية", "شحن آمن", "دعم فني مستمر"]
  },
  {
    id: "جواهر-فري-فاير",
    title: "شحن مجوهرات فري فاير",
    category: "gaming",
    desc: "توصيل مباشر للمعرف ID، حزم وعروض حصرية، شحن آمن ومضمون، ودعم مستمر.",
    basePrice: 800.0,
    originalPrice: 1350.0,
    image: "/assets/freefire-diamonds-v4.webp",
    rating: "5.0",
    outOfStock: true,
    features: ["توصيل مباشر للمعرف ID", "حزم وعروض حصرية", "شحن آمن", "دعم مستمر"]
  }
];
