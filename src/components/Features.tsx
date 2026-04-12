import { Clock, ShieldCheck, HeadphonesIcon } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "سرعة التنفيذ",
      description: "نحرص على تنفيذ طلباتكم في أسرع وقت ممكن لضمان أفضل تجربة.",
      icon: <Clock className="h-8 w-8 text-primary" />,
    },
    {
      title: "دفع آمن",
      description: "نوفر بوابات دفع آمنة وموثوقة لحماية بياناتك المالية.",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    },
    {
      title: "دعم فني 24/7",
      description:
        "فريق دعم متواجد على مدار الساعة للرد على استفساراتكم وحل المشاكل.",
      icon: <HeadphonesIcon className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 shadow-[0_0_15px_rgba(255,0,122,0.2)]">
              <span className="font-sans">لماذا تختارنا؟</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight font-heading">
              نقدم لك أفضل تجربة <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">في عالم الخدمات الرقمية</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-sans">
              في زارز، نلتزم بتقديم خدمات رقمية عالية الجودة مع التركيز على سرعة
              الإنجاز ورضا العميل. نحن نفهم احتياجاتك ونعمل جاهدين لتلبيتها.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="perf-card p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 text-center relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 relative z-10 font-heading">
                  +1000
                </div>
                <div className="text-sm text-muted-foreground font-medium relative z-10 font-sans">
                  عميل سعيد
                </div>
              </div>
              <div className="perf-card p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 text-center relative overflow-hidden group hover:border-secondary/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 relative z-10 font-heading">
                  100%
                </div>
                <div className="text-sm text-muted-foreground font-medium relative z-10 font-sans">
                  ضمان الجودة
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="perf-card flex gap-6 p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,0,122,0.1)] hover:-translate-y-1"
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-background/50 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:border-primary/30 shadow-inner">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2 font-heading">{feature.title}</h3>
                  <p className="text-muted-foreground font-sans">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
