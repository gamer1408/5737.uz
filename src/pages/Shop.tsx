import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouMayLike from "@/components/YouMayLike";
import { Button } from "@/components/ui/button";
import categories from "@/db/categories.json";

const Shop = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "The quality of the Suzani I bought is beyond words. You can feel the history in every thread.", author: "Alex R., Berlin" },
    { text: "Absolutely stunning ceramics! They arrived perfectly packaged and are the new centerpiece of my dining table.", author: "Chloe S., London" },
    { text: "Fast shipping and authentic products. The customer service was also incredibly helpful. Highly recommend!", author: "Michael P., New York" }
  ];

  const categoryImages = {
    1: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=400&fit=crop",
    2: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", 
    3: "https://images.unsplash.com/photo-1607083206325-67462734850d?w=400&h=400&fit=crop",
    4: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    5: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop",
    6: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    7: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"
  };
  
  const socialProofs = [
    "🔥 15 kishi ko'rmoqda",
    "✓ Yangi kelganlar", 
    "⚡️ Bugun 8 ta sotildi",
    "🎆 Mashhur",
    "🎁 Chegirmada",
    "💎 Premium",
    "✨ Eksklyuziv"
  ];

  // Enhanced countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 24 hours when timer reaches 0
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation effect
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialTimer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      

      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary via-primary-hover to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container-premium h-full flex items-center justify-center text-center">
          <div className="max-w-2xl animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Kolleksiyalarimizni kashf eting
            </h1>
            <p className="text-xl text-white/90 mb-8">
              O'zbekiston qalbidan mukammal qo'lda yasalgan xazinani toping.
            </p>
            <Button 
              asChild
              size="lg"
              className="animate-gentle-pulse bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8 py-4"
            >
              <Link to="#categories">Kategoriyalarni kashf eting</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Flash Sale Timer */}
      <section className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container-premium text-center relative z-10">
          <div className="animate-bounce-subtle mb-3">
            <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <span className="animate-pulse text-yellow-300">⚡️</span>
              SAYT BO'YLAB CHEGIRMA TUGAYDI
              <span className="animate-pulse text-yellow-300">⚡️</span>
            </h2>
          </div>
          <div className="flex justify-center items-center space-x-3 text-3xl font-mono">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 animate-glow-pulse">
              <span className="block text-sm text-white/80">SOAT</span>
              <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
            </div>
            <span className="animate-pulse text-yellow-300 text-4xl">:</span>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 animate-glow-pulse">
              <span className="block text-sm text-white/80">DAQIQA</span>
              <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
            </div>
            <span className="animate-pulse text-yellow-300 text-4xl">:</span>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 animate-glow-pulse">
              <span className="block text-sm text-white/80">SONIYA</span>
              <span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
          <p className="mt-3 text-yellow-200 font-medium animate-pulse">Barcha mahsulotlarga 20% gacha chegirma!</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-16">
        <div className="container-premium">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Barcha kategoriyalar</h2>
            <p className="text-muted-foreground">O'zbekiston hunarmandchiligining eng yaxshi namunalari</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer block transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={categoryImages[category.id as keyof typeof categoryImages] || categoryImages[1]} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                  />
                  
                  {/* Minimalist Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Modern Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/20 ${
                      category.isSpecial 
                        ? 'bg-white/90 text-gray-800' 
                        : 'bg-black/50 text-white'
                    }`}>
                      {socialProofs[index % socialProofs.length]}
                    </div>
                  </div>
                </div>

                {/* Clean Content Section */}
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  {/* Minimalist CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Ko'rish</span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary transition-all duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Effect */}
                <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-primary/20 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary">
        <div className="container-premium text-center">
          <h2 className="text-3xl font-bold mb-12">Mijozlarimiz fikri</h2>
          <div className="max-w-3xl mx-auto">
            <blockquote 
              key={currentTestimonial}
              className="text-xl italic text-muted-foreground animate-slide-up"
            >
              <p className="mb-4">"{testimonials[currentTestimonial].text}"</p>
              <cite className="text-foreground font-semibold not-italic">
                - {testimonials[currentTestimonial].author}
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <YouMayLike 
        title="Sizning didingizga mos"
        subtitle="Oldingi tanlovlaringiz asosida maxsus tanlangan mahsulotlar"
        maxItems={8}
      />

      {/* Bonus Offer */}
      <section className="bg-accent text-accent-foreground py-8">
        <div className="container-premium text-center">
          <h3 className="text-2xl font-bold mb-2">🎁 100 DOLLARDAN ORTIQ BUYURTMALARGA BEPUL SOVG'A</h3>
          <p className="text-lg">
            Savatingizga yana ozgina qo'shing va chiroyli qo'lda yasalgan keramik taglik oling!
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;