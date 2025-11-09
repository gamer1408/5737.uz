import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, TrendingUp, Star, Globe, Shield, Zap } from "lucide-react";

const AboutUs = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [stats, setStats] = useState({
    artisans: 500,
    customers: 50000,
    countries: 25,
    years: 9
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "5737.UZ orqali xarid qilgan har bir mahsulot - bu hikoya. Sifat va an'ana ajoyib uyg'unlashgan.", author: "Aziza K., Toshkent", rating: 5 },
    { text: "Hunarmandlar bilan to'g'ridan-to'g'ri bog'lanish imkoniyati juda yoqdi. Haqiqiy O'zbek san'ati!", author: "John M., AQSh", rating: 5 },
    { text: "Har bir xarid bilan men O'zbekiston madaniyatini his qilaman. Rahmat sizga!", author: "Maria S., Germaniya", rating: 5 }
  ];

  useEffect(() => {
    // Animate stats
    const interval = setInterval(() => {
      setStats(prev => ({
        artisans: prev.artisans + Math.floor(Math.random() * 2),
        customers: prev.customers + Math.floor(Math.random() * 5),
        countries: prev.countries,
        years: prev.years
      }));
    }, 5000);

    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const timeline = [
    { year: "2015", event: "G'oya Samarqanddagi kichik ustaxonada tug'ildi.", icon: "🌱", impact: "1 hunarmand" },
    { year: "2018", event: "Birinchi 50 ta hunarmand bilan hamkorlik qildik.", icon: "🤝", impact: "50 hunarmand" },
    { year: "2021", event: "Global platformamizni ishga tushirdik, butun dunyo mijozlariga yetib bordik.", icon: "🌍", impact: "25 mamlakat" },
    { year: "2024", event: "500+ hunarmand, 50,000+ baxtli mijoz - biz katta oila bo'ldik!", icon: "🏆", impact: "500+ hunarmand" }
  ];

  const artisans = [
    {
      name: "Dilfuza Karimova",
      role: "3-avlod suzani tikuvchi",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      experience: "25 yil tajriba",
      specialty: "An'anaviy suzani",
      story: "Buvimdan o'rgangan san'atni dunyoga tanitish - mening orzuim edi."
    },
    {
      name: "Rustam Umarov", 
      role: "Usta kulol",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      experience: "30 yil tajriba",
      specialty: "Rishton keramikasi",
      story: "Har bir idish - bu mening qalbimning bir qismi."
    },
    {
      name: "Gulnara Nazarova",
      role: "Tabiiy bo'yoq mutaxassisi", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      experience: "20 yil tajriba",
      specialty: "Eco-friendly ranglar",
      story: "Tabiat bergan ranglar eng go'zal va xavfsiz."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.timeline-item').forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-br from-primary via-primary-hover to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)'}} />
        <div className="relative container-premium h-full flex items-center justify-center text-center">
          <div className="max-w-4xl animate-slide-up">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-red-400 animate-bounce" />
              <span className="text-white/90 font-medium">9 yildan beri sizning ishonchingiz</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-yellow-300">Merosni</span> saqlash,<br/>
              <span className="text-yellow-300">kelajakni</span> to'qish
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Har bir ip hikoya aytadi. <span className="font-bold text-yellow-300">{stats.artisans}+</span> hunarmand, 
              <span className="font-bold text-yellow-300">{stats.customers.toLocaleString()}+</span> baxtli mijoz
            </p>
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <Globe className="h-6 w-6 text-blue-300 mx-auto mb-1" />
                <span className="text-white text-sm font-medium">{stats.countries} mamlakat</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-300 mx-auto mb-1" />
                <span className="text-white text-sm font-medium">Premium sifat</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <Shield className="h-6 w-6 text-green-300 mx-auto mb-1" />
                <span className="text-white text-sm font-medium">100% haqiqiy</span>
              </div>
            </div>
            <Button 
              size="lg"
              className="animate-gentle-pulse bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg"
              onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🎨 Bizning hikoyamiz
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 animate-bounce-subtle">
                {stats.artisans}+
              </div>
              <div className="text-muted-foreground font-medium">Hunarmandlar</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2 animate-bounce-subtle">
                {stats.customers.toLocaleString()}+
              </div>
              <div className="text-muted-foreground font-medium">Baxtli mijozlar</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 animate-bounce-subtle">
                {stats.countries}
              </div>
              <div className="text-muted-foreground font-medium">Mamlakatlar</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2 animate-bounce-subtle">
                {stats.years}
              </div>
              <div className="text-muted-foreground font-medium">Yil tajriba</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline */}
      <section id="our-story" className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Bizning yo'limiz</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Kichik orzudan global platformagacha - har bir qadam muhim edi</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className={`timeline-item relative mb-12 transition-all duration-700 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                data-index={index}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-primary to-accent opacity-30" />
                    )}
                  </div>
                  <div className="ml-8 flex-1 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-primary">{item.year}</h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Artisans */}
      <section className="py-16 bg-white">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hunarmandlarimiz bilan tanishing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Har birining o'z hikoyasi, o'z san'ati - lekin bitta maqsad: O'zbek merosini saqlash</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisans.map((artisan, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="relative mb-6 inline-block">
                  <img 
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto transition-all duration-500 group-hover:scale-110 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{artisan.name}</h3>
                  <p className="text-primary font-semibold mb-2">{artisan.role}</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {artisan.experience}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {artisan.specialty}
                    </span>
                  </div>
                  <blockquote className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4">
                    "{artisan.story}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container-premium">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Mijozlarimiz fikri</h2>
            <p className="text-muted-foreground">Har bir baholash bizni oldinga olib boradi</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl italic text-gray-700 mb-6 animate-slide-up">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <cite className="text-primary font-semibold">
                - {testimonials[currentTestimonial].author}
              </cite>
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary scale-125' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container-premium">
          <h2 className="text-3xl font-bold text-center mb-12">Bizning qadriyatlarimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Haqiqiylik</h3>
              <p className="text-muted-foreground">Har bir buyum avloddan avlodga o'tgan an'anaviy usullar bilan yasaladi.</p>
            </div>
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🌱</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Barqarorlik</h3>
              <p className="text-muted-foreground">Atrof-muhitni himoya qilish uchun tabiiy materiallar va ekologik jarayonlardan foydalanamiz.</p>
            </div>
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-accent-foreground">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Jamiyat</h3>
              <p className="text-muted-foreground">Mahalliy hunarmandlarni qo'llab-quvvatlash va kelajak avlodlar uchun madaniy merosni saqlash.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-premium text-center">
          <NewsletterSignup variant="about" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;