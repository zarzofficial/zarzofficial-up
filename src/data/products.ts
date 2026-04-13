export type Category = "social" | "ai" | "web" | "gaming";

export interface ProductOption {
  label: string;
  price: number;
}

export interface ProductVariationGroup {
  id: string;
  label: string;
  options: Array<{ id?: string; label: string }>;
}

export interface ProductDetails {
  type?: string;
  duration?: string;
  delivery?: string;
  batch?: number;
  options?: ProductOption[];
  includes?: string[];
  hasForm?: boolean;
  requiresId?: boolean;
  requiresCountry?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: Category;
  desc: string;
  basePrice: number;
  image: string;
  rating: string;
  outOfStock: boolean;
  features: string[];
  details: ProductDetails;
  originalPrice?: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  variationGroups?: ProductVariationGroup[];
}

export const products: Product[] = [
  {
    id: "شات-جي-بي-تي-بلس",
    slug: "شات-جي-بي-تي-بلس",
    title: "شات جي بي تي بلس (ChatGPT Plus) - شهر واحد",
    category: "ai",
    desc: "استمتع بأقوى نسخة من شات جي بي تي مع سرعة وأداء متقدم. دخول بجهازين، تجديد اشتراك أوفر، ضمان كامل المدة، ودعم فني مستمر.",
    basePrice: 20000,
    originalPrice: 33500,
    image: "/assets/chatgpt-plus-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["دخول بجهازين", "تجديد اشتراك أوفر", "ضمان كامل المدة", "دعم فني مستمر"],
    details: {
      type: "حساب خاص",
      duration: "شهر واحد",
      delivery: "واتساب",
      options: [{ label: "اشتراك شهر واحد", price: 20000 }],
    },
    reviewCount: 222,
    stock: 14,
    variationGroups: [
      {
        id: "support",
        label: "الدعم",
        options: [
          { id: "standard", label: "قياسي" },
          { id: "priority", label: "مميز" },
        ],
      },
    ],
    featured: true,
  },
  {
    id: "جيميني-برو",
    slug: "جيميني-برو",
    title: "جيميني برو (Gemini Pro)",
    category: "ai",
    desc: "وصول إلى النسخة المتقدمة من جيميني. أداء فائق وتحليل أعمق للبيانات مع تسليم مباشر ومتابعة سريعة.",
    basePrice: 15000,
    originalPrice: 25000,
    image: "/assets/gemini-pro-v3.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["دخول بجهازين", "تجديد اشتراك أوفر", "ضمان كامل المدة", "دعم فني مستمر"],
    details: {
      type: "حساب خاص",
      duration: "شهر واحد",
      delivery: "واتساب",
      options: [{ label: "اشتراك شهر واحد", price: 15000 }],
    },
    reviewCount: 154,
    stock: 18,
    variationGroups: [
      {
        id: "delivery",
        label: "التسليم",
        options: [
          { id: "whatsapp", label: "واتساب" },
          { id: "direct", label: "تأكيد مباشر" },
        ],
      },
    ],
  },
  {
    id: "إنشاء-متاجر-إلكترونية",
    slug: "إنشاء-متاجر-إلكترونية",
    title: "إنشاء متاجر إلكترونية",
    category: "web",
    desc: "خدمة إنشاء المتاجر الإلكترونية المتكاملة: تصميم عصري، إدارة المنتجات، ربط بوابة الدفع، وتهيئة محركات البحث.",
    basePrice: 130000,
    originalPrice: 216660,
    image: "/assets/ecommerce-store-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["تصاميم احترافية", "دفع آمن", "تسويق فعال", "متوافق مع الهواتف"],
    details: {
      type: "خدمة",
      includes: ["تصميم مخصص", "ربط بوابات الدفع", "لوحة تحكم"],
      hasForm: true,
    },
    reviewCount: 61,
    stock: 7,
    featured: true,
    variationGroups: [
      {
        id: "scope",
        label: "النطاق",
        options: [
          { id: "landing", label: "صفحة هبوط" },
          { id: "full-store", label: "متجر كامل" },
        ],
      },
      {
        id: "style",
        label: "الطابع",
        options: [
          { id: "clean", label: "نظيف" },
          { id: "bold", label: "جريء" },
        ],
      },
    ],
  },
  {
    id: "تأجير-موقع",
    slug: "تأجير-موقع",
    title: "تأجير موقع إلكتروني",
    category: "web",
    desc: "نظام اشتراك شهري، قوالب متنوعة وجاهزة، حلول دفع مدمجة ودعم فني مستمر.",
    basePrice: 25000,
    originalPrice: 41660,
    image: "/assets/webstore-rental-v1.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["قوالب احترافية", "دفع آمن", "تحديثات دورية"],
    details: {
      type: "خدمة شهرية",
      includes: ["قالب جاهز", "استضافة وربط", "متابعة شهرية"],
      hasForm: true,
    },
    reviewCount: 73,
    stock: 9,
  },
  {
    id: "تطوير-مواقع",
    slug: "تطوير-مواقع",
    title: "تعديل وتطوير المواقع",
    category: "web",
    desc: "تطوير المواقع الإلكترونية، إصلاح الأخطاء البرمجية وإضافة ميزات جديدة مخصصة.",
    basePrice: 85000,
    originalPrice: 141660,
    image: "/assets/web-modification-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["تطوير مخصص", "إصلاح الأخطاء", "تحسين الأداء"],
    details: {
      type: "خدمة",
      includes: ["تعديلات واجهة المستخدم", "تحسين الأكواد", "إصلاح الأخطاء"],
      hasForm: true,
    },
    reviewCount: 45,
    stock: 12,
    featured: true,
    variationGroups: [
      {
        id: "priority",
        label: "الأولوية",
        options: [
          { id: "standard", label: "عادية" },
          { id: "rush", label: "مستعجلة" },
        ],
      },
    ],
  },
  {
    id: "متابعين-إنستغرام",
    slug: "متابعين-إنستغرام",
    title: "زيادة متابعين إنستغرام",
    category: "social",
    desc: "عرض مذهل! إذا تم شراء ألف متابع يأتي معها هدية ألف لايك وألفين مشاهدة. السعر للمتابع الواحد.",
    basePrice: 9.4,
    originalPrice: 15.6,
    image: "/assets/instagram-followers-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["هدية 1000 لايك", "هدية 2000 مشاهدة", "توصيل لليوزرنيم", "خدمة مضمونة"],
    details: { type: "حسابات عالية الجودة", delivery: "1-2 ساعة", batch: 1 },
    reviewCount: 286,
    stock: 84,
    featured: true,
    variationGroups: [
      {
        id: "quality",
        label: "الجودة",
        options: [
          { id: "steady", label: "ثابت" },
          { id: "fast", label: "سريع" },
          { id: "mixed", label: "مختلط" },
        ],
      },
    ],
  },
  {
    id: "متابعين-تيك-توك",
    slug: "متابعين-تيك-توك",
    title: "زيادة متابعين تيك توك",
    category: "social",
    desc: "عرض مذهل! إذا تم شراء ألف متابع يأتي معها هدية ألف لايك وألفين مشاهدة. السعر للمتابع الواحد.",
    basePrice: 9.4,
    originalPrice: 15.6,
    image: "/assets/tiktok-followers-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["هدية 1000 لايك", "هدية 2000 مشاهدة", "توصيل لليوزرنيم", "خدمة مضمونة"],
    details: { type: "حسابات عالية الجودة", delivery: "5-30 دقيقة", batch: 1 },
    reviewCount: 342,
    stock: 91,
    featured: true,
    variationGroups: [
      {
        id: "campaign",
        label: "نوع الحملة",
        options: [
          { id: "starter", label: "بداية" },
          { id: "growth", label: "نمو" },
          { id: "boost", label: "دفعة قوية" },
        ],
      },
    ],
  },
  {
    id: "متابعين-فيسبوك",
    slug: "متابعين-فيسبوك",
    title: "زيادة متابعين فيسبوك",
    category: "social",
    desc: "عرض مذهل! إذا تم شراء ألف متابع يأتي معها هدية ألف لايك وألفين مشاهدة. السعر للمتابع الواحد.",
    basePrice: 9.4,
    originalPrice: 15.6,
    image: "/assets/facebook-followers-v4.webp",
    rating: "5.0",
    outOfStock: false,
    features: ["هدية 1000 لايك", "هدية 2000 مشاهدة", "نمو مستمر", "خدمة مضمونة"],
    details: { type: "حسابات ذات مظهر حقيقي", delivery: "1-3 ساعات", batch: 1 },
    reviewCount: 168,
    stock: 47,
    variationGroups: [
      {
        id: "delivery",
        label: "الوتيرة",
        options: [
          { id: "natural", label: "طبيعي" },
          { id: "balanced", label: "متوازن" },
        ],
      },
    ],
  },
  {
    id: "شدات-ببجي",
    slug: "شدات-ببجي",
    title: "شحن شدات UC ببجي موبايل",
    category: "gaming",
    desc: "توصيل مباشر للمعرف ID، حزم وعروض حصرية، شحن آمن ومضمون، ودعم فني مستمر.",
    basePrice: 1000,
    originalPrice: 1700,
    image: "/assets/pubg-uc-v4.webp",
    rating: "5.0",
    outOfStock: true,
    features: ["توصيل مباشر للمعرف ID", "حزم وعروض حصرية", "شحن آمن", "دعم فني مستمر"],
    details: {
      type: "شحن",
      requiresId: true,
      requiresCountry: true,
      options: [
        { label: "60 شدة", price: 1000 },
        { label: "325 شدة", price: 3200 },
        { label: "660 شدة", price: 5800 },
      ],
    },
    reviewCount: 504,
    stock: 0,
  },
  {
    id: "جواهر-فري-فاير",
    slug: "جواهر-فري-فاير",
    title: "شحن مجوهرات فري فاير",
    category: "gaming",
    desc: "توصيل مباشر للمعرف ID، حزم وعروض حصرية، شحن آمن ومضمون، ودعم مستمر.",
    basePrice: 800,
    originalPrice: 1350,
    image: "/assets/freefire-diamonds-v4.webp",
    rating: "5.0",
    outOfStock: true,
    features: ["توصيل مباشر للمعرف ID", "حزم وعروض حصرية", "شحن آمن", "دعم مستمر"],
    details: {
      type: "شحن",
      requiresId: true,
      requiresCountry: true,
      options: [
        { label: "100 جوهرة", price: 800 },
        { label: "520 جوهرة", price: 3200 },
        { label: "1060 جوهرة", price: 6000 },
      ],
    },
    reviewCount: 391,
    stock: 0,
  },
];

export const productById = new Map(products.map((product) => [product.id, product]));
export const productBySlug = new Map(products.map((product) => [product.slug, product]));
export const featuredProducts = products.filter((product) => product.featured);

export function getProductById(id: string | null | undefined) {
  return id ? productById.get(id) || null : null;
}

export function getProductBySlug(slug: string | null | undefined) {
  return slug ? productBySlug.get(slug) || null : null;
}

export function getProductBySlugOrId(value: string | null | undefined) {
  return getProductBySlug(value) || getProductById(value);
}

export function getCategoryLabel(category: Category) {
  switch (category) {
    case "ai":
      return "الذكاء الاصطناعي";
    case "web":
      return "تطوير المواقع";
    case "social":
      return "وسائل التواصل";
    case "gaming":
      return "ألعاب الفيديو";
    default:
      return category;
  }
}
