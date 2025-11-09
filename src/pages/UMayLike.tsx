import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import YouMayLike from "@/components/YouMayLike";
import { Sparkles, Heart, TrendingUp } from "lucide-react";

const UMayLike = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-br from-primary via-accent to-primary-hover overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container-premium h-full flex items-center justify-center text-center">
          <div className="max-w-3xl animate-slide-up">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-bounce" />
              <Heart className="h-6 w-6 text-red-400 animate-pulse" />
              <TrendingUp className="h-6 w-6 text-green-400 animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-yellow-300">U May Like</span> ✨
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Sizning didingizga mos kelgan maxsus tanlangan mahsulotlar
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
              <span className="text-white font-medium">Shaxsiy tavsiyalar asosida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <YouMayLike 
        title="Sizning uchun maxsus"
        subtitle="Oldingi tanlovlaringiz va qiziqishlaringiz asosida tanlangan"
        maxItems={12}
      />

      <Footer />
    </div>
  );
};

export default UMayLike;