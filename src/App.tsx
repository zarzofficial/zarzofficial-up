import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { products } from "./data/products";

function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    let pageName = "الرئيسية";
    const path = location.pathname;

    if (path.startsWith("/products/")) {
      const id = path.split("/products/")[1];
      const safeId = id ? decodeURIComponent(id) : '';
      const product = products.find(p => p.id === safeId || p.id === id);
      if (product) {
        // Enforce max 60 chars total (title prefix is 14 chars length: "زارز | ZARZ | ")
        // 60 - 14 = 46 chars allowed for the product name
        // However, standard HTML title length is usually measured as a total string, usually we just truncate if it's crazily long. Wait, user specified "Not exceed 60 characters" total.
        pageName = product.title;
      } else {
        pageName = "تفاصيل المنتج";
      }
    } else {
      switch (path) {
        case "/":
          pageName = "الرئيسية";
          break;
        case "/products":
          pageName = "المنتجات";
          break;
        case "/cart":
          pageName = "سلة المشتريات";
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
        case "/checkout":
          pageName = "إتمام الطلب";
          break;
        default:
          pageName = "الصفحة غير موجودة";
      }
    }

    // Strict format: زارز | ZARZ | [Page Name or Product Name]
    let fullTitle = `زارز | ZARZ | ${pageName}`;
    if (fullTitle.length > 60) {
      // 60 chars strict limit
      const prefix = "زارز | ZARZ | ";
      const maxNameLength = 60 - prefix.length - 3; // -3 for "..."
      pageName = pageName.substring(0, maxNameLength) + "...";
      fullTitle = `${prefix}${pageName}`;
    }

    document.title = fullTitle;
  }, [location]);

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
      <div className={`min-h-screen bg-background font-sans text-foreground selection:bg-primary/30 flex flex-col transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Store />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Navigate to="/cart" replace />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
