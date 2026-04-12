import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";

export function Cart() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [success, setSuccess] = useState(false);
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bankak' | 'cash'>('bankak');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

  const tax = 0;
  const finalTotal = total + tax;

  const isFormValid = 
    name.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    (paymentMethod === 'cash' || receiptNumber.length === 4);

  const handleCheckoutClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (items.length === 0 || !isFormValid) return;
    
    if (!currentUser) {
      setShowGuestPrompt(true);
      return;
    }
    
    finalizeOrder();
  };

  const finalizeOrder = () => {
    setShowGuestPrompt(false);
    if (paymentMethod === 'cash') {
      window.open("https://wa.me/201500007300", "_blank");
    }
    setSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  let currentStep = 1;
  const hasItems = items.length > 0;
  const hasValidDetails = name.trim() !== '' && email.trim() !== '' && phone.trim() !== '';
  if (hasItems && (name.length > 0 || email.length > 0 || phone.length > 0)) currentStep = 2;
  if (hasItems && hasValidDetails) currentStep = 3;

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen animate-in fade-in duration-700">
      
      {/* Stepper Indicator */}
      <div className="flex items-center justify-center mb-16 gap-2 sm:gap-4 rtl">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2 transition-all duration-500">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${currentStep >= 1 ? 'primary-gradient shadow-[0_0_20px_rgba(208,188,255,0.3)]' : 'bg-surface-container border border-outline-variant/30'}`}>
            <span className={`material-symbols-outlined ${currentStep >= 1 ? 'text-on-primary' : 'text-outline'}`} data-icon="shopping_basket">shopping_basket</span>
          </div>
          <span className={`text-xs font-bold transition-colors ${currentStep >= 1 ? 'text-primary' : 'text-outline'}`}>السلة</span>
        </div>
        
        {/* Divider 1 */}
        <div className={`w-10 sm:w-16 h-[2px] transition-colors duration-500 ${currentStep >= 2 ? 'bg-primary shadow-[0_0_10px_rgba(208,188,255,0.3)]' : 'bg-surface-container-highest'}`}></div>
        
        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2 transition-all duration-500">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${currentStep >= 2 ? 'primary-gradient shadow-[0_0_20px_rgba(208,188,255,0.3)]' : 'bg-surface-container border border-outline-variant/30'}`}>
            <span className={`material-symbols-outlined ${currentStep >= 2 ? 'text-on-primary' : 'text-outline'}`} data-icon="person">person</span>
          </div>
          <span className={`text-xs font-bold transition-colors ${currentStep >= 2 ? 'text-primary' : 'text-outline'}`}>التفاصيل</span>
        </div>
        
        {/* Divider 2 */}
        <div className={`w-10 sm:w-16 h-[2px] transition-colors duration-500 ${currentStep >= 3 ? 'bg-primary shadow-[0_0_10px_rgba(208,188,255,0.3)]' : 'bg-surface-container-highest'}`}></div>
        
        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2 transition-all duration-500">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${currentStep >= 3 ? 'primary-gradient shadow-[0_0_20px_rgba(208,188,255,0.3)]' : 'bg-surface-container border border-outline-variant/30'}`}>
            <span className={`material-symbols-outlined ${currentStep >= 3 ? 'text-on-primary' : 'text-outline'}`} data-icon="payments">payments</span>
          </div>
          <span className={`text-xs font-bold transition-colors ${currentStep >= 3 ? 'text-primary' : 'text-outline'}`}>الدفع</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Cart Items & Forms */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Cart Items */}
          <div className="bg-surface-container-low rounded-[1.5rem] sm:rounded-3xl p-5 sm:p-8 border border-outline-variant/5">
            <h2 className="text-xl sm:text-2xl font-bold font-headline mb-6 sm:mb-8 text-on-surface">مراجعة السلة</h2>
            
            {items.length === 0 ? (
              <div className="text-center py-10 text-outline">
                <span className="material-symbols-outlined text-5xl mb-4 block">remove_shopping_cart</span>
                <p>سلة المشتريات فارغة</p>
                <Link to="/products" className="text-primary mt-4 inline-block hover:underline">تصفح المنتجات</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6 group">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-[#13071A] p-1 flex items-center justify-center">
                        <img 
                          alt={item.title} 
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                          src={item.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564"}
                        />
                      </div>
                      <div className="flex-grow flex flex-col min-w-0">
                        <div className="flex justify-between items-start mb-2 gap-3 sm:gap-4">
                          <h3 className="text-base sm:text-lg font-bold text-on-surface line-clamp-2">{item.title}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-outline hover:text-error transition-colors shrink-0 pt-1">
                            <span className="material-symbols-outlined" data-icon="delete">delete</span>
                          </button>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 mt-1 sm:mt-2">
                          <span className="text-base sm:text-lg font-bold text-tertiary">{item.price * item.qty} ج.س</span>
                          <div className="flex items-center bg-surface-container rounded-full px-4 py-1 gap-4 shrink-0 shadow-sm border border-white/5">
                            <button onClick={() => updateQty(item.id, item.qty - 1)} className="text-primary hover:text-white">
                              <span className="material-symbols-outlined text-sm" data-icon="remove">remove</span>
                            </button>
                            <span className="text-sm font-bold w-4 text-center text-on-surface">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)} className="text-primary hover:text-white">
                              <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < items.length - 1 && <div className="h-[1px] bg-outline-variant/10 mt-6"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Customer Details */}
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/5">
            <h2 className="text-2xl font-bold font-headline mb-8 text-on-surface">تفاصيل العميل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-outline mr-2">الاسم الكامل</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="الاسم الثلاثي" 
                  className="w-full bg-surface-container-highest border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline/40" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-outline mr-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  dir="ltr" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com" 
                  className="w-full bg-surface-container-highest border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline/40 text-left" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-outline mr-2">رقم الجوال</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    dir="ltr" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="01XXXXXXXX او 09XXXXXXXX" 
                    className="w-full bg-surface-container-highest border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline/40 text-left" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Methods */}
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/5">
            <h2 className="text-2xl font-bold font-headline mb-8 text-on-surface">طريقة الدفع</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <label className="relative cursor-pointer group" onClick={() => setPaymentMethod('bankak')}>
                <input type="radio" name="payment" className="peer sr-only" checked={paymentMethod === 'bankak'} readOnly />
                <div className="flex flex-col items-center justify-center p-6 bg-surface-container rounded-3xl border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                  <span className="material-symbols-outlined text-4xl mb-2 text-outline peer-checked:text-primary transition-colors" data-icon="account_balance">account_balance</span>
                  <span className="text-sm font-bold text-on-surface">بنكك</span>
                </div>
              </label>
              <label className="relative cursor-pointer group" onClick={() => setPaymentMethod('cash')}>
                <input type="radio" name="payment" className="peer sr-only" checked={paymentMethod === 'cash'} readOnly />
                <div className="flex flex-col items-center justify-center p-6 bg-surface-container rounded-3xl border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                  <span className="material-symbols-outlined text-4xl mb-2 text-outline peer-checked:text-primary transition-colors" data-icon="payments">payments</span>
                  <span className="text-sm font-bold text-on-surface">كاش</span>
                </div>
              </label>
            </div>

            {paymentMethod === 'bankak' && (
               <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 space-y-4 animate-in fade-in slide-in-from-top-4">
                 <div className="flex items-center gap-3 text-primary mb-2">
                    <span className="material-symbols-outlined">info</span>
                    <h3 className="font-bold">بيانات حساب التحويل (بنكك)</h3>
                 </div>
                 <div className="bg-background rounded-xl p-4 text-sm space-y-2 border border-outline-variant/10">
                   <p><span className="text-outline">اسم الحساب:</span> <strong className="text-on-surface ml-2">محمد علي عبيدالله</strong></p>
                   <p><span className="text-outline">رقم الحساب:</span> <strong className="text-on-surface ml-2 text-lg">8725999</strong></p>
                 </div>
                 <p className="text-sm text-outline leading-relaxed border-t border-outline-variant/10 pt-4">
                    يرجى تحويل مبلغ <strong className="text-tertiary text-lg">{finalTotal.toFixed(2)} ج.س</strong> إلى الحساب المذكور أعلاه، ثم قم بكتابة آخر 4 أرقام من عملية التحويل أو الإشعار في الحقل أدناه لتأكيد طلبك.
                 </p>
                 <div className="pt-2">
                   <label className="text-sm font-bold text-on-surface mb-2 block">رقم الإشعار (آخر 4 أرقام)</label>
                   <input 
                     type="text" 
                     value={receiptNumber}
                     onChange={(e) => setReceiptNumber(e.target.value.replace(/\D/g, ''))}
                     placeholder="مثال: 4921" 
                     maxLength={4} 
                     className="w-full bg-surface-container-highest border border-primary/30 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline/40 text-center tracking-widest font-mono text-xl" 
                   />
                 </div>
               </div>
            )}

            {paymentMethod === 'cash' && (
               <div className="p-6 bg-[#3b82f6]/5 rounded-2xl border border-[#3b82f6]/20 space-y-4 animate-in fade-in slide-in-from-top-4">
                 <div className="flex items-center gap-3 text-[#3b82f6] mb-2">
                    <span className="material-symbols-outlined">support_agent</span>
                    <h3 className="font-bold">الدفع كاش (مباشر)</h3>
                 </div>
                 <p className="text-sm text-outline leading-relaxed">إتمام الطلب بالكاش يتطلب التواصل معنا مباشرة عبر تطبيق واتساب لترتيب عملية تسليم المبلغ وتأكيد الخدمة.</p>
                 <div className="bg-[#3b82f6]/10 p-3 rounded-xl border border-[#3b82f6]/20 mt-4 flex items-start gap-2">
                   <span className="material-symbols-outlined text-[#3b82f6] text-sm mt-0.5" data-icon="location_on">location_on</span>
                   <p className="text-xs text-on-surface font-medium leading-relaxed">تنويه: الدفع كاش يتوفر حالياً فقط في الولايات التالية: <strong className="text-[#3b82f6] font-bold">نهر النيل، بورسودان، الخرطوم</strong>.</p>
                 </div>
               </div>
            )}
          </div>

        </div>

        {/* Right Column: Summary Card */}
        <div className="lg:col-span-4">
          {/* Mobile Indicator for Order Summary */}
          <div className="flex justify-center -mt-2 mb-8 lg:hidden relative z-10 w-full animate-bounce">
            <div className="bg-primary/10 border border-primary/30 backdrop-blur-md rounded-full px-5 py-2.5 shadow-[0_10px_20px_rgba(208,188,255,0.15)] flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span className="text-sm font-bold tracking-wide">الخطوة الأخيرة: ملخص الطلب</span>
              <span className="material-symbols-outlined text-lg">keyboard_double_arrow_down</span>
            </div>
          </div>

          <div className="sticky top-32 space-y-6">
            <div className="bg-surface-container-high rounded-3xl p-8 border border-outline-variant/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <h3 className="text-xl font-bold font-headline mb-6 text-on-surface">ملخص الطلب</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-outline">
                  <span>المجموع الفرعي</span>
                  <span>{total.toFixed(2)} ج.س</span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>الشحن</span>
                  <span className="text-secondary">مجاني</span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>ضريبة القيمة المضافة (معفاة)</span>
                  <span className="text-secondary">مجاني</span>
                </div>
                <div className="h-[1px] bg-outline-variant/20 my-2"></div>
                <div className="flex justify-between items-center text-on-surface">
                  <span className="text-lg font-bold">الإجمالي</span>
                  <span className="text-2xl font-black text-tertiary">{finalTotal.toFixed(2)} ج.س</span>
                </div>
              </div>
              
              {paymentMethod === 'bankak' ? (
                <button 
                  onClick={handleCheckoutClick}
                  disabled={items.length === 0 || !isFormValid}
                  className="w-full mt-8 py-5 primary-gradient rounded-full text-on-primary font-bold text-lg shadow-[0_10px_30px_rgba(125,60,255,0.4)] hover:shadow-[0_15px_40px_rgba(125,60,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>تأكيد وشراء</span>
                  <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
                </button>
              ) : (
                <button 
                  onClick={handleCheckoutClick}
                  disabled={items.length === 0 || !isFormValid}
                  className={`w-full mt-8 py-4 bg-[#25D366] rounded-full text-white font-bold text-base md:text-lg shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 px-2 ${items.length === 0 || !isFormValid ? 'opacity-50 pointer-events-none cursor-not-allowed grayscale' : ''}`}
                >
                  <span className="whitespace-nowrap">التأكيد عبر واتساب</span>
                  <span className="material-symbols-outlined text-xl" data-icon="forum">forum</span>
                </button>
              )}
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-outline opacity-60">
                <span className="material-symbols-outlined text-sm" data-icon="lock">lock</span>
                <span>عملية دفع آمنة ومشفرة بالكامل</span>
              </div>
            </div>

            {/* Decorative Branding Element */}
            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">workspace_premium</span>
              </div>
              <div>
                <p className="text-sm font-bold text-primary">ضمان زارز الملكي</p>
                <p className="text-[10px] text-outline">سياسة تسليم فورية وشحن سريع</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest or Login Prompt Modal */}
      {showGuestPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in zoom-in duration-300 px-4">
          <div className="bg-surface-container rounded-[40px] p-8 md:p-12 max-w-lg w-full text-center border border-outline-variant/10 shadow-[0_32px_80px_rgba(86,0,202,0.4)] relative">
            <button onClick={() => setShowGuestPrompt(false)} className="absolute top-6 left-6 text-outline hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-primary">person_search</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-headline text-on-surface mb-3">هل أنت مسجل؟</h2>
            <p className="text-outline mb-10 text-sm md:text-base leading-relaxed">يمكنك تسجيل الدخول لحفظ طلبك في حسابك وكسب النقاط، أو المتابعة فوراً كزائر لإتمام الشراء.</p>
            
            <div className="flex flex-col gap-4">
              <Link to="/account" className="w-full py-4 primary-gradient rounded-full text-on-primary font-bold hover:shadow-[0_10px_30px_rgba(125,60,255,0.4)] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">login</span>
                تسجيل الدخول / إنشاء حساب
              </Link>
              <button 
                onClick={finalizeOrder}
                className="w-full py-4 bg-surface-container-highest rounded-full text-on-surface font-bold hover:bg-white/5 transition-all text-center border border-outline-variant/10"
              >
                المتابعة كزائر
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="bg-surface-container rounded-[40px] p-12 max-w-md w-full text-center border border-primary/20 shadow-[0_32px_80px_rgba(86,0,202,0.4)]">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
            </div>
            <h2 className="text-3xl font-black font-headline text-on-surface mb-4">تم الطلب بنجاح!</h2>
            <p className="text-outline mb-10 leading-relaxed">شكراً لاختيارك زارز. تم إرسال تفاصيل الفاتورة إلى بريدك الإلكتروني وسيتم تسليم الطلب خلال لحظات.</p>
            <Link to="/products" className="block w-full py-4 bg-surface-container-highest rounded-full text-primary font-bold hover:bg-white/5 transition-all text-center">
              العودة للتسوق
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
