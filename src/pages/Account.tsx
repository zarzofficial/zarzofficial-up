import React, { useState, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { User, RefreshCw, Package, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../lib/AuthContext";
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  googleProvider,
  signOut,
  updateProfile,
  db,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "../lib/firebase";

export function Account() {
  const { currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const ordersScrollRef = useRef<HTMLDivElement | null>(null);

  const fetchOrders = async () => {
    if (!currentUser) return;
    setLoadingOrders(true);
    try {
      const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const fetchedOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(fetchedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      // Fallback query if index is building
      try {
        const fallbackQ = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
        const fallbackSnapshot = await getDocs(fallbackQ);
        const fetchedOrders = fallbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort manually
        fetchedOrders.sort((a: any, b: any) => {
          const dateA = a.date?.toDate?.() || new Date(a.date);
          const dateB = b.date?.toDate?.() || new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
        setOrders(fetchedOrders);
      } catch (e) {
         console.error("Fallback failed", e);
      }
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const orderVirtualizer = useVirtualizer({
    count: orders.length,
    getScrollElement: () => ordersScrollRef.current,
    estimateSize: () => 92,
    overscan: 5,
    getItemKey: (index) => orders[index]?.id ?? index,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          throw new Error("كلمات المرور غير متطابقة.");
        }
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) {
          await updateProfile(credential.user, { displayName: name.trim() });
        }
        // User record syncing can happen via cloud functions or implicitly relying on Firebase Auth
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ أثناء المصادقة.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError("تعذر تسجيل الدخول بواسطة Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (currentUser) {
    return (
      <div className="container mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-20 relative min-h-screen overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/50">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-black mb-2 font-heading">مرحباً، {currentUser.displayName || "مستخدم"}</h2>
              <p className="text-muted-foreground font-sans">{currentUser.email}</p>
            </div>
            
            <div className="pt-4 space-y-4">
              <Button onClick={handleSignOut} variant="outline" className="w-full h-12 text-lg rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/50 font-sans">
                <LogOut className="mr-2 h-5 w-5 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col max-h-[500px]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-black font-heading">الطلبات <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">الأخيرة</span></h2>
              <button disabled={loadingOrders} onClick={fetchOrders}>
                <RefreshCw className={`h-6 w-6 text-primary drop-shadow-[0_0_5px_rgba(255,0,122,0.5)] ${loadingOrders ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div ref={ordersScrollRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {orders.length === 0 ? (
                 <div className="flex flex-col items-center justify-center text-center py-12 m-auto">
                    <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                    <p className="text-lg text-muted-foreground mb-6 font-sans">لا توجد طلبات حديثة.</p>
                 </div>
              ) : (
                 <div className="relative w-full" style={{ height: `${orderVirtualizer.getTotalSize()}px` }}>
                   {orderVirtualizer.getVirtualItems().map((virtualOrder) => {
                     const order = orders[virtualOrder.index];

                     if (!order) return null;

                     return (
                       <div
                         key={order.id}
                         ref={orderVirtualizer.measureElement}
                         data-index={virtualOrder.index}
                         className="absolute left-0 top-0 w-full pb-4"
                         style={{ transform: `translateY(${virtualOrder.start}px)` }}
                       >
                         <div className="bg-background/40 border border-white/5 p-4 rounded-xl flex justify-between items-center hover:border-primary/30 transition-all">
                           <div>
                             <p className="font-bold text-sm">طلب #{order.orderNumber || order.id.slice(0,6)}</p>
                             <p className="text-xs text-muted-foreground">{new Date(order.date?.toDate?.() || order.date).toLocaleDateString('ar-EG')}</p>
                           </div>
                           <div className="text-left">
                             <p className="font-bold text-primary">{order.total}</p>
                             <p className="text-xs px-2 py-1 bg-white/5 rounded-full mt-1 border border-white/10">{order.status === 'pending' ? 'جاري المعالجة' : order.status}</p>
                           </div>
                         </div>
                       </div>
                     );
                   })}
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-20 relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black mb-2 font-heading">{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}</h2>
            <p className="text-muted-foreground font-sans">أدخل بياناتك للمتابعة</p>
          </div>

          <div className="flex bg-background/50 p-1 rounded-full mb-8 border border-white/5 backdrop-blur-sm">
            <button 
              type="button"
              onClick={() => { setIsLogin(true); setError("")} }
              className={`flex-1 py-2 px-4 rounded-full text-sm font-bold transition-all font-sans ${isLogin ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,0,122,0.3)]' : 'text-muted-foreground hover:text-foreground'}`}
            >
              تسجيل الدخول
            </button>
            <button 
              type="button"
              onClick={() => { setIsLogin(false); setError("")} }
              className={`flex-1 py-2 px-4 rounded-full text-sm font-bold transition-all font-sans ${!isLogin ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,0,122,0.3)]' : 'text-muted-foreground hover:text-foreground'}`}
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-destructive font-bold text-sm text-center">{error}</div>}

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">الاسم الكامل</label>
                <input value={name} onChange={e=>setName(e.target.value)} type="text" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" placeholder="مثال: محمد أحمد" />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground font-sans">البريد الإلكتروني</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground font-sans">كلمة المرور</label>
              <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" placeholder="6 أحرف أو أكثر" />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">تأكيد كلمة المرور</label>
                <input value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type="password" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" placeholder="أعد إدخال كلمة المرور" />
              </div>
            )}

            <div className="pt-4 space-y-4">
              <Button disabled={loading} type="submit" className="w-full h-12 text-lg rounded-xl shadow-[0_0_15px_rgba(255,0,122,0.3)] hover:shadow-[0_0_25px_rgba(255,0,122,0.5)] font-sans">
                {loading ? 'جاري التحميل...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
              </Button>
              
              <Button disabled={loading} onClick={handleGoogleLogin} type="button" variant="outline" className="w-full h-12 text-lg rounded-xl border-white/20 hover:border-secondary/50 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] font-sans">
                الدخول عبر Google
              </Button>
              
              {isLogin && (
                <Button type="button" variant="ghost" className="w-full text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_5px_rgba(255,0,122,0.5)] font-sans">
                  نسيت كلمة المرور؟
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center text-center">
            <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-xl font-bold mb-2">تتبع طلباتك</h2>
            <p className="text-muted-foreground">قم بتسجيل الدخول لمعرفة حالة طلباتك ورؤية المشتريات السابقة.</p>
        </div>

      </div>
    </div>
  );
}
