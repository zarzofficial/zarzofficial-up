import { Code, Gamepad2, Share2, Tv } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function Categories() {
  const categories = [
    {
      title: "ألعاب الفيديو",
      description: "شحن شدات، كوينز، وبطاقات ألعاب بأفضل الأسعار.",
      icon: <Gamepad2 className="h-8 w-8 text-primary" />,
      color: "bg-blue-500/10",
    },
    {
      title: "الاشتراكات الرقمية",
      description: "نتفلكس، يوتيوب بريميوم، وسبوتيفاي وغيرها.",
      icon: <Tv className="h-8 w-8 text-primary" />,
      color: "bg-purple-500/10",
    },
    {
      title: "وسائل التواصل",
      description: "زيادة متابعين، لايكات، ومشاهدات لحساباتك.",
      icon: <Share2 className="h-8 w-8 text-primary" />,
      color: "bg-pink-500/10",
    },
    {
      title: "تطوير المواقع",
      description: "برمجة وتصميم مواقع ومتاجر إلكترونية احترافية.",
      icon: <Code className="h-8 w-8 text-primary" />,
      color: "bg-emerald-500/10",
    },
  ];

  return (
    <section id="categories" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading">
            أقسامنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">الرئيسية</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-sans">
            نقدم مجموعة واسعة من الخدمات الرقمية لتلبية كافة احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <Link to="/products" key={idx} className="block">
              <Card
                className="group h-full border-white/10 bg-card/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,0,122,0.15)]"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-white/5`}
                  >
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl font-heading">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground font-sans">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
