import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart, ShieldCheck, HeadphonesIcon, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { products } from "../data/products";
import { useCart } from "../lib/CartContext";

export function ProductDetails() {
  const { id } = useParams();
  const safeId = id ? decodeURIComponent(id) : '';
  const product = products.find(p => p.id === safeId || p.id === id) || products[0]; // Fallback if not found
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.title, price: product.basePrice, qty: 1, image: product.image });
  };

  const handleBuyNow = () => {
    addToCart({ id: product.id, title: product.title, price: product.basePrice, qty: 1, image: product.image });
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowRight className="ml-2 h-4 w-4" />
        العودة للمتجر
      </Link>

      <div className="perf-panel grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative rounded-2xl overflow-hidden aspect-square bg-background/50 border border-white/5 shadow-inner z-10">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 w-fit border border-primary/20 shadow-[0_0_10px_rgba(255,0,122,0.1)]">
            {product.category === 'ai' ? 'الذكاء الاصطناعي' : 
             product.category === 'web' ? 'تطوير المواقع' :
             product.category === 'social' ? 'التواصل الاجتماعي' :
             product.category === 'gaming' ? 'ألعاب الفيديو' : product.category}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-4 font-heading">{product.title}</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-sans">
            {product.desc}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-black mb-4 font-heading">مميزات الخدمة</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground font-sans">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 drop-shadow-[0_0_5px_rgba(0,230,118,0.5)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="perf-card flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-white/5 backdrop-blur-sm">
              <Zap className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(255,0,122,0.5)]" />
              <div>
                <strong className="block text-sm font-heading">بدء سريع</strong>
                <span className="text-xs text-muted-foreground font-sans">تنفيذ فوري للطلب</span>
              </div>
            </div>
            <div className="perf-card flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-white/5 backdrop-blur-sm">
              <ShieldCheck className="h-6 w-6 text-secondary drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
              <div>
                <strong className="block text-sm font-heading">دفع آمن</strong>
                <span className="text-xs text-muted-foreground font-sans">بوابات موثوقة</span>
              </div>
            </div>
            <div className="perf-card flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-white/5 backdrop-blur-sm">
              <HeadphonesIcon className="h-6 w-6 text-success drop-shadow-[0_0_8px_rgba(0,230,118,0.5)]" />
              <div>
                <strong className="block text-sm font-heading">دعم 24/7</strong>
                <span className="text-xs text-muted-foreground font-sans">متابعة مستمرة</span>
              </div>
            </div>
          </div>

          <div className="perf-card mt-auto bg-background/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="block text-sm text-muted-foreground font-bold mb-1 font-sans">السعر الإجمالي</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through mr-2 font-sans">{product.originalPrice} ج.س</span>
                )}
              </div>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-heading">
                {product.basePrice} ج.س
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} size="lg" variant="outline" className="flex-1 h-14 text-lg rounded-xl border-white/10 hover:bg-white/5 backdrop-blur-md hover:text-primary transition-all" disabled={product.outOfStock}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                أضف للسلة
              </Button>
              <Button onClick={handleBuyNow} size="lg" className="flex-1 h-14 text-lg rounded-xl shadow-[0_0_20px_rgba(255,0,122,0.4)] hover:shadow-[0_0_30px_rgba(255,0,122,0.6)] transition-all" disabled={product.outOfStock}>
                <Zap className="mr-2 h-5 w-5" />
                {product.outOfStock ? 'غير متوفر' : 'اطلب الآن'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
