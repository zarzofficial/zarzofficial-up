export function Terms() {
  return (
    <div className="relative pt-40 pb-24 px-6 md:px-12 max-w-5xl mx-auto animate-in fade-in duration-700 min-h-screen">
      
      {/* Hero Header */}
      <header className="mb-20 text-center md:text-right">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-surface-container-high border border-outline-variant/15 text-primary text-sm font-bold tracking-widest">
          الوثيقة الرسمية
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-black text-on-background mb-8 leading-tight">
          الشروط <span className="royal-gradient-text">والأحكام</span>
        </h1>
        <p className="text-outline text-lg md:text-xl max-w-2xl md:ml-auto md:mr-0 mx-auto">
          يرجى قراءة هذه الشروط بعناية قبل استخدام منصة زارز. استخدامك للموقع يعني موافقتك الصريحة على كافة البنود الواردة أدناه.
        </p>
      </header>

      {/* Content Layout: Asymmetric Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sticky Summary Sidebar */}
        <aside className="md:col-span-4 space-y-6 order-2 md:order-1">
          <div className="perf-panel sticky top-32 p-8 bg-surface-container-low rounded-3xl border border-outline-variant/15">
            <h3 className="text-tertiary font-bold text-xl mb-6">فهرس المحتويات</h3>
            <nav className="flex flex-col gap-4 text-sm font-medium">
              <a href="#intro" className="text-on-surface hover:text-primary transition-colors flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
                مقدمة
              </a>
              <a href="#usage" className="text-outline hover:text-primary transition-colors flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
                شروط الاستخدام
              </a>
              <a href="#data" className="text-outline hover:text-primary transition-colors flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
                حماية البيانات
              </a>
              <a href="#liability" className="text-outline hover:text-primary transition-colors flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
                حدود المسؤولية
              </a>
            </nav>
            <div className="perf-card mt-12 p-6 bg-surface-container rounded-2xl border border-primary/10">
              <span className="material-symbols-outlined text-primary mb-4 text-xl">verified_user</span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                آخر تحديث: ٢٤ أكتوبر ٢٠٢٤. تحتفظ زارز بالحق في تعديل هذه الشروط في أي وقت.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Long-form Text */}
        <article className="md:col-span-8 order-1 md:order-2 space-y-16">
          
          {/* Section: Introduction */}
          <section id="intro" className="group">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-primary"></span>
              <h2 className="font-headline text-3xl font-bold text-on-background">مقدمة</h2>
            </div>
            <div className="text-on-surface-variant space-y-6 text-lg leading-relaxed">
              <p>
                أهلاً بكم في منصة زارز (ZARZ). تشكل هذه الشروط والأحكام اتفاقية قانونية ملزمة بينك وبين المنصة بخصوص وصولك إلى موقعنا الإلكتروني واستخدامه. 
              </p>
              <p>
                نحن نسعى لتقديم تجربة تسوق استثنائية تعكس هويتنا السيادية في عالم التجارة الرقمية. من خلال تصفحك لزارز، أنت تقر بأنك قد قرأت وفهمت هذه الشروط بالكامل.
              </p>
            </div>
          </section>

          {/* Section: Terms of Use */}
          <section id="usage" className="perf-panel p-10 bg-surface-container-low rounded-[2.5rem] border border-outline-variant/10 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-secondary"></span>
              <h2 className="font-headline text-3xl font-bold text-on-background">شروط الاستخدام</h2>
            </div>
            <ul className="space-y-8">
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-container-highest text-primary">
                  <span className="material-symbols-outlined">person_check</span>
                </div>
                <div>
                  <h4 className="text-on-background font-bold text-xl mb-2">الأهلية القانونية</h4>
                  <p className="text-on-surface-variant leading-relaxed">يجب أن لا يقل عمر المستخدم عن ١٨ عاماً للقيام بعمليات الشراء المباشرة، أو استخدام المنصة تحت إشراف ولي الأمر.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-container-highest text-secondary">
                  <span className="material-symbols-outlined">block</span>
                </div>
                <div>
                  <h4 className="text-on-background font-bold text-xl mb-2">الاستخدام المحظور</h4>
                  <p className="text-on-surface-variant leading-relaxed">يُحظر استخدام الموقع لأي غرض غير قانوني، أو محاولة اختراق الأنظمة الأمنية، أو جمع بيانات المستخدمين الآخرين دون إذن صريح.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Image Break: Royal Scrim Aesthetic */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-[2.5rem] group">
            <img 
              alt="Decorative Cyber Security" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbuuEa8JhjmV5Fo7GYGVggrO37P4dF3v_wPNs1iY7P6cZgHoldqbAXPCF8-4L3AnpQ2LynbEcZhNM7p6HHGQz3QL3u4M7KCVKLUXcqGD6NJZSC7lsS8UaXywofAsAYo19mTHMuDaRBh4IIW86FeIJDkxyKhHyIiSEdtBRfiNWGtYU_0GrgZAsup7wl6g81nPC_gozJ2UNpOxmfQpwTOVBEukWdskeWD-erYoR6OvHfz33z4GM_iw3UoUGCj5IWqApY7FfpEIAHkVId"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-8 right-8">
              <p className="text-tertiary font-headline text-2xl font-black">أمنك، أولويتنا القصوى.</p>
            </div>
          </div>

          {/* Section: Data Protection */}
          <section id="data">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-primary"></span>
              <h2 className="font-headline text-3xl font-bold text-on-background">حماية البيانات</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="perf-card p-8 bg-surface-container rounded-3xl border border-outline-variant/15 hover:border-primary/30 transition-colors">
                <h4 className="text-on-background font-bold mb-4">التشفير التام</h4>
                <p className="text-on-surface-variant text-sm leading-loose">نستخدم بروتوكولات تشفير متقدمة لحماية معلوماتك المالية والبيانات الشخصية أثناء عمليات الانتقال والتخزين.</p>
              </div>
              <div className="perf-card p-8 bg-surface-container rounded-3xl border border-outline-variant/15 hover:border-primary/30 transition-colors">
                <h4 className="text-on-background font-bold mb-4">حقوق الخصوصية</h4>
                <p className="text-on-surface-variant text-sm leading-loose">لك الحق الكامل في الوصول إلى بياناتك، تعديلها، أو طلب مسحها من أنظمتنا وفقاً للوائح المنظمة.</p>
              </div>
            </div>
          </section>

          {/* Section: Limitation of Liability */}
          <section id="liability" className="perf-panel relative overflow-hidden p-10 bg-gradient-to-br from-surface-container-low to-surface rounded-[2.5rem] border border-outline-variant/10">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 blur-[80px] rounded-full"></div>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <span className="w-12 h-[1px] bg-error"></span>
              <h2 className="font-headline text-3xl font-bold text-on-background">حدود المسؤولية</h2>
            </div>
            <div className="text-on-surface-variant text-lg relative z-10 leading-relaxed">
              <p>
                بأقصى حد يسمح به القانون المعمول به، لا تتحمل زارز أو موردوها أي مسؤولية عن أي أضرار غير مباشرة، عرضية، أو تبعية تنشأ عن استخدامك أو عدم قدرتك على استخدام المنصة.
              </p>
            </div>
          </section>

        </article>
      </div>

    </div>
  );
}
