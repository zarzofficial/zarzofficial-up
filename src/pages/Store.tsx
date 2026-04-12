import { useEffect, useLayoutEffect, useMemo, useRef, useState, type Attributes } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { products, Category, type Product } from "../data/products";
import { useCart } from "../lib/CartContext";

const categories = [
  { id: "all", name: "الكل" },
  { id: "social", name: "التواصل الاجتماعي" },
  { id: "ai", name: "الذكاء الاصطناعي" },
  { id: "web", name: "المواقع والمتاجر" },
  { id: "gaming", name: "الألعاب" },
] as const;

const rowEstimateByColumns = {
  1: 620,
  2: 540,
  3: 500,
  4: 470,
} as const;

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

function getColumnCount(width: number) {
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
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

function StoreProductCard({
  product,
  onOrderNow,
  onAddToCart,
}: {
  product: Product;
  onOrderNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
} & Attributes) {
  return (
    <div className="group bg-surface-container-low rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(86,0,202,0.15)] border border-outline-variant/10 flex flex-col">
      <Link to={`/products/${product.id}`} className="block relative aspect-square w-full overflow-hidden bg-surface-container-highest">
        <img
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={product.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20 flex flex-col justify-between p-4 pointer-events-none">
          <div className="flex justify-end w-full">
            {product.originalPrice && (
              <span
                className="bg-[#ff3b30] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg tracking-wider ml-auto"
                style={{ marginRight: "auto", marginLeft: "0" }}
              >
                -40%
              </span>
            )}
          </div>
          <div className="flex items-end mt-auto">
            <span className="text-xs font-bold bg-black/50 text-white px-2 py-1 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
              {product.rating} ★
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold line-clamp-1 mb-2">{product.title}</h3>
        <p className="text-outline text-sm line-clamp-2 mb-4">{product.desc}</p>

        <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-outline-variant/10">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col text-right">
              <span className="text-2xl font-bold text-tertiary drop-shadow-sm">{product.basePrice} ج.س</span>
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-outline/60">{product.originalPrice} ج.س</span>
                  <span className="text-[10px] text-[#ff3b30] font-bold">خصم حصري</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full">
            <button
              disabled={product.outOfStock}
              onClick={() => onOrderNow(product)}
              className="flex-1 py-3 rounded-full primary-gradient text-[13px] sm:text-sm md:text-base font-bold text-on-primary hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-center"
            >
              اطلب الآن
            </button>
            <button
              disabled={product.outOfStock}
              onClick={() => onAddToCart(product)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:scale-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm"
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

  const rowEstimate = rowEstimateByColumns[columns as keyof typeof rowEstimateByColumns] ?? rowEstimateByColumns[1];

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
    estimateSize: (index) => (virtualItems[index]?.kind === "header" ? 96 : rowEstimate),
    overscan: 3,
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
    <div className="pt-24 animate-in fade-in duration-700 bg-background text-on-background pb-24 min-h-screen">
      <header className="pt-16 pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tight font-headline leading-tight">
              عالم من <br />
              <span className="royal-gradient-text">التميز الرقمي</span>
            </h1>
            <p className="text-lg text-outline max-w-lg leading-relaxed">
              اكتشف مجموعة واسعة من الخدمات المتميزة المصممة لتعزيز حضورك الرقمي، من الذكاء الاصطناعي إلى تطوير المواقع وأكثر.
            </p>
            <div className="flex gap-4">
              <div className="h-1 w-20 bg-primary/80 rounded-full"></div>
              <div className="h-1 w-8 bg-surface-container-highest rounded-full"></div>
            </div>
          </div>
          <div className="relative hidden lg:block h-64">
            <div className="absolute inset-0 bg-surface-container-low rounded-3xl overflow-hidden opacity-80 border border-outline-variant/10">
              <img
                alt="digital abstract"
                className="w-full h-full object-cover mix-blend-screen"
                src={import.meta.env.BASE_URL + "store-header.png"}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </header>

      <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-16 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
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

      <main ref={listRef} className="px-6 md:px-12 max-w-screen-2xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-outline">لا توجد منتجات متاحة في هذا القسم حالياً.</div>
        ) : (
          <div className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = virtualItems[virtualRow.index];

              if (!item) return null;

              return (
                <div
                  key={item.key}
                  ref={rowVirtualizer.measureElement}
                  data-index={virtualRow.index}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    transform: `translateY(${virtualRow.start - scrollMargin}px)`,
                  }}
                >
                  {item.kind === "header" ? (
                    <div className={item.withTopSpacing ? "pt-24 pb-8" : "pb-8"}>
                      <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold font-headline border-r-4 border-primary pr-4">{item.title}</h2>
                      </div>
                    </div>
                  ) : (
                    <div className={item.isLastRow ? "" : "pb-8"}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {item.products.map((product) => (
                          <StoreProductCard
                            key={product.id}
                            product={product}
                            onOrderNow={handleOrderNow}
                            onAddToCart={handleAddToCart}
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 font-bold max-w-sm w-[90%] md:w-auto">
          <span aria-hidden="true" className="material-symbols-outlined">
            check_circle
          </span>
          <span className="text-sm md:text-base">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
