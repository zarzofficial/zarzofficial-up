import { ArrowLeft, Zap, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
      {/* Cyber-Luxe Background gradients */}
      <div className="absolute inset-0 -z-10 bg-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-right"
          >
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 shadow-[0_0_15px_rgba(255,0,122,0.2)]"
            >
              <Zap className="ml-2 h-4 w-4" />
              <span className="font-sans">أسرع متجر للخدمات الرقمية</span>
            </motion.div>

            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] font-heading"
            >
              تسوق كل ما تحتاجه في{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary to-secondary">مكان واحد</span>
            </motion.h1>

            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg font-sans"
            >
              تجربة أسرع وأوضح للطلبات الرقمية. شحن ألعاب، اشتراكات، تطوير
              مواقع، وخدمات السوشيال ميديا بضغطة زر.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.5 }}
               className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(255,0,122,0.4)] hover:shadow-[0_0_30px_rgba(255,0,122,0.6)] transition-all"
                render={<Link to="/products" />}
              >
                تصفح الخدمات
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 hover:border-secondary/50 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all backdrop-blur-md"
                render={<Link to="/contact" />}
              >
                تواصل معنا
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent rounded-[2rem] blur-3xl"></div>
            <motion.div 
               whileHover={{ y: -10 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
               className="relative bg-card/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4">
                  <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="h-32 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-white/10 flex items-center justify-center shadow-inner"
                  >
                    <ShoppingBag className="h-10 w-10 text-secondary" />
                  </motion.div>
                  <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-white/10 flex items-center justify-center shadow-inner"
                  >
                    <Zap className="h-10 w-10 text-primary drop-shadow-[0_0_10px_rgba(255,0,122,0.5)]" />
                  </motion.div>
                </div>
                <div className="space-y-4 mt-8">
                  <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="h-48 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 border border-white/10 flex items-center justify-center shadow-inner"
                  >
                    <ArrowLeft className="h-10 w-10 text-success" />
                  </motion.div>
                  <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="h-32 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-white/10 flex items-center justify-center shadow-inner backdrop-blur-md"
                  >
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-heading tracking-widest">
                      ZARZ
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
