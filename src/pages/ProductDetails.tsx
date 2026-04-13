import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart, ShieldCheck, HeadphonesIcon, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { getCategoryLabel, getProductBySlugOrId, type ProductVariationGroup } from "../data/products";
import { useCart, type CartVariationSelection } from "../lib/CartContext";

function buildVariationDefaults(groups: ProductVariationGroup[]) {
  return Object.fromEntries(
    groups.map((group) => [group.id, group.options[0]?.id || group.options[0]?.label || ""]),
  );
}

export function ProductDetails() {
  const { id } = useParams();
  const product = getProductBySlugOrId(id);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [targetLink, setTargetLink] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [server, setServer] = useState("global");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [requirements, setRequirements] = useState("");
  const [referenceLink, setReferenceLink] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!product) return;

    setQuantity(1);
    setSelectedPackageIndex(0);
    setTargetLink("");
    setPlayerId("");
    setServer("global");
    setRecipientPhone("");
    setRequirements("");
    setReferenceLink("");
    setFeedback("");
    setSelectedVariations(buildVariationDefaults(product.variationGroups || []));
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-black mb-4 font-heading">المنتج غير موجود</h1>
        <p className="text-muted-foreground mb-8">الرابط المطلوب غير مطابق لأي خدمة حالية داخل المتجر.</p>
        <Button render={<Link to="/products" />}>العودة إلى المتجر</Button>
      </div>
    );
  }

  const packageOptions = product.details.options || [];
  const selectedPackage = packageOptions[selectedPackageIndex] || null;
  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const unitPrice = selectedPackage?.price ?? product.basePrice;
  const totalPrice = unitPrice * safeQuantity;

  function setVariation(groupId: string, value: string) {
    setSelectedVariations((currentValue) => ({ ...currentValue, [groupId]: value }));
  }

  function collectVariationSelections() {
    return (product.variationGroups || [])
      .map<CartVariationSelection | null>((group) => {
        const selectedValue = selectedVariations[group.id] || group.options[0]?.id || group.options[0]?.label;
        const option = group.options.find((entry) => (entry.id || entry.label) === selectedValue) || group.options[0];
        if (!option) return null;

        return {
          groupId: group.id,
          groupLabel: group.label,
          optionId: option.id,
          optionLabel: option.label,
        };
      })
      .filter((entry): entry is CartVariationSelection => entry !== null);
  }

  function validateBeforeCart() {
    if (product.category === "social" && !targetLink.trim()) {
      return "أدخل رابط الحساب أو اسم المستخدم قبل المتابعة.";
    }

    if (product.category === "gaming" && product.details.requiresId && !playerId.trim()) {
      return "أدخل رقم اللاعب (الآيدي) قبل المتابعة.";
    }

    if (product.category === "ai" && !recipientPhone.trim()) {
      return "أدخل رقم المستلم أو رقم التواصل قبل المتابعة.";
    }

    if (product.category === "web" && !requirements.trim()) {
      return "اشرح متطلباتك باختصار قبل إضافة الخدمة إلى السلة.";
    }

    return "";
  }

  function createCartItem() {
    const validationError = validateBeforeCart();
    if (validationError) {
      setFeedback(validationError);
      return false;
    }

    addItem({
      productId: product.id,
      productSlug: product.slug,
      title: product.title,
      category: product.category,
      image: product.image,
      qty: safeQuantity,
      unitPrice,
      customData: {
        packageLabel: selectedPackage?.label,
        targetLink: targetLink.trim() || undefined,
        playerId: playerId.trim() || undefined,
        server: product.category === "gaming" ? server : undefined,
        recipientPhone: recipientPhone.trim() || undefined,
        requirements: requirements.trim() || undefined,
        referenceLink: referenceLink.trim() || undefined,
        variations: collectVariationSelections(),
      },
    });

    setFeedback("تمت إضافة الخدمة إلى السلة بنجاح.");
    return true;
  }

  function handleAddToCart() {
    void createCartItem();
  }

  function handleBuyNow() {
    if (!createCartItem()) return;
    navigate("/cart");
  }

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
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="flex flex-col z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 w-fit border border-primary/20 shadow-[0_0_10px_rgba(255,0,122,0.1)]">
            {getCategoryLabel(product.category)}
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-4 font-heading">{product.title}</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-sans">{product.desc}</p>

          <div className="mb-8 space-y-4">
            {packageOptions.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">اختر الباقة</label>
                <select value={selectedPackageIndex} onChange={(event) => setSelectedPackageIndex(Number(event.target.value))} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none backdrop-blur-sm font-sans">
                  {packageOptions.map((option, index) => (
                    <option key={option.label} value={index} className="bg-background">
                      {option.label} - {option.price.toLocaleString()} ج.س
                    </option>
                  ))}
                </select>
              </div>
            )}

            {(product.variationGroups || []).map((group) => (
              <div key={group.id} className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">{group.label}</label>
                <select value={selectedVariations[group.id] || group.options[0]?.id || group.options[0]?.label} onChange={(event) => setVariation(group.id, event.target.value)} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none backdrop-blur-sm font-sans">
                  {group.options.map((option) => (
                    <option key={option.id || option.label} value={option.id || option.label} className="bg-background">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {product.category === "social" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-sans">رابط الحساب أو اسم المستخدم</label>
                  <input data-testid="product-target-link" type="text" value={targetLink} onChange={(event) => setTargetLink(event.target.value)} placeholder="https://... أو @username" className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-sans">الكمية</label>
                  <input data-testid="product-quantity-input" type="number" min={1} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" />
                </div>
              </>
            )}

            {product.category === "gaming" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-sans">السيرفر أو الدولة</label>
                  <select value={server} onChange={(event) => setServer(event.target.value)} className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none backdrop-blur-sm font-sans">
                    <option value="global" className="bg-background">عالمي</option>
                    <option value="mena" className="bg-background">الشرق الأوسط</option>
                    <option value="asia" className="bg-background">آسيا</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-sans">رقم اللاعب (الآيدي)</label>
                  <input type="text" value={playerId} onChange={(event) => setPlayerId(event.target.value)} placeholder="مثال: 512345678" className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" />
                </div>
              </>
            )}

            {product.category === "ai" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">رقم المستلم أو التواصل</label>
                <input data-testid="product-recipient-phone" type="tel" value={recipientPhone} onChange={(event) => setRecipientPhone(event.target.value.replace(/[^\d+]/g, ""))} placeholder="مثال: 249..." className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" />
              </div>
            )}

            {product.category === "web" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-sans">وصف الخدمة أو المتطلبات</label>
                  <textarea rows={4} value={requirements} onChange={(event) => setRequirements(event.target.value)} placeholder="اشرح ما تحتاجه بالتفصيل..." className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none backdrop-blur-sm font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-sans">رابط مرجعي (اختياري)</label>
                  <input type="url" value={referenceLink} onChange={(event) => setReferenceLink(event.target.value)} placeholder="https://..." className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" />
                </div>
              </>
            )}
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-black mb-4 font-heading">مميزات الخدمة</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={`${feature}-${index}`} className="flex items-center gap-2 text-muted-foreground font-sans">
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
                  <span className="text-sm text-muted-foreground line-through mr-2 font-sans">{product.originalPrice.toLocaleString()} ج.س</span>
                )}
              </div>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-heading">
                {totalPrice.toLocaleString()} ج.س
              </div>
            </div>

            {feedback && (
              <div data-testid="product-feedback" className={`mb-4 rounded-xl px-4 py-3 text-sm ${feedback.includes("تمت") ? "border border-success/20 bg-green-500/10 text-green-400" : "border border-destructive/20 bg-destructive/10 text-destructive"}`}>
                {feedback}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button data-testid="add-to-cart-button" onClick={handleAddToCart} size="lg" variant="outline" className="flex-1 h-14 text-lg rounded-xl border-white/10 hover:bg-white/5 backdrop-blur-md hover:text-primary transition-all" disabled={product.outOfStock}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                أضف للسلة
              </Button>
              <Button data-testid="buy-now-button" onClick={handleBuyNow} size="lg" className="flex-1 h-14 text-lg rounded-xl shadow-[0_0_20px_rgba(255,0,122,0.4)] hover:shadow-[0_0_30px_rgba(255,0,122,0.6)] transition-all" disabled={product.outOfStock}>
                <Zap className="mr-2 h-5 w-5" />
                {product.outOfStock ? "غير متوفر" : "اطلب الآن"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
