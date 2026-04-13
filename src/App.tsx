import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Cart } from "./pages/Cart";
import { Account } from "./pages/Account";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import { ProductDetails } from "./pages/ProductDetails";
import { ScrollToTop } from "./components/ScrollToTop";
import { IntroLoader } from "./components/IntroLoader";
import { getProductBySlugOrId } from "./data/products";

function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    let pageName = "الرئيسية";
    const path = location.pathname;

    if (path === "/cart" || path === "/products/cart") {
      pageName = "سلة المشتريات";
    } else if (path === "/checkout" || path === "/products/checkout") {
      pageName = "إتمام الطلب";
    } else if (path.startsWith("/products/")) {
      const id = path.split("/products/")[1];
      const product = getProductBySlugOrId(id ? decodeURIComponent(id) : "");
      pageName = product?.title || "تفاصيل المنتج";
    } else {
      switch (path) {
        case "/":
          pageName = "الرئيسية";
          break;
        case "/products":
          pageName = "المنتجات";
          break;
        case "/account":
          pageName = "حسابي";
          break;
        case "/contact":
          pageName = "تواصل معنا";
          break;
        case "/terms":
          pageName = "الشروط والأحكام";
          break;
        default:
          pageName = "الصفحة غير موجودة";
      }
    }

    const prefix = "زارز | ZARZ | ";
    let title = `${prefix}${pageName}`;
    if (title.length > 60) {
      title = `${prefix}${pageName.slice(0, 60 - prefix.length - 3)}...`;
    }

    document.title = title;
  }, [location.pathname]);

  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleIntroFinished = useCallback(() => setLoaded(true), []);

  return (
    <Router>
      <DynamicTitle />
      <ScrollToTop />
      {!loaded && <IntroLoader onFinished={handleIntroFinished} />}
      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Store />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/cart" element={<Navigate to="/cart" replace />} />
            <Route path="/checkout" element={<Navigate to="/cart" replace />} />
            <Route path="/products/checkout" element={<Navigate to="/cart" replace />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/store.html" element={<Navigate to="/products" replace />} />
            <Route path="/account.html" element={<Navigate to="/account" replace />} />
            <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
            <Route path="/terms.html" element={<Navigate to="/terms" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
