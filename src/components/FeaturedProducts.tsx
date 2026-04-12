import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const categoryMap: Record<string, { label: string; color: string }> = {
  ai: { label: "الذكاء الاصطناعي", color: "#8b5cf6" },
  web: { label: "تطوير ويب", color: "#10b981" },
  social: { label: "تواصل اجتماعي", color: "#e11d48" },
  gaming: { label: "ألعاب الفيديو", color: "#3b82f6" },
};

const reviewCounts = [221, 198, 16, 31];

export function FeaturedProducts() {
  const featuredIds = ["إنشاء-متاجر-إلكترونية", "شات-جي-بي-تي-بلس", "متابعين-إنستغرام", "متابعين-تيك-توك"];
  const featured = featuredIds.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldRenderCards, setShouldRenderCards] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setShouldRenderCards(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[50px] md:blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-bold mb-6 backdrop-blur-md">الأكثر طلباً</span>
          <h2 className="text-3xl md:text-5xl font-black font-headline mb-4 text-on-background">منتجات مميزة</h2>
          <p className="text-base md:text-lg text-outline font-medium max-w-md mx-auto">اكتشف أكثر الخدمات طلباً لدينا</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {shouldRenderCards
            ? featured.map((product, index) => {
            const cat = categoryMap[product.category] || { label: product.category, color: "#d0bcff" };
            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group relative rounded-[1.5rem] overflow-hidden border border-outline-variant/10 bg-surface-container-low/80 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-[0_20px_50px_rgba(208,188,255,0.08)] flex flex-col hover:-translate-y-2"
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: `${cat.color}15` }}></div>

                {/* Image */}
                <div className="relative w-full overflow-hidden bg-[#0c0a10]" style={{ aspectRatio: '4/3' }}>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0a10] to-transparent z-10 pointer-events-none"></div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    referrerPolicy="no-referrer"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 flex items-center gap-1">
                      <span className="text-[#fbbf24] text-xs">★</span>
                      <span className="text-white text-xs font-bold">{product.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 text-right" dir="rtl">
                  {/* Category + Reviews */}
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full border"
                      style={{
                        color: cat.color,
                        borderColor: `${cat.color}30`,
                        backgroundColor: `${cat.color}10`,
                      }}
                    >
                      {cat.label}
                    </span>
                    <span className="text-outline/60 text-xs font-medium">{reviewCounts[index]} تقييم</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] md:text-base font-black text-on-surface mb-2.5 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-outline leading-relaxed line-clamp-2 mb-4">
                    {product.desc}
                  </p>

                  {/* Price + CTA */}
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-outline-variant/10">
                    <span className="text-primary font-black text-lg">{product.basePrice.toLocaleString()} <span className="text-xs font-medium text-outline">ج.س</span></span>
                    <span className="text-xs font-bold text-primary/70 group-hover:text-primary transition-colors flex items-center gap-1">
                      تفاصيل
                      <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
            : featured.map((product) => (
                <div
                  key={product.id}
                  aria-hidden="true"
                  className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low/70 min-h-[360px]"
                />
              ))}
        </div>
      </div>
    </section>
  );
}
