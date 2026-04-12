import { CheckCircle2, MousePointerClick, Send } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "اختر الخدمة المناسبة",
      description:
        "تصفح أقسامنا واختر الخدمة التي تلبي احتياجك من بين مئات الخدمات المتاحة.",
      icon: <MousePointerClick className="h-6 w-6" />,
    },
    {
      title: "أرسل التفاصيل بسرعة",
      description:
        "قم بتعبئة البيانات المطلوبة للخدمة وأتمم عملية الدفع بطرق آمنة ومتعددة.",
      icon: <Send className="h-6 w-6" />,
    },
    {
      title: "تأكيد وتسليم",
      description: "سيتم تنفيذ طلبك في أسرع وقت ممكن مع إشعارك فور الانتهاء.",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading">
            كيف ننجز <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">طلبك؟</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-sans">
            خطوات بسيطة وسريعة للحصول على خدمتك
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-card/40 backdrop-blur-xl border border-primary/50 flex items-center justify-center text-primary mb-6 shadow-[0_0_20px_rgba(255,0,122,0.2)] group-hover:shadow-[0_0_30px_rgba(255,0,122,0.5)] group-hover:scale-110 transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-black mb-3 font-heading">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
