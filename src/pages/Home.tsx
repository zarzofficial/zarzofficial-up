import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FeaturedProducts } from "../components/FeaturedProducts";

function FaqItem({ faq, isOpen, onClick }: { key?: React.Key, faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }) {
  return (
    <div
      className={`cyber-glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${isOpen ? 'border-[#e11d48]/30 bg-[#e11d48]/5' : 'border-outline-variant/10 hover:border-outline-variant/30 bg-surface-container-low/30'}`}
      onClick={onClick}
    >
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-surface">{faq.question}</h3>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'text-[#e11d48]' : 'text-[#0ea5e9]'}`}>
          {isOpen ? 'remove' : 'add'}
        </span>
      </div>
      <div
        className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-[#cbc3d9] leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

function FaqAccordion({ faqs }: { faqs: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 text-start">
      {faqs.map((faq, idx) => (
        <FaqItem
          key={idx}
          faq={faq}
          isOpen={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}

export function Home() {
  return (
    <div className="pt-12 md:pt-14 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-0 py-6 md:py-12 lg:py-20 flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_V8C1X5Y5GJtZ6TmyhE1V8o9zPZDTjiBfIHyLuwq8yStU5rjHntzzZmYKveVgO4NOCqe9qpcuwbPLDLb143PhrmcccmLHDPwjhqJ971uvr4MZDc4ZFuLT9DlECkBmu3u3NpaEI57fNO9PDe4Oa1EuwecaMWvNXnJbQkzezI7C2_oJtxRthxt1X_3d9JGecxAYEwlYHjH8_NO8XEISqGjJ_AcNw8mioPN4qoxuie9czflyupK_iRz6tKWVwFb8I0-JvW7wcF6T6qAI"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-background/50"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 xl:gap-16">

          {/* Main Hero Text */}
          <div className="text-start flex-1 min-w-0">
            <h1 className="text-[2rem] md:text-4xl xl:text-6xl font-black font-headline text-on-background leading-[1.1] md:leading-tight mb-3 md:mb-6 text-glow">
              تسوق كل ما تحتاجه في <br />
              <span className="text-primary italic">مكان واحد</span>
            </h1>
            <p className="text-sm md:text-base xl:text-lg text-outline mb-5 md:mb-8 max-w-2xl leading-relaxed">
              مرحباً بك في زارز، وجهتك الأولى للخدمات الرقمية. نوفر لك شحن ألعاب فوري، اشتراكات الذكاء الاصطناعي، خدمات زيادة المتابعين، وتطوير المتاجر بأفضل الأسعار وأسرع تنفيذ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-start">
              <Link
                to="/products"
                className="primary-gradient text-on-primary font-bold px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg hover:shadow-[0_0_30px_rgba(208,188,255,0.4)] transition-all scale-100 active:scale-95 text-center"
              >
                عروضنا الحصرية
              </Link>
              <Link
                to="/contact"
                className="border-[1.5px] border-outline/40 text-on-background px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg hover:bg-white/5 transition-all text-center"
              >
                تواصل معنا
              </Link>
            </div>
          </div>

          {/* Features Vertical Card */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 cyber-glass-card rounded-[2rem] p-6 xl:p-8 border border-white/5 bg-surface/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative hidden lg:block">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none"></div>

            <div className="flex justify-start mb-6">
              <span className="bg-[#9f1239]/40 border border-[#e11d48]/30 text-[#fda4af] font-bold text-xs px-4 py-2 rounded-full backdrop-blur-md">
                الأكثر طلباً هذا الأسبوع
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-on-background leading-tight mb-4 text-start tracking-tight">
              تجربة أسرع وأوضح للطلبات الرقمية
            </h3>

            <p className="text-[#a1a1aa] text-sm leading-relaxed mb-8 text-start font-medium">
              اختر الخدمة، أرسل بياناتك، وتابع التنفيذ من نفس المكان بدون خطوات معقدة.
            </p>

            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="p-4 rounded-[1.25rem] bg-white/5 border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#e11d48] shrink-0 flex items-center justify-center text-white text-2xl font-black shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                  #
                </div>
                <div className="text-start">
                  <h4 className="font-bold text-on-surface mb-1 text-sm">نمو للحسابات والتفاعل</h4>
                  <p className="text-xs text-outline line-clamp-1">باقات سوشيال ميديا مناسبة للبدء أو التوسع</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-4 rounded-[1.25rem] bg-white/5 border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#3b82f6] shrink-0 flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  <span className="material-symbols-outlined text-2xl fill-1">bolt</span>
                </div>
                <div className="text-start">
                  <h4 className="font-bold text-on-surface mb-1 text-sm">شحن واشتراكات مباشرة</h4>
                  <p className="text-xs text-outline line-clamp-1">تأكيد سريع ومتابعة عبر واتساب أو الهاتف</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-4 rounded-[1.25rem] bg-white/5 border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#10b981] shrink-0 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <span className="material-symbols-outlined text-2xl">laptop_mac</span>
                </div>
                <div className="text-start">
                  <h4 className="font-bold text-on-surface mb-1 text-sm">تنفيذ مواقع ومتاجر حسب الطلب</h4>
                  <p className="text-xs text-outline line-clamp-1">من التعديل السريع إلى المشروع الكامل</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-5 select-none pointer-events-none hidden lg:block">
          <span className="text-[25rem] font-black font-headline tracking-tighter">ZARZ</span>
        </div>
      </section>

      <FeaturedProducts />

      {/* Bento Services Grid */}
      <section className="px-6 md:px-12 py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <div className="text-start">
              <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">تخصصاتنا</span>
              <h2 className="text-4xl md:text-5xl font-black font-headline text-on-background">أقسامنا الرئيسية</h2>
            </div>
            <div className="hidden md:block h-[1px] flex-grow bg-outline-variant/30 mx-12 mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
            {/* AI Service - Large Card */}
            <div className="md:col-span-8 cyber-glass-card rounded-[2.5rem] p-8 md:p-12 group flex flex-col justify-between">
              <div className="mesh-gradient-bg"></div>
              <div className="glowing-border-accent"></div>
              <div className="relative z-20">
                <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform icon-glow-container" style={{ transform: "translateZ(0)" }}>
                  <span className="material-symbols-outlined text-5xl icon-gradient drop-shadow-[0_0_15px_rgba(208,188,255,0.6)]" data-icon="neurology">neurology</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/20 text-[#f5d9fe] border border-primary/30 px-4 py-1 rounded-full text-xs font-bold backdrop-blur-md">حصري</span>
                  <span className="text-primary/50 text-[10px] uppercase tracking-widest font-bold">Neural Core v2.0</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-6 text-on-background tracking-tight text-glow">الذكاء الاصطناعي</h3>
                <p className="text-[#cbc3d9] text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                  أتمتة ذكية وحلول تحليلية مبنية على أحدث تقنيات، لتطوير أعمالك بشكل غير مسبوق وتحقيق قفزات نوعية في الإنتاجية.
                </p>
              </div>
              <div className="relative z-20 mt-auto">
                <Link to="/products?category=ai" className="inline-flex items-center gap-3 text-primary font-black hover:gap-6 transition-all duration-500 text-xl group/link">
                  <span>تفاصيل الخدمة</span>
                  <span className="material-symbols-outlined transition-transform group-hover/link:-translate-x-2">arrow_back</span>
                </Link>
              </div>
            </div>

            {/* Social Media - Small Vertical */}
            <div className="md:col-span-4 cyber-glass-card rounded-[2.5rem] p-8 md:p-12 group flex flex-col justify-center items-center text-center">
              <div className="mesh-gradient-bg"></div>
              <div className="glowing-border-accent"></div>
              <div className="relative z-20">
                <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mx-auto mb-10 group-hover:rotate-12 transition-transform icon-glow-container" style={{ transform: "translateZ(0)" }}>
                  <span className="material-symbols-outlined text-5xl icon-gradient drop-shadow-[0_0_15px_rgba(208,188,255,0.6)]" data-icon="campaign">campaign</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-6 text-on-background tracking-tight">إدارة المنصات</h3>
                <p className="text-[#cbc3d9] text-lg leading-relaxed mb-8">
                  نصنع محتوى يتفاعل معه العالم بأسلوب احترافي وجذاب يضمن وصول رسالتك للجمهور المستهدف.
                </p>
                <div className="mt-auto">
                  <Link to="/products?category=social" className="inline-flex items-center gap-3 text-primary font-black hover:gap-6 transition-all duration-500 group/link">
                    <span>تصفح الباقات</span>
                    <span className="material-symbols-outlined transition-transform group-hover/link:-translate-x-2 text-sm">arrow_back</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Gaming - Small Vertical */}
            <div className="md:col-span-4 cyber-glass-card rounded-[2.5rem] p-8 md:p-12 group flex flex-col justify-center items-center text-center">
              <div className="mesh-gradient-bg"></div>
              <div className="glowing-border-accent"></div>
              <div className="relative z-20">
                <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform icon-glow-container" style={{ transform: "translateZ(0)" }}>
                  <span className="material-symbols-outlined text-5xl icon-gradient drop-shadow-[0_0_15px_rgba(208,188,255,0.6)]" data-icon="sports_esports">sports_esports</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-6 text-on-background tracking-tight">خدمات الألعاب</h3>
                <p className="text-[#cbc3d9] text-lg leading-relaxed mb-8">
                  شحن، اشتراكات، وأدوات احترافية لأفضل تجربة لعب. كل ما يحتاجه المحترفون في مكان واحد.
                </p>
                <div className="mt-auto">
                  <Link to="/products?category=gaming" className="inline-flex items-center gap-3 text-primary font-black hover:gap-6 transition-all duration-500 group/link">
                    <span>تصفح العروض</span>
                    <span className="material-symbols-outlined transition-transform group-hover/link:-translate-x-2 text-sm">arrow_back</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Web Services - Medium Landscape */}
            <div className="md:col-span-8 cyber-glass-card rounded-[2.5rem] p-8 md:p-12 group flex flex-col justify-between overflow-hidden">
              <div className="mesh-gradient-bg"></div>
              <div className="glowing-border-accent"></div>
              <div className="relative z-20">
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-8 group-hover:translate-x-4 transition-transform icon-glow-container" style={{ transform: "translateZ(0)" }}>
                      <span className="material-symbols-outlined text-5xl icon-gradient drop-shadow-[0_0_15px_rgba(208,188,255,0.6)]" data-icon="terminal">terminal</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black mb-6 text-on-background tracking-tight">خدمات الويب</h3>
                    <p className="text-[#cbc3d9] text-xl leading-relaxed mb-8 max-w-xl">
                      برمجة وتصميم واجهات عصرية تضمن أفضل تجربة مستخدم وأداء فائق السرعة مع بنية تحتية رقمية متينة.
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <span className="material-symbols-outlined text-primary/5 text-[180px] absolute -left-12 -top-12 select-none pointer-events-none rotate-12" data-icon="code">code</span>
                  </div>
                </div>
              </div>
              <div className="relative z-20">
                <Link to="/products?category=web" className="inline-flex items-center gap-3 text-primary font-black hover:gap-6 transition-all duration-500 text-xl group/link">
                  <span>اكتشف المزيد</span>
                  <span className="material-symbols-outlined transition-transform group-hover/link:-translate-x-2">arrow_back</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ZARZ Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-tertiary/5 rounded-full blur-[50px] md:blur-[100px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-bold mb-6 backdrop-blur-md">لماذا نحن مختلفون؟</span>
            <h2 className="text-3xl md:text-5xl font-black font-headline text-on-background mb-4">لماذا تختار زارز؟</h2>
            <p className="text-outline text-base md:text-lg max-w-xl mx-auto leading-relaxed">نقدّم تجربة متكاملة تجمع بين السرعة والأمان والدعم المستمر</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

            {/* Card 1 */}
            <div className="group relative rounded-[1.25rem] p-5 md:p-7 bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(208,188,255,0.08)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 left-4 text-[3.5rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">01</div>
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(208,188,255,0.2)] transition-all duration-500">
                  <span className="material-symbols-outlined text-[22px] text-primary">bolt</span>
                </div>
                <h4 className="text-sm md:text-[15px] font-black text-on-surface mb-2">تنفيذ فوري</h4>
                <p className="text-xs md:text-[13px] text-outline leading-relaxed">طلبك يبدأ خلال دقائق من التأكيد بدون أي تأخير</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-[1.25rem] p-5 md:p-7 bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 hover:border-[#3b82f6]/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(59,130,246,0.08)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 left-4 text-[3.5rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">02</div>
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-500">
                  <span className="material-symbols-outlined text-[22px] text-[#3b82f6]">shield</span>
                </div>
                <h4 className="text-sm md:text-[15px] font-black text-on-surface mb-2">أمان كامل</h4>
                <p className="text-xs md:text-[13px] text-outline leading-relaxed">حساباتك محمية ولا نطلب أي بيانات سرية مطلقاً</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-[1.25rem] p-5 md:p-7 bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 hover:border-[#10b981]/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(16,185,129,0.08)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 left-4 text-[3.5rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">03</div>
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500">
                  <span className="material-symbols-outlined text-[22px] text-[#10b981]">headset_mic</span>
                </div>
                <h4 className="text-sm md:text-[15px] font-black text-on-surface mb-2">دعم ٢٤/٧</h4>
                <p className="text-xs md:text-[13px] text-outline leading-relaxed">فريق متخصص جاهز لمساعدتك في أي وقت تحتاجه</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative rounded-[1.25rem] p-5 md:p-7 bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 hover:border-[#f59e0b]/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(245,158,11,0.08)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 left-4 text-[3.5rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">04</div>
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-500">
                  <span className="material-symbols-outlined text-[22px] text-[#f59e0b]">payments</span>
                </div>
                <h4 className="text-sm md:text-[15px] font-black text-on-surface mb-2">دفع مرن</h4>
                <p className="text-xs md:text-[13px] text-outline leading-relaxed">ندعم التحويل البنكي والكاش حسب ما يناسبك</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group relative rounded-[1.25rem] p-5 md:p-7 bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 hover:border-[#e11d48]/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(225,29,72,0.08)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e11d48]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 left-4 text-[3.5rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">05</div>
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[#e11d48]/10 border border-[#e11d48]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(225,29,72,0.2)] transition-all duration-500">
                  <span className="material-symbols-outlined text-[22px] text-[#e11d48]">workspace_premium</span>
                </div>
                <h4 className="text-sm md:text-[15px] font-black text-on-surface mb-2">جودة مضمونة</h4>
                <p className="text-xs md:text-[13px] text-outline leading-relaxed">ضمان زارز الملكي على كل خدمة نقدّمها لك</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="group relative rounded-[1.25rem] p-5 md:p-7 bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 hover:border-[#8b5cf6]/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(139,92,246,0.08)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 left-4 text-[3.5rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">06</div>
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-500">
                  <span className="material-symbols-outlined text-[22px] text-[#8b5cf6]">trending_up</span>
                </div>
                <h4 className="text-sm md:text-[15px] font-black text-on-surface mb-2">نتائج حقيقية</h4>
                <p className="text-xs md:text-[13px] text-outline leading-relaxed">خدمات فعلية بنتائج ملموسة وقابلة للقياس</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">

          <div className="group relative p-8 md:p-10 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(86,0,202,0.15)] overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_10px_rgba(208,188,255,0.5)]">groups</span>
              </div>
              <div className="text-4xl md:text-5xl font-black text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">+10k</div>
              <div className="text-outline text-sm md:text-base font-bold">عميل سعيد</div>
            </div>
          </div>

          <div className="group relative p-8 md:p-10 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 hover:border-[#3b82f6]/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#3b82f6]/10 rounded-full blur-3xl group-hover:bg-[#3b82f6]/20 transition-all duration-500"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-3xl text-[#3b82f6] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">verified</span>
              </div>
              <div className="text-4xl md:text-5xl font-black text-on-surface mb-2 tracking-tight group-hover:text-[#3b82f6] transition-colors">99%</div>
              <div className="text-outline text-sm md:text-base font-bold">رضا المستخدمين</div>
            </div>
          </div>

          <div className="group relative p-8 md:p-10 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 hover:border-[#f59e0b]/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)] overflow-hidden flex flex-col justify-center">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#f59e0b]/10 rounded-full blur-3xl group-hover:bg-[#f59e0b]/20 transition-all duration-500"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-3xl text-[#f59e0b] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">rocket_launch</span>
              </div>
              <div className="text-4xl md:text-5xl font-black text-on-surface mb-2 tracking-tight group-hover:text-[#f59e0b] transition-colors">+250</div>
              <div className="text-outline text-sm md:text-base font-bold">مشروع منجز</div>
            </div>
          </div>

          <div className="group relative p-8 md:p-10 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 hover:border-[#10b981]/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col justify-center">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#10b981]/10 rounded-full blur-3xl group-hover:bg-[#10b981]/20 transition-all duration-500"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-3xl text-[#10b981] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">support_agent</span>
              </div>
              <div className="text-4xl md:text-5xl font-black text-on-surface mb-2 tracking-tight group-hover:text-[#10b981] transition-colors">24/7</div>
              <div className="text-outline text-sm md:text-base font-bold">دعم فني متواصل</div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-headline text-on-background mb-4">أسئلة شائعة</h2>
            <p className="text-lg text-outline">إجابات سريعة قبل بدء الطلب.</p>
          </div>

          <FaqAccordion
            faqs={[
              {
                question: "كم يستغرق تنفيذ الطلب؟",
                answer: "يعتمد الوقت على نوع الخدمة، لكن أغلب الطلبات يبدأ تنفيذها خلال دقائق إلى ساعات قليلة بعد التأكيد."
              },
              {
                question: "كيف يتم التواصل بعد الطلب؟",
                answer: "عبر الواتساب بشكل مباشر على الرقم الخاص بالمتجر، وسيتم تزويدك بكل التحديثات الخاصة بطلبك."
              },
              {
                question: "هل الخدمات آمنة على الحسابات؟",
                answer: "نعم، جميع خدماتنا نعتمد فيها على أفضل معايير الأمان ولا نطلب أي أرقام سرية قد تضر بحسابك إطلاقاً."
              },
              {
                question: "هل يمكن طلب خدمة مخصصة؟",
                answer: "بالتأكيد، يمكنك التواصل معنا عبر الواتساب لشرح متطلباتك وسيقوم فريقنا بتقديم حل يناسب احتياجاتك الخاصة بأسعار منافسة."
              }
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto cyber-glass-card rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group border border-outline-variant/20 shadow-2xl">
          <div className="mesh-gradient-bg opacity-30"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col xl:flex-row items-center xl:items-end justify-between gap-12 xl:gap-20">
            {/* Text Content */}
            <div className="text-start flex-1 max-w-3xl w-full">
              <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-outline text-sm font-bold mb-8 backdrop-blur-md">
                جاهز تبدأ الآن؟
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-black font-headline mb-6 text-on-background leading-tight text-glow">
                خلنا نحول طلبك إلى تنفيذ سريع ومرتب
              </h2>
              <p className="text-lg md:text-xl text-[#cbc3d9] leading-relaxed max-w-2xl">
                سواء كنت تحتاج شحن ألعاب، نمو لحساباتك، أو متجر احترافي، البداية من هنا.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto shrink-0 pb-0 xl:pb-2">
              <a href="https://wa.me/201500007300" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-surface/50 backdrop-blur-md text-on-background border border-outline-variant/30 px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all w-full sm:w-auto">
                <span className="material-symbols-outlined text-xl">forum</span>
                تواصل عبر واتساب
              </a>
              <Link to="/products" className="primary-gradient text-on-primary font-bold px-8 py-5 rounded-xl text-lg hover:shadow-[0_0_30px_rgba(208,188,255,0.4)] transition-all scale-100 active:scale-95 text-center flex items-center justify-center gap-3 w-full sm:w-auto">
                استعرض المنتجات
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
