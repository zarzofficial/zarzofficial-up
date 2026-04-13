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
  const featured = featuredIds.map((id) => products.find((product) => product.id === id)).filter(Boolean) as typeof products;

  return (
    <section className="relative overflow-hidden bg-background px-6 py-20 md:px-12 md:py-28">
      <div className="pointer-events-none absolute top-0 right-1/4 h-[260px] w-[260px] rounded-full bg-primary/5 blur-[36px] md:h-[500px] md:w-[500px] md:blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[220px] w-[220px] rounded-full bg-tertiary/5 blur-[32px] md:h-[400px] md:w-[400px] md:blur-[100px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-primary sm:backdrop-blur-md">
            الأكثر طلباً
          </span>
          <h2 className="mb-4 font-headline text-3xl font-black text-on-background md:text-5xl">منتجات مميزة</h2>
          <p className="mx-auto max-w-md text-base font-medium text-outline md:text-lg">اكتشف أكثر الخدمات طلباً لدينا</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {featured.map((product, index) => {
            const category = categoryMap[product.category] || { label: product.category, color: "#d0bcff" };

            return (
      <Link
        to={`/products/${product.id}`}
        className="perf-card group relative flex min-h-[390px] flex-col overflow-hidden rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low/80 shadow-sm md:shadow-lg md:transition-transform md:duration-300 md:hover:-translate-y-1 md:hover:border-primary/30 md:hover:shadow-[0_18px_40px_rgba(208,188,255,0.08)]"
      >
        <div
          className="pointer-events-none absolute -top-10 -right-10 hidden h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 md:block md:group-hover:opacity-100"
          style={{ backgroundColor: `${category.color}15` }}
        ></div>

        <div className="relative h-56 w-full overflow-hidden bg-[#0c0a10] md:h-60">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#0c0a10] to-transparent"></div>
          <img
            src={product.image}
            alt={product.title}
            className={`h-full w-full object-cover transition-transform duration-300 md:group-hover:scale-[1.03] ${product.outOfStock ? 'opacity-40 grayscale sepia-[.3]' : ''}`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            referrerPolicy="no-referrer"
          />
          {product.outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <span className="bg-[#fc1f40] text-white font-black px-5 py-2.5 rounded-full border border-white/20 sm:backdrop-blur-md shadow-2xl transform shadow-red-500/20 md:scale-110">
                نفدت الكمية
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3 z-20">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 sm:backdrop-blur-sm">
              <span className="text-xs text-[#fbbf24]">★</span>
              <span className="text-xs font-bold text-white">{product.rating}</span>
            </div>
          </div>
          {/* Discount Badge top right for featured products if we want, or bottom left. We put it top-right here since top-left is rating */}
          {!product.outOfStock && product.originalPrice && product.originalPrice > product.basePrice && (
            <div className="absolute top-3 right-3 z-20 flex justify-end w-full pr-3">
              <span className="rounded-full bg-[#ff3b30] px-3 py-1 text-xs font-bold tracking-wider text-white shadow-sm">
                -{Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100)}%
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 text-right" dir="rtl">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="rounded-full border px-3 py-1 text-xs font-bold"
              style={{
                color: category.color,
                borderColor: `${category.color}30`,
                backgroundColor: `${category.color}10`,
              }}
            >
              {category.label}
            </span>
            <span className="text-xs font-medium text-outline/60">{reviewCounts[index]} تقييم</span>
          </div>

          <h3 className="mb-2.5 line-clamp-2 text-[15px] font-black leading-snug text-on-surface transition-colors md:text-base md:group-hover:text-primary">
            {product.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-outline">{product.desc}</p>

          <div className="mt-auto flex items-center justify-between border-t border-outline-variant/10 pt-3">
            <div className="flex flex-col text-right">
              {product.outOfStock && (product.id === "شدات-ببجي" || product.id === "جواهر-فري-فاير") ? (
                <span className="text-xl font-bold text-outline">غير متوفر حالياً</span>
              ) : (
                <>
                  <span className={`text-lg md:text-xl font-black ${product.outOfStock ? 'text-outline/40 line-through' : 'text-primary'}`}>
                    {product.basePrice.toLocaleString()} <span className="text-xs font-medium text-outline">ج.س</span>
                  </span>
                  {!product.outOfStock && product.originalPrice && product.originalPrice > product.basePrice && (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-outline/60 line-through">{product.originalPrice.toLocaleString()}</span>
                    </div>
                  )}
                </>
              )}
            </div>
            
            <span className="flex items-center gap-1 text-xs font-bold text-primary/70 transition-colors md:group-hover:text-primary mt-auto">
              تفاصيل
              <span className="material-symbols-outlined text-sm transition-transform md:group-hover:-translate-x-1">arrow_back</span>
            </span>
          </div>
        </div>
      </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
