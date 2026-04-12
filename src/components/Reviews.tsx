import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Reviews() {
  const reviews = [
    {
      name: "أحمد محمد",
      role: "عميل",
      content:
        "خدمة سريعة وممتازة جداً، طلبت شحن شدات ووصلتني في أقل من 5 دقائق. أنصح بالتعامل معهم بشدة.",
      rating: 5,
    },
    {
      name: "سارة خالد",
      role: "عميلة",
      content:
        "تعامل راقي ودعم فني متجاوب. اشتريت اشتراك نتفلكس وشغال بدون أي مشاكل. شكراً زارز!",
      rating: 5,
    },
    {
      name: "عبدالله فهد",
      role: "عميل",
      content:
        "أفضل متجر تعاملت معاه من ناحية الأسعار وسرعة التنفيذ. طلبت تصميم متجر وكان الشغل احترافي.",
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading">آراء <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">العملاء</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-sans">
            نفخر بثقة عملائنا ونسعى دائماً لتقديم الأفضل
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <Card key={idx} className="bg-card/40 backdrop-blur-xl border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,122,0.1)] hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary drop-shadow-[0_0_5px_rgba(255,0,122,0.5)]"
                    />
                  ))}
                </div>
                <p className="text-lg mb-8 leading-relaxed font-sans">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="border border-primary/30 shadow-[0_0_10px_rgba(255,0,122,0.2)]">
                    <AvatarFallback className="bg-primary/20 text-primary font-heading font-black">
                      {review.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-black font-heading">{review.name}</h4>
                    <p className="text-sm text-muted-foreground font-sans">
                      {review.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
