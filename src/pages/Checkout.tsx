import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";
import { db, collection, addDoc, Timestamp } from "../lib/firebase";

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.displayName || "");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate order number safely, similar to old logic
  const generateOrderNumber = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCheckout = async (method: "whatsapp" | "bankak", e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!items.length) return;
    
    setLoading(true);
    const orderNumber = generateOrderNumber();
    
    const payload = {
        orderNumber,
        userId: currentUser?.uid || "guest",
        userEmail: currentUser?.email || "",
        name,
        phone,
        paymentMethod: method,
        paymentMethodLabel: method === "whatsapp" ? "متابعة عبر واتساب" : "تحويل بنكك",
        paymentReference: "",
        total: `$${total.toFixed(2)}`,
        currency: "USD",
        status: "pending",
        items: items.map(i => ({ title: i.title, qty: i.qty, price: i.price, productId: i.id })),
        details: items.map(i => `${i.title} (${i.qty})`).join(', '),
        date: Timestamp.now(),
        quantity: items.reduce((sum, item) => sum + item.qty, 0)
    };

    try {
        await addDoc(collection(db, "orders"), payload);
        
        // Prepare whatsapp message
        let waMessage = `*طلب جديد #${orderNumber}*\n\n`;
        waMessage += `*الاسم:* ${name}\n`;
        waMessage += `*الرقم:* ${phone}\n`;
        waMessage += `*طريقة الدفع:* ${payload.paymentMethodLabel}\n\n`;
        waMessage += `*الطلبات:*\n`;
        items.forEach(item => {
           waMessage += `- ${item.title} (الكمية: ${item.qty})\n`;
        });
        waMessage += `\n*الإجمالي:* $${total.toFixed(2)}`;

        const phoneTarget = "249912345678"; // Dummy, can be overridden by user
        
        setSuccess(true);
        clearCart();
        
        setTimeout(() => {
           if (method === "whatsapp") {
               window.open(`https://wa.me/${phoneTarget}?text=${encodeURIComponent(waMessage)}`, "_blank");
           }
           navigate("/account");
        }, 3000);

    } catch (error) {
        console.error("Order submission failed: ", error);
        alert("فشل تقديم الطلب. يرجى المحاولة لاحقاً.");
    } finally {
        setLoading(false);
    }
  };

  if (success) {
      return (
         <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(37,211,102,0.5)]" />
            <h2 className="text-4xl font-black mb-4 font-heading">تم تسجيل الطلب بنجاح!</h2>
            <p className="text-lg text-muted-foreground mb-8">سيتم تحويلك الآن لمتابعة الطلب.</p>
         </div>
      );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <Link to="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 font-sans">
        <ArrowRight className="ml-2 h-4 w-4" />
        العودة للسلة
      </Link>

      {items.length === 0 ? (
          <div className="perf-panel text-center py-20 bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
             <h2 className="text-2xl font-black mb-4 font-heading">السلة فارغة</h2>
             <Link to="/products">
                 <Button>الذهاب للمتجر</Button>
             </Link>
          </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="perf-panel bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black mb-2 font-heading">إتمام <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">الطلب</span></h2>
            <p className="text-muted-foreground mb-8 font-sans">أرسل بياناتك الأساسية وسنكمل معك الطلب بسرعة عبر الواتساب أو الهاتف.</p>

            <form className="space-y-6" onSubmit={(e) => handleCheckout("whatsapp", e)}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">الاسم</label>
                <input value={name} onChange={e=>setName(e.target.value)} type="text" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">رقم الهاتف</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} type="tel" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">اختر طريقة الدفع</label>
                <select value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)} required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none backdrop-blur-sm font-sans">
                  <option value="" className="bg-background">اختر طريقة الدفع</option>
                  <option value="whatsapp" className="bg-background">متابعة عبر واتساب</option>
                  <option value="bankak" className="bg-background">تحويل بنكك</option>
                </select>
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <Button disabled={loading} type="submit" size="lg" className="w-full h-14 text-lg rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all font-sans">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {loading ? "جاري الإرسال..." : "إتمام الطلب عبر واتساب"}
                </Button>
                <Button disabled={loading} type="button" onClick={() => handleCheckout("bankak")} size="lg" variant="outline" className="w-full h-14 text-lg rounded-xl border-white/20 hover:border-secondary/50 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all font-sans">
                  <Phone className="mr-2 h-5 w-5" />
                  الدفع المباشر وحفظ الطلب
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="perf-panel bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] sticky top-24">
            <h3 className="text-xl font-black mb-6 font-heading">إجمالي الطلب</h3>
            <div className="flex justify-between items-center mb-4 font-sans">
              <span className="text-muted-foreground">العناصر ({items.reduce((s,i)=>s+i.qty,0)})</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center mb-6 font-sans">
              <span className="font-bold">المطلوب دفعه</span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-heading">${total.toFixed(2)}</span>
            </div>
            <div className="space-y-4 mb-4">
               {items.map(i => (
                 <div key={i.id} className="flex justify-between text-sm items-center border-b border-white/5 pb-2">
                    <span className="truncate max-w-[150px]">{i.title}</span>
                    <span className="text-muted-foreground">x{i.qty}</span>
                 </div>
               ))}
            </div>
            <p className="text-xs text-muted-foreground text-center font-sans mt-4">
              الدفع بعملة USD. سيتم تطبيق سعر الصرف الحالي.
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
