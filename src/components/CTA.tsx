import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 font-heading">
          خلنا نحول طلبك إلى <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">تنفيذ سريع ومرتب</span>
        </h2>

        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-sans">
          لا تضيع وقتك، ابدأ الآن واستمتع بأفضل الخدمات الرقمية في مكان واحد.
        </p>

        <Button
          size="lg"
          className="h-14 px-10 text-lg rounded-full shadow-[0_0_30px_rgba(255,0,122,0.5)] hover:shadow-[0_0_50px_rgba(255,0,122,0.8)] hover:scale-105 transition-all duration-300"
          render={<Link to="/products" />}
        >
          اطلب خدمتك الآن
          <ArrowLeft className="mr-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
