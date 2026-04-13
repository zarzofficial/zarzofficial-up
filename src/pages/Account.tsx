import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Package, RefreshCw, Trash2, User } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "../components/ui/button";
import { useAuth } from "../lib/AuthContext";
import {
  deleteOrderForCurrentUser,
  loadOrdersForCurrentUser,
  registerWithEmail,
  sendPasswordReset,
  signInWithEmail,
  signInWithGoogleFlow,
  signOutUser,
} from "../lib/firebase";
import {
  CART_LOGIN_RETURN_KEY,
  formatOrderDate,
  getOrderStatusText,
  readGuestOrders,
  writeGuestOrders,
  type OrderRecord,
} from "../lib/order-utils";

export function Account() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const ordersScrollRef = useRef<HTMLDivElement | null>(null);

  async function fetchOrders() {
    setLoadingOrders(true);
    try {
      if (!currentUser) {
        setOrders(readGuestOrders());
        return;
      }
      setOrders(await loadOrdersForCurrentUser());
    } catch (error) {
      console.error(error);
      setFeedback(
        (error as Error & { userMessage?: string }).userMessage || "تعذر تحميل الطلبات الآن.",
      );
      setFeedbackType("error");
    } finally {
      setLoadingOrders(false);
    }
  }

  useEffect(() => {
    void fetchOrders();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || typeof window === "undefined") return;
    if (window.sessionStorage.getItem(CART_LOGIN_RETURN_KEY) !== "1") return;
    window.sessionStorage.removeItem(CART_LOGIN_RETURN_KEY);
    navigate("/cart");
  }, [currentUser, navigate]);

  const orderVirtualizer = useVirtualizer({
    count: orders.length,
    getScrollElement: () => ordersScrollRef.current,
    estimateSize: () => 108,
    overscan: 5,
    getItemKey: (index) => orders[index]?.id ?? index,
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      if (isLogin) {
        await signInWithEmail({ email, password });
        setFeedback("تم تسجيل الدخول بنجاح.");
      } else {
        if (password !== confirmPassword) {
          throw new Error("كلمتا المرور غير متطابقتين.");
        }
        await registerWithEmail({ name, email, password });
        setFeedback("تم إنشاء الحساب وتسجيل الدخول.");
      }
      setFeedbackType("success");
    } catch (error) {
      console.error(error);
      setFeedback(
        (error as Error & { userMessage?: string }).userMessage ||
          (error as Error).message ||
          "حدث خطأ أثناء المصادقة.",
      );
      setFeedbackType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setFeedback("");
    try {
      await signInWithGoogleFlow();
      setFeedback("تم تسجيل الدخول عبر Google.");
      setFeedbackType("success");
    } catch (error) {
      console.error(error);
      setFeedback(
        (error as Error & { userMessage?: string }).userMessage ||
          "تعذر تسجيل الدخول بواسطة Google.",
      );
      setFeedbackType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!email.trim()) {
      setFeedback("أدخل بريدك الإلكتروني أولًا ثم أعد المحاولة.");
      setFeedbackType("error");
      return;
    }

    setLoading(true);
    setFeedback("");
    try {
      await sendPasswordReset(email);
      setFeedback("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك.");
      setFeedbackType("success");
    } catch (error) {
      console.error(error);
      setFeedback(
        (error as Error & { userMessage?: string }).userMessage ||
          "تعذر إرسال رابط إعادة تعيين كلمة المرور.",
      );
      setFeedbackType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteOrder(order: OrderRecord) {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;

    try {
      if (order.remote && currentUser) {
        await deleteOrderForCurrentUser(order.id);
        setOrders((currentOrders) => currentOrders.filter((entry) => entry.id !== order.id));
      } else {
        const nextOrders = readGuestOrders().filter((entry) => entry.id !== order.id);
        writeGuestOrders(nextOrders);
        setOrders(nextOrders);
      }

      setFeedback("تم حذف الطلب بنجاح.");
      setFeedbackType("success");
    } catch (error) {
      console.error(error);
      setFeedback(
        (error as Error & { userMessage?: string }).userMessage || "تعذر حذف الطلب الآن.",
      );
      setFeedbackType("error");
    }
  }

  async function handleSignOut() {
    try {
      await signOutUser();
      setOrders(readGuestOrders());
      setFeedback("تم تسجيل الخروج بنجاح.");
      setFeedbackType("success");
    } catch (error) {
      console.error(error);
      setFeedback("تعذر تسجيل الخروج الآن.");
      setFeedbackType("error");
    }
  }

  if (currentUser) {
    return (
      <div className="container mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-20 relative min-h-screen overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="perf-panel bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/50">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-black mb-2 font-heading">
                مرحباً، {currentUser.displayName || "مستخدم"}
              </h2>
              <p className="text-muted-foreground font-sans">{currentUser.email}</p>
            </div>

            {feedback && (
              <div
                className={`mb-4 rounded-xl px-4 py-3 text-sm ${
                  feedbackType === "error"
                    ? "border border-destructive/20 bg-destructive/10 text-destructive"
                    : "border border-success/20 bg-green-500/10 text-green-400"
                }`}
              >
                {feedback}
              </div>
            )}

            <div className="pt-4 space-y-4">
              <Button type="button" variant="outline" onClick={() => void fetchOrders()} className="w-full h-12 text-lg rounded-xl font-sans">
                <RefreshCw className={`mr-2 h-5 w-5 ${loadingOrders ? "animate-spin" : ""}`} />
                تحديث الطلبات
              </Button>
              <Button data-testid="account-signout" onClick={() => void handleSignOut()} variant="outline" className="w-full h-12 text-lg rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/50 font-sans">
                <LogOut className="mr-2 h-5 w-5 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>

          <div className="perf-panel bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col max-h-[560px]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-black font-heading">
                  الطلبات <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">الأخيرة</span>
                </h2>
                <p data-testid="orders-source" className="text-xs text-muted-foreground mt-2">
                  الحساب
                </p>
              </div>
              <div data-testid="orders-count" className="text-lg font-black text-primary">
                {orders.length}
              </div>
            </div>

            <div ref={ordersScrollRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12 m-auto">
                  <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-lg text-muted-foreground mb-6 font-sans">لا توجد طلبات حديثة.</p>
                </div>
              ) : (
                <div data-testid="orders-list" className="relative w-full" style={{ height: `${orderVirtualizer.getTotalSize()}px` }}>
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
                        <div className="perf-card bg-background/40 border border-white/5 p-4 rounded-xl hover:border-primary/30 transition-all">
                          <div className="flex justify-between gap-4">
                            <div>
                              <p className="font-bold text-sm">طلب #{order.orderNumber}</p>
                              <p className="text-xs text-muted-foreground">{formatOrderDate(order.date)}</p>
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-primary">{order.total}</p>
                              <p className="text-xs px-2 py-1 bg-white/5 rounded-full mt-1 border border-white/10">
                                {getOrderStatusText(order.status)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                            {order.items.map((item) => (
                              <div key={`${order.id}-${item.title}`} className="flex justify-between gap-3">
                                <span>{item.title}</span>
                                <span>x{item.qty}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 flex justify-end">
                            <button
                              type="button"
                              onClick={() => void handleDeleteOrder(order)}
                              className="inline-flex items-center gap-2 text-xs text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              حذف
                            </button>
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

  const guestOrders = orders;

  return (
    <div className="container mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-20 relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="perf-panel bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black mb-2 font-heading">{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h2>
            <p className="text-muted-foreground font-sans">أدخل بياناتك للمتابعة</p>
          </div>

          <div className="flex bg-background/50 p-1 rounded-full mb-8 border border-white/5 backdrop-blur-sm">
            <button
              type="button"
              data-testid="account-tab-login"
              onClick={() => {
                setIsLogin(true);
                setFeedback("");
              }}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-bold transition-all font-sans ${isLogin ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,0,122,0.3)]" : "text-muted-foreground hover:text-foreground"}`}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              data-testid="account-tab-register"
              onClick={() => {
                setIsLogin(false);
                setFeedback("");
              }}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-bold transition-all font-sans ${!isLogin ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,0,122,0.3)]" : "text-muted-foreground hover:text-foreground"}`}
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {feedback && (
              <div
                data-testid="account-feedback"
                className={`rounded-xl px-4 py-3 text-sm ${
                  feedbackType === "error"
                    ? "border border-destructive/20 bg-destructive/10 text-destructive"
                    : "border border-success/20 bg-green-500/10 text-green-400"
                }`}
              >
                {feedback}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">الاسم الكامل</label>
                <input data-testid="account-name" value={name} onChange={(event) => setName(event.target.value)} type="text" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" placeholder="مثال: محمد أحمد" />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground font-sans">البريد الإلكتروني</label>
              <input data-testid="account-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground font-sans">كلمة المرور</label>
              <input data-testid="account-password" value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" placeholder="6 أحرف أو أكثر" />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground font-sans">تأكيد كلمة المرور</label>
                <input data-testid="account-confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" required className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm font-sans" placeholder="أعد إدخال كلمة المرور" />
              </div>
            )}

            <div className="pt-4 space-y-4">
              <Button data-testid="account-submit" disabled={loading} type="submit" className="w-full h-12 text-lg rounded-xl shadow-[0_0_15px_rgba(255,0,122,0.3)] hover:shadow-[0_0_25px_rgba(255,0,122,0.5)] font-sans">
                {loading ? "جاري التحميل..." : isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
              </Button>

              <Button disabled={loading} onClick={() => void handleGoogleLogin()} type="button" variant="outline" className="w-full h-12 text-lg rounded-xl border-white/20 hover:border-secondary/50 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] font-sans">
                الدخول عبر Google
              </Button>

              {isLogin && (
                <Button type="button" variant="ghost" onClick={() => void handleResetPassword()} className="w-full text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_5px_rgba(255,0,122,0.5)] font-sans">
                  نسيت كلمة المرور؟
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="perf-panel bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold mb-2">طلبات الزائر</h2>
              <p data-testid="orders-source" className="text-muted-foreground text-sm">
                زائر
              </p>
            </div>
            <div data-testid="orders-count" className="text-lg font-black text-primary">
              {guestOrders.length}
            </div>
          </div>

          {guestOrders.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-center flex-1">
              <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
              <h2 className="text-xl font-bold mb-2">تتبع طلباتك</h2>
              <p className="text-muted-foreground">
                قم بتسجيل الدخول لمعرفة حالة طلباتك، أو أكمل الطلب كزائر وسيظهر هنا على هذا الجهاز.
              </p>
            </div>
          ) : (
            <div data-testid="orders-list" className="space-y-4 overflow-y-auto max-h-[420px]">
              {guestOrders.map((order) => (
                <div key={order.id} className="rounded-xl border border-white/5 bg-background/40 p-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-bold text-sm">طلب #{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">{formatOrderDate(order.date)}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-primary">{order.total}</p>
                      <p className="text-xs px-2 py-1 bg-white/5 rounded-full mt-1 border border-white/10">
                        {getOrderStatusText(order.status)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.title}`} className="flex justify-between gap-3">
                        <span>{item.title}</span>
                        <span>x{item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => void handleDeleteOrder(order)}
                      className="inline-flex items-center gap-2 text-xs text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
