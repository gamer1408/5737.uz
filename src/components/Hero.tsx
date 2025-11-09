import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    id: 1,
    title: "O'zingizning imzo uslubingizni kashf eting",
    subtitle: "Zamonaviy O'zbekiston uchun tanlangan kolleksiyalar",
    cta: "Yangi kelganlarni xarid qiling",
    bgGradient: "from-primary via-primary-hover to-primary",
  },
  {
    id: 2,
    title: "Eksklyuziv Navruz kolleksiyasi",
    subtitle: "Bahorni an'anaviy nafislik bilan nishonlang",
    cta: "Kolleksiyani kashf eting",
    bgGradient: "from-accent via-accent-hover to-accent",
  },
  {
    id: 3,
    title: "Premium sifat kafolatlangan",
    subtitle: "50,000+ o'zbek oilalari ishonadi",
    cta: "Batafsil ma'lumot",
    bgGradient: "from-primary via-accent to-primary",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section 
      className="relative h-[600px] md:h-[700px] overflow-hidden"
      aria-label="Hero carousel"
      role="region"
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <div className={`h-full w-full bg-gradient-to-br ${slide.bgGradient}`}>
            <div className="container-premium h-full flex items-center">
              <div className="max-w-2xl space-y-6 text-white">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-slide-up">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 animate-fade-in">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-smooth mt-8 text-lg px-8 py-6"
                  aria-label={slide.cta}
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-smooth z-10"
        aria-label="Oldingi slayd"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-smooth z-10"
        aria-label="Keyingi slayd"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10"
        role="tablist"
        aria-label="Slayd navigatsiyasi"
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-smooth ${
              index === currentSlide
                ? "w-12 bg-white"
                : "w-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`${index + 1}-slaydga o'tish`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
