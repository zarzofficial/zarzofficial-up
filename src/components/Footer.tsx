import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 mt-auto bg-[#1d0c26] bg-gradient-to-t from-[#26142f] to-[#1d0c26]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-12 max-w-7xl mx-auto text-start rtl font-body leading-relaxed">
        
        <div>
          <span className="text-2xl font-bold text-[#d0bcff] mb-4 block text-start">زارز</span>
          <p className="text-[#958da2] mb-8 max-w-sm text-start">خدمات رقمية متكاملة تشمل شحن الألعاب، تنمية حسابات التواصل الاجتماعي، الاشتراكات المميزة، وتطوير المواقع والمتاجر مع تنفيذ سريع ومتابعة واضحة من أول الطلب حتى التسليم.</p>
          <div className="flex gap-3 justify-start mt-2">
            <a href="https://web.facebook.com/zarzofficial/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d0bcff] hover:bg-[#d0bcff]/15 hover:border-[#d0bcff]/30 hover:text-white hover:shadow-[0_0_20px_rgba(208,188,255,0.15)] transition-all duration-300" title="صفحتنا على فيسبوك">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="https://chat.whatsapp.com/Idz1dzgPaQEGLKIZcmZt1C?mode=gi_t" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 px-4 h-11 text-[#d0bcff] hover:bg-[#d0bcff]/15 hover:border-[#d0bcff]/30 hover:text-white hover:shadow-[0_0_20px_rgba(208,188,255,0.15)] transition-all duration-300" title="قروب واتساب">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12 0 2.12.553 4.108 1.523 5.86l-2.074 7.585 7.747-2.032c1.712.91 3.69 1.42 5.804 1.42 6.627 0 12-5.373 12-12s-5.373-12-12-12zm6.275 16.993c-.237.668-1.38 1.258-1.92 1.343-.538.083-1.246.12-3.411-.77-2.6-1.071-4.25-3.714-4.381-3.887-.132-.175-1.047-1.393-1.047-2.658 0-1.264.654-1.888.887-2.127.234-.238.508-.297.68-.297.172 0 .344.004.492.01.155.006.368-.06.577.444.215.52.735 1.796.8 1.93.064.135.107.291.02.463-.086.173-.13.28-.258.428-.13.149-.272.33-.39.46-.129.13-.266.274-.112.542.152.266.68 1.127 1.458 1.821.999.897 1.848 1.18 2.115 1.314.266.134.423.111.58-.067.158-.178.682-.796.864-1.07.18-.274.364-.228.608-.136.246.091 1.554.735 1.821.871.266.136.444.204.51.319.066.115.066.666-.171 1.332z"/></svg>
              <span className="text-xs font-bold">قروب واتساب</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-start">
          <h4 className="text-white font-bold mb-2">روابط سريعة</h4>
          <Link to="/" className="text-[#958da2] hover:text-white transition-colors duration-200">الرئيسية</Link>
          <Link to="/products" className="text-[#958da2] hover:text-white transition-colors duration-200">المنتجات</Link>
          <Link to="/contact" className="text-[#958da2] hover:text-white transition-colors duration-200">الأسئلة الشائعة</Link>
        </div>

        <div className="flex flex-col gap-4 text-start">
          <h4 className="text-white font-bold mb-2">قد تهمك</h4>
          <Link to="/terms" className="text-[#958da2] hover:text-white transition-colors duration-200">الشروط والأحكام</Link>
          <Link to="/terms" className="text-[#958da2] hover:text-white transition-colors duration-200">سياسة الخصوصية</Link>
          <Link to="/contact" className="text-[#958da2] hover:text-white transition-colors duration-200">مركز الدعم</Link>
        </div>

      </div>
      <div className="border-t border-white/5 mt-16 pt-8 text-center text-[#958da2] text-sm">
        © ٢٠٢٤ زارز. جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
