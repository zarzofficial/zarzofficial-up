import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "كم يستغرق تنفيذ الطلب؟",
      answer:
        "معظم الطلبات الرقمية مثل شحن الألعاب والاشتراكات يتم تنفيذها فورياً أو خلال دقائق معدودة. خدمات التطوير قد تستغرق وقتاً أطول حسب حجم المشروع.",
    },
    {
      question: "ما هي طرق الدفع المتاحة؟",
      answer:
        "نوفر طرق دفع متعددة وآمنة تشمل مدى، فيزا، ماستركارد، أبل باي، واس تي سي باي.",
    },
    {
      question: "هل المنتجات الرقمية مضمونة؟",
      answer:
        "نعم، جميع منتجاتنا الرقمية مضمونة 100% ونقدم دعماً فنياً لحل أي مشكلة قد تواجهك.",
    },
    {
      question: "كيف يمكنني التواصل مع الدعم الفني؟",
      answer:
        "يمكنك التواصل معنا عبر الواتساب أو البريد الإلكتروني الموضح في أسفل الصفحة، ونحن متواجدون على مدار الساعة لخدمتك.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading">أسئلة <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">شائعة</span></h2>
          <p className="text-muted-foreground text-lg font-sans">
            إجابات على أكثر الأسئلة التي تصلنا
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="perf-card border-white/10 px-6 bg-card/20 backdrop-blur-md mb-4 rounded-2xl border hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-lg font-black hover:text-primary text-right font-heading hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed font-sans pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
