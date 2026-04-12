import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { products, Category } from "../data/products";
import { useCart } from "../lib/CartContext";

export function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialCategory = (searchParams.get("category") as Category | 'all') || 'all';
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const categoryQuery = searchParams.get("category") as Category | 'all';
    if (categoryQuery && categoryQuery !== activeCategory) {
      setActiveCategory(categoryQuery);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId as any);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };
  const { addToCart } = useCart();

  const handleOrderNow = (product: any) => {
    addToCart({...product, qty: 1, price: product.basePrice});
    navigate('/cart');
  };

  const handleAddToCart = (product: any) => {
    addToCart({...product, qty: 1, price: product.basePrice});
    setToastMessage(`تم إضافة ${product.title} إلى السلة بنجاح`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'social', name: 'التواصل الاجتماعي' },
    { id: 'ai', name: 'الذكاء الاصطناعي' },
    { id: 'web', name: 'المواقع والمتاجر' },
    { id: 'gaming', name: 'الألعاب' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Group products by category to mimic the UI if "all" is selected
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  const getCategoryName = (cat: string) => categories.find(c => c.id === cat)?.name || cat;

  return (
    <div className="pt-24 animate-in fade-in duration-700 bg-background text-on-background pb-24 min-h-screen">
      {/* Hero / Category Header */}
      <header className="pt-16 pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tight font-headline leading-tight">
              عالم من <br/>
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
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </header>

      {/* Product Filter / Categories Taps */}
      <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-16 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "primary-gradient text-on-primary shadow-lg shadow-primary/20"
                  : "bg-surface-container text-outline hover:text-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="px-6 md:px-12 max-w-screen-2xl mx-auto space-y-24">
        {Object.entries(groupedProducts).map(([catKey, catProducts]) => (
          <div key={catKey}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold font-headline border-r-4 border-primary pr-4">
                {getCategoryName(catKey)}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {catProducts.map((product) => (
                <div key={product.id} className="group bg-surface-container-low rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(86,0,202,0.15)] border border-outline-variant/10 flex flex-col">
                  <Link to={`/products/${product.id}`} className="block relative aspect-square w-full overflow-hidden bg-surface-container-highest">
                    <img 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={product.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
                    />
                    {/* Shadow overlay only at top & bottom for badges readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20 flex flex-col justify-between p-4 pointer-events-none">
                      <div className="flex justify-end w-full">
                        {product.originalPrice && (
                          <span className="bg-[#ff3b30] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg tracking-wider animate-pulse ml-auto" style={{ marginRight: 'auto', marginLeft: '0'}}>
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
                          onClick={() => handleOrderNow(product)}
                          className="flex-1 py-3 rounded-full primary-gradient text-[13px] sm:text-sm md:text-base font-bold text-on-primary hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-center"
                        >
                          اطلب الآن
                        </button>
                        <button 
                          disabled={product.outOfStock}
                          onClick={() => handleAddToCart(product)}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:scale-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-lg sm:text-xl">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-outline">
            لا توجد منتجات متاحة في هذا القسم حالياً.
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 font-bold max-w-sm w-[90%] md:w-auto">
          <span className="material-symbols-outlined">check_circle</span>
          <span className="text-sm md:text-base">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
