import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Contact() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full animate-in fade-in duration-700 min-h-screen">
      
      {/* Hero Section */}
      <section className="mb-20 text-center md:text-right relative">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h1 className="font-headline text-5xl md:text-7xl font-black mb-6 text-on-surface tracking-tight leading-tight">
          نحن هنا <br/>
          <span className="text-primary italic">لأجلك</span>
        </h1>
        <p className="text-xl text-on-surface-variant max-w-2xl md:mr-0 mr-auto leading-relaxed">
          سواء كان لديك استفسار أو ترغب في التعاون معنا، فريق زارز جاهز دائماً لتقديم الدعم والخدمة الملكية التي تستحقها.
        </p>
      </section>

      {/* Main Content Layout (Asymmetric Bento) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Details Sidebar (3/12) */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Info Card 1 */}
          <div className="bg-surface-container-low p-8 rounded-[2rem] transition-transform hover:scale-[1.02] duration-500">
            <div className="w-12 h-12 primary-gradient rounded-xl flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(125,60,255,0.3)]">
              <span className="material-symbols-outlined text-on-primary text-xl">mail</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-2">تواصل معنا عبر البريد</h3>
            <p className="text-on-surface-variant mb-4">راسلنا في أي وقت وسنقوم بالرد خلال ٢٤ ساعة.</p>
            <a href="mailto:support@zarz.com" className="text-tertiary font-bold text-lg hover:underline underline-offset-4">support@zarz.com</a>
          </div>

          {/* Info Card 2 */}
          <div className="bg-surface-container-low p-8 rounded-[2rem] transition-transform hover:scale-[1.02] duration-500">
            <div className="w-12 h-12 primary-gradient rounded-xl flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(125,60,255,0.3)]">
              <span className="material-symbols-outlined text-on-primary text-xl">chat_bubble</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-2">واتساب مباشر</h3>
            <p className="text-on-surface-variant mb-4">تواصل سريع وفوري مع فريق الدعم الفني.</p>
            <a href="https://wa.me/966500000000" className="text-tertiary font-bold text-lg hover:underline underline-offset-4" dir="ltr">+966 50 000 0000</a>
          </div>

          {/* Decorative Asset */}
          <div className="hidden lg:block relative h-48 rounded-[2rem] overflow-hidden group">
            <img 
              alt="Decorative Abstract"
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXgF0z5f0-DoCcOlyqmUOdqIl603LMuwWVfAIDlGfHlAMS1R6Bi9hX-0RLiABd98wJLtbJthOc5TD3du1FAaGJIu70RgbUzcbM6aBiuHrDKE72Be-e4Lo1FKxQ5esyAKkWWjRQSFLD0WcQCbhW56yQcWGN4p1oBrg8Di5sStHR67GleZZGnQgnk9KBTLOl5NtnblFMNNRcCXIUbZTIprzUPEOdM5P55Uyrh9YOMNlUJ5sPIxR5PBWrd8HhNlJnKhz6SNAVCLhD2KTd"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
          </div>
        </aside>

        {/* Contact Form Container (8/12) */}
        <div className="lg:col-span-8">
          <div className="bg-surface-container p-8 md:p-12 rounded-[3rem] relative overflow-hidden h-full">
            
            {/* Royal Scrim decorative element */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tertiary/5 rounded-full blur-[80px]"></div>
            
            {success ? (
              <div className="h-full flex flex-col items-center justify-center relative z-10 space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
                </div>
                <h2 className="text-3xl font-black font-headline text-on-surface">تم استلام طلبك</h2>
                <p className="text-outline text-center">سيتواصل فريق زارز معك في أقرب وقت شكراً لثقتك بنا.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Input Group */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-bold text-on-surface-variant mr-2">الاسم بالكامل</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      placeholder="اكتب اسمك هنا..." 
                      className="w-full bg-surface-container-highest border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline" 
                    />
                  </div>
                  {/* Input Group */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-bold text-on-surface-variant mr-2">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      placeholder="example@zarz.com" 
                      className="w-full bg-surface-container-highest border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline" 
                    />
                  </div>
                </div>
                {/* Input Group */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-bold text-on-surface-variant mr-2">الموضوع</label>
                  <input 
                    type="text" 
                    id="subject" 
                    required
                    placeholder="ما هو موضوع رسالتك؟" 
                    className="w-full bg-surface-container-highest border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline" 
                  />
                </div>
                {/* Textarea Group */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-bold text-on-surface-variant mr-2">الرسالة</label>
                  <textarea 
                    id="message" 
                    rows={6} 
                    required
                    placeholder="اكتب تفاصيل استفسارك هنا..." 
                    className="w-full bg-surface-container-highest border-none rounded-[2rem] p-6 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline resize-none"
                  ></textarea>
                </div>
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button type="submit" className="primary-gradient text-on-primary font-bold px-12 py-4 rounded-full text-lg shadow-[0_12px_32px_rgba(125,60,255,0.4)] hover:scale-105 hover:shadow-[0_16px_40px_rgba(125,60,255,0.5)] active:scale-95 transition-all duration-300 flex items-center gap-3">
                    إرسال الرسالة
                    <span className="material-symbols-outlined text-xl">send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Location Section (Asymmetric Detail) */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 h-96 rounded-[3rem] overflow-hidden bg-surface-container-low shadow-xl">
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center relative group">
            <img 
              alt="Map"
              className="w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUfNQURvgTvvVEp0-MrgzZhc1EhgaG6M0GXAAqfhzbpv8r4LdJUtupCCh5HzBOC1sfBr5e4Gn1iITvkFDcttsflR-zhvofyboJ3RbO0fYpIwF0j4XSNLOQwBAbCs2-lFy3l9yYs1rWrCV9AsuH5Dxj8t8rI9rTUbWafKXjvGlMxrkWXhaR-3m1k21OXkDxblgcRhBdTy4O97LKUY2BeGnYJvFw7HPuzVz69MPRrMnPPHEWuHemwplBlL_1OMEdosdLzDTtsJMoc1vw" 
            />
            <div className="absolute inset-0 primary-gradient opacity-10"></div>
            <div className="absolute bg-surface-container p-4 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="w-10 h-10 primary-gradient rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">location_on</span>
              </div>
              <div>
                <p className="font-bold text-sm">مقر زارز الرئيسي</p>
                <p className="text-xs text-on-surface-variant">الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="font-headline text-4xl font-black">تفضل <span className="text-tertiary">بزيارتنا</span></h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            نحن نؤمن بالتواصل المباشر. إذا كنت في المنطقة، تفضل بزيارة مكتبنا الرئيسي لمناقشة أفكارك وتطلعاتك في بيئة ملكية مصممة للإلهام.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span className="text-on-surface">من الأحد إلى الخميس: ٩:٠٠ ص - ٦:٠٠ م</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">distance</span>
              <span className="text-on-surface">طريق الملك فهد، برج الفيصلية، الرياض</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
