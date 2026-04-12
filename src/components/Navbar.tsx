import { Link, useLocation } from "react-router-dom";
import { useCart } from "../lib/CartContext";

export function Navbar() {
  const { items } = useCart();
  const location = useLocation();

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "المنتجات", path: "/products" },
    { name: "سلة المشتريات", path: "/cart" },
    { name: "حسابي", path: "/account" },
    { name: "اتصل بنا", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1d0c26]/60 backdrop-blur-[20px] shadow-[0_8px_40px_rgba(86,0,202,0.15)] font-headline antialiased">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 w-full max-w-screen-2xl mx-auto flex-row">
        {/* Logo */}
        <Link to="/" className="text-3xl font-black text-[#d0bcff] tracking-tight">زارز</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-row items-center gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-all duration-300 scale-98 active:opacity-80 pb-1 ${
                  isActive 
                    ? "text-[#d0bcff] font-bold border-b-2 border-[#d0bcff]" 
                    : "text-[#958da2] hover:text-[#d7baff] hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        {/* User & Cart Icons */}
        <div className="flex items-center gap-5 md:gap-6">
          {/* Mobile Products Icon */}
          <Link to="/products" className="md:hidden text-[#d0bcff] hover:text-white transition-colors">
            <span className="material-symbols-outlined" data-icon="storefront">storefront</span>
          </Link>
          <Link to="/cart" className="relative text-[#d0bcff] hover:text-white transition-colors group">
            <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/account" className="md:hidden text-[#d0bcff] hover:text-white transition-colors">
            <span className="material-symbols-outlined" data-icon="person">person</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
