import { useEffect, useLayoutEffect, useMemo, useRef, useState, type Attributes } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { products, Category, type Product } from "../data/products";
import { useCart } from "../lib/CartContext";

const categories = [
  { id: "all", name: "الكل" },
  { id: "social", name: "التواصل الاجتماعي" },
  { id: "ai", name: "الذكاء الاصطناعي" },
  { id: "web", name: "المواقع والمتاجر" },
  { id: "gaming", name: "الألعاب" },
] as const;

type VisibleCategory = Category | "all";

type VirtualStoreItem =
  | {
      key: string;
      kind: "header";
      title: string;
      withTopSpacing: boolean;
    }
  | {
      key: string;
      kind: "row";
      products: Product[];
      isLastRow: boolean;
    };

type StoreViewportMetrics = {
  cardHeight: number;
  imageHeight: number;
  rowGap: number;
  rowHeight: number;
  overscan: number;
  headerHeight: number;
  spacedHeaderHeight: number;
  reduceEffects: boolean;
};

const viewportMetricsByColumns: Record<1 | 2 | 3 | 4, StoreViewportMetrics> = {
  1: {
    cardHeight: 548,
    imageHeight: 264,
    rowGap: 24,
    rowHeight: 572,
    overscan: 8,
    headerHeight: 88,
    spacedHeaderHeight: 184,
    reduceEffects: true,
  },
  2: {
    cardHeight: 516,
    imageHeight: 224,
    rowGap: 28,
    rowHeight: 544,
    overscan: 6,
    headerHeight: 88,
    spacedHeaderHeight: 184,
    reduceEffects: false,
  },
  3: {
    cardHeight: 484,
    imageHeight: 200,
    rowGap: 32,
    rowHeight: 516,
    overscan: 5,
    headerHeight: 88,
    spacedHeaderHeight: 184,
    reduceEffects: false,
  },
  4: {
    cardHeight: 468,
    imageHeight: 184,
    rowGap: 32,
    rowHeight: 500,
    overscan: 4,
    headerHeight: 88,
    spacedHeaderHeight: 184,
    reduceEffects: false,
  },
};

function getColumnCount(width: number) {
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function getViewportMetrics(columns: number) {
  if (columns >= 4) return viewportMetricsByColumns[4];
  if (columns === 3) return viewportMetricsByColumns[3];
  if (columns === 2) return viewportMetricsByColumns[2];
  return viewportMetricsByColumns[1];
}

function chunkProducts(items: Product[], chunkSize: number) {
  const chunks: Product[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

function getCategoryName(categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.name ?? categoryId;
}

function buildVirtualItems(groupedProducts: Record<string, Product[]>, columns: number) {
  const items: VirtualStoreItem[] = [];

  Object.entries(groupedProducts).forEach(([categoryId, categoryProducts], sectionIndex) => {
    items.push({
      key: `header-${categoryId}`,
      kind: "header",
      title: getCategoryName(categoryId),
      withTopSpacing: sectionIndex > 0,
    });

    const rows = chunkProducts(categoryProducts, columns);
    rows.forEach((rowProducts, rowIndex) => {
      items.push({
        key: `row-${categoryId}-${rowIndex}`,
        kind: "row",
        products: rowProducts,
        isLastRow: rowIndex === rows.length - 1,
      });
    });
  });

  return items;
}

function getVirtualItemSize(item: VirtualStoreItem | undefined, metrics: StoreViewportMetrics) {
  if (!item) return metrics.rowHeight;

  if (item.kind === "header") {
    return item.withTopSpacing ? metrics.spacedHeaderHeight : metrics.headerHeight;
  }

  return item.isLastRow ? metrics.cardHeight : metrics.rowHeight;
}

function StoreProductCard({
  product,
  onOrderNow,
  onAddToCart,
  metrics,
}: {
  product: Product;
  onOrderNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  metrics: StoreViewportMetrics;
} & Attributes) {
  return (
    <div
      className={`perf-card group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low ${
        metrics.reduceEffects
          ? "shadow-sm"
          : "shadow-md transition-transform duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_18px_38px_rgba(86,0,202,0.14)]"
      }`}
    >
      <Link
        to={`/products/${product.id}`}
        className="block relative w-full overflow-hidden bg-surface-container-highest"
        style={{ height: metrics.imageHeight }}
      >
        <img
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-300 md:group-hover:scale-[1.03] ${product.outOfStock ? 'opacity-40 grayscale sepia-[.3]' : ''}`}
          src={product.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20 flex flex-col justify-between p-4 pointer-events-none">
          <div className="flex justify-end w-full">
            {product.originalPrice && product.originalPrice > product.basePrice && !product.outOfStock && (
              <span
                className="ml-auto rounded-full bg-[#ff3b30] px-3 py-1 text-xs font-bold tracking-wider text-white shadow-sm"
                style={{ marginRight: "auto", marginLeft: "0" }}
              >
                -{Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
          <div className="mt-auto flex items-end">
            <span
              className={`rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-xs font-bold text-white ${
                metrics.reduceEffects ? "" : "sm:backdrop-blur-sm"
              }`}
            >
              {product.rating} ★
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-1 text-xl font-bold">{product.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-outline">{product.desc}</p>

        <div className="mt-auto flex flex-col gap-4 border-t border-outline-variant/10 pt-4">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col text-right">
              {product.outOfStock && (product.id === "شدات-ببجي" || product.id === "جواهر-فري-فاير") ? (
                <span className={`text-xl font-bold text-outline ${metrics.reduceEffects ? "" : "drop-shadow-sm"}`}>
                  غير متوفر حالياً
                </span>
              ) : (
                <>
                  <span className={`text-2xl font-bold ${product.outOfStock ? 'text-outline/40 line-through' : 'text-tertiary'} ${metrics.reduceEffects ? "" : "drop-shadow-sm"}`}>
                    {product.basePrice.toLocaleString()} ج.س
                  </span>
                  {product.originalPrice && product.originalPrice > product.basePrice && !product.outOfStock && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-outline/60 line-through">{product.originalPrice.toLocaleString()} ج.س</span>
                      <span className="text-[10px] font-bold text-[#ff3b30]">خصم حصري</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex w-full items-center gap-2 sm:gap-3">
            <button
              disabled={product.outOfStock}
              onClick={() => onOrderNow(product)}
              className="flex-1 rounded-full primary-gradient py-3 text-center text-[13px] font-bold text-on-primary shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:text-base md:hover:scale-[1.02]"
            >
              اطلب الآن
            </button>
            <button
              disabled={product.outOfStock}
              onClick={() => onAddToCart(product)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-highest text-primary shadow-sm transition-colors active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12 md:hover:bg-primary/10"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-lg sm:text-xl">
                add_shopping_cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialCategory = (searchParams.get("category") as VisibleCategory) || "all";
  const [activeCategory, setActiveCategory] = useState<VisibleCategory>(initialCategory);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [columns, setColumns] = useState(() => (typeof window === "undefined" ? 1 : getColumnCount(window.innerWidth)));
  const [scrollMargin, setScrollMargin] = useState(0);
  const toastTimeoutRef = useRef<number | undefined>(undefined);
  const listRef = useRef<HTMLElement | null>(null);
  const { addToCart } = useCart();

  const viewportMetrics = getViewportMetrics(columns);

  useEffect(() => {
    const handleResize = () => {
      const nextColumns = getColumnCount(window.innerWidth);
      setColumns((currentColumns) => (currentColumns === nextColumns ? currentColumns : nextColumns));
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const categoryQuery = searchParams.get("category") as VisibleCategory;
    if (categoryQuery && categoryQuery !== activeCategory) {
      setActiveCategory(categoryQuery);
    }
  }, [activeCategory, searchParams]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const filteredProducts = useMemo(
    () => (activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)),
    [activeCategory],
  );

  const groupedProducts = useMemo(
    () =>
      filteredProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {} as Record<string, Product[]>),
    [filteredProducts],
  );

  const virtualItems = useMemo(() => buildVirtualItems(groupedProducts, columns), [columns, groupedProducts]);

  useLayoutEffect(() => {
    const updateScrollMargin = () => {
      if (!listRef.current) return;
      setScrollMargin(listRef.current.getBoundingClientRect().top + window.scrollY);
    };

    updateScrollMargin();
    window.addEventListener("resize", updateScrollMargin, { passive: true });

    return () => window.removeEventListener("resize", updateScrollMargin);
  }, [activeCategory, columns, virtualItems.length]);

  const rowVirtualizer = useWindowVirtualizer({
    count: virtualItems.length,
    estimateSize: (index) => getVirtualItemSize(virtualItems[index], viewportMetrics),
    overscan: viewportMetrics.overscan,
    scrollMargin,
    getItemKey: (index) => virtualItems[index]?.key ?? index,
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId as VisibleCategory);
    if (categoryId === "all") {
      setSearchParams({});
      return;
    }
    setSearchParams({ category: categoryId });
  };

  const handleOrderNow = (product: Product) => {
    addToCart({ ...product, qty: 1, price: product.basePrice });
    navigate("/cart");
  };

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, qty: 1, price: product.basePrice });
    setToastMessage(`تم إضافة ${product.title} إلى السلة بنجاح`);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-24 text-on-background animate-in fade-in duration-700">
      <header className="mx-auto max-w-screen-2xl px-6 pb-16 pt-16 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="font-headline text-5xl font-black leading-tight tracking-tight text-primary md:text-6xl">
              عالم من <br />
              <span className="royal-gradient-text">التميز الرقمي</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-outline">
              اكتشف مجموعة واسعة من الخدمات المتميزة المصممة لتعزيز حضورك الرقمي، من الذكاء الاصطناعي إلى تطوير المواقع وأكثر.
            </p>
            <div className="flex gap-4">
              <div className="h-1 w-20 rounded-full bg-primary/80"></div>
              <div className="h-1 w-8 rounded-full bg-surface-container-highest"></div>
            </div>
          </div>
          <div className="relative hidden h-64 lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-outline-variant/10 bg-surface-container-low opacity-80">
              <img
                alt="digital abstract"
                className="h-full w-full object-cover mix-blend-screen"
                src={import.meta.env.BASE_URL + "store-header.png"}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-primary/10 blur-3xl"></div>
          </div>
        </div>
      </header>

      <section className="mx-auto mb-16 max-w-screen-2xl overflow-x-auto px-6 no-scrollbar md:px-12">
        <div className="flex gap-4 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`whitespace-nowrap rounded-full px-8 py-3 font-bold transition-colors ${
                activeCategory === category.id
                  ? "primary-gradient text-on-primary shadow-lg shadow-primary/20"
                  : "bg-surface-container text-outline hover:text-primary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <main ref={listRef} className="mx-auto max-w-screen-2xl px-6 md:px-12">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-outline">لا توجد منتجات متاحة في هذا القسم حالياً.</div>
        ) : (
          <div className="relative w-full" style={{ height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = virtualItems[virtualRow.index];

              if (!item) return null;

              const itemHeight = getVirtualItemSize(item, viewportMetrics);

              return (
                <div
                  key={item.key}
                  data-index={virtualRow.index}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: itemHeight,
                    transform: `translate3d(0, ${virtualRow.start - scrollMargin}px, 0)`,
                  }}
                >
                  {item.kind === "header" ? (
                    <div className="flex h-full items-end pb-8">
                      <div className="flex w-full items-center justify-between">
                        <h2 className="border-r-4 border-primary pr-4 font-headline text-3xl font-bold">{item.title}</h2>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col" style={{ paddingBottom: item.isLastRow ? 0 : viewportMetrics.rowGap }}>
                      <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
                        {item.products.map((product) => (
                          <StoreProductCard
                            key={product.id}
                            product={product}
                            onOrderNow={handleOrderNow}
                            onAddToCart={handleAddToCart}
                            metrics={viewportMetrics}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 z-[100] flex w-[90%] max-w-sm -translate-x-1/2 items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-bold text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] animate-in slide-in-from-bottom-5 fade-in duration-300 md:w-auto">
          <span aria-hidden="true" className="material-symbols-outlined">
            check_circle
          </span>
          <span className="text-sm md:text-base">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
