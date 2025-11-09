import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, TrendingUp, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import subcategories from "@/db/subcategories.json";
import categories from "@/db/categories.json";
import { cn } from "@/lib/utils";

const SubcategoryGrid = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});

  // Simulate real-time view counts
  useEffect(() => {
    const interval = setInterval(() => {
      setViewCounts(prev => {
        const newCounts = { ...prev };
        subcategories.forEach(sub => {
          if (!newCounts[sub.id]) newCounts[sub.id] = Math.floor(Math.random() * 50) + 10;
          if (Math.random() > 0.7) newCounts[sub.id] += 1;
        });
        return newCounts;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getParentCategory = (categoryId: number) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const getUrgencyColor = (urgency: string) => {
    if (urgency.includes("tugaydi") || urgency.includes("qoldi")) return "bg-red-500";
    if (urgency.includes("Yangi") || urgency.includes("Trend")) return "bg-blue-500";
    if (urgency.includes("Premium") || urgency.includes("Limited")) return "bg-purple-500";
    return "bg-green-500";
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container-premium">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Maxsus Kolleksiyalar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Har bir kategoriyada eng yaxshi tanlovlar - professional kuratorlar tomonidan tanlangan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subcategories.map((subcategory, index) => {
            const parentCategory = getParentCategory(subcategory.categoryId);
            const isHovered = hoveredCard === subcategory.id;
            const viewCount = viewCounts[subcategory.id] || Math.floor(Math.random() * 50) + 10;
            
            return (
              <Link
                key={subcategory.id}
                to={`/subcategory/${subcategory.id}`}
                className="group block"
                onMouseEnter={() => setHoveredCard(subcategory.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <article className={cn(
                  "relative bg-card rounded-2xl overflow-hidden shadow-lg transition-all duration-500 border border-border/50",
                  "hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1",
                  isHovered && "ring-2 ring-primary/50"
                )}>
                  
                  {/* Animated Background Gradient */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
                    "from-primary/10 via-accent/5 to-secondary/10",
                    isHovered && "opacity-100"
                  )} />

                  {/* Header with Icon and Category */}
                  <div className="relative p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-bounce-subtle">
                        {subcategory.icon}
                      </div>
                      <Badge variant="outline" className="text-xs font-medium">
                        {parentCategory?.name}
                      </Badge>
                    </div>

                    {/* Live Activity Indicators */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span className="font-mono">{viewCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-600 font-medium">Live</span>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {subcategory.description}
                    </p>

                    {/* Psychological Triggers */}
                    <div className="space-y-2 mb-4">
                      <Badge className={cn(
                        "text-xs font-semibold text-white animate-pulse-subtle",
                        getUrgencyColor(subcategory.urgency)
                      )}>
                        <Clock className="h-3 w-3 mr-1" />
                        {subcategory.urgency}
                      </Badge>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{subcategory.socialProof}</span>
                      </div>
                    </div>

                    {/* Product Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {subcategory.productIds.length} mahsulot
                      </span>
                      <TrendingUp className={cn(
                        "h-4 w-4 text-green-500 transition-transform duration-300",
                        isHovered && "scale-110 rotate-12"
                      )} />
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/90 to-transparent",
                    "transform translate-y-full transition-transform duration-300",
                    isHovered && "translate-y-0"
                  )}>
                    <Button className="w-full bg-white text-primary hover:bg-white/90 font-semibold">
                      Ko'rish →
                    </Button>
                  </div>

                  {/* Floating Elements */}
                  <div className={cn(
                    "absolute top-4 right-4 w-8 h-8 bg-accent/20 rounded-full",
                    "transition-all duration-500",
                    isHovered && "scale-150 bg-accent/40"
                  )} />
                  
                  {/* Stagger Animation Delay */}
                  <style jsx>{`
                    article {
                      animation-delay: ${index * 100}ms;
                    }
                  `}</style>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Barcha kategoriyalarni ko'ring</h3>
          <p className="text-muted-foreground mb-6">
            1000+ qo'lda yasalgan mahsulotlar sizni kutmoqda
          </p>
          <Button asChild size="lg" className="animate-gentle-pulse">
            <Link to="/shop">
              Barcha mahsulotlar →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubcategoryGrid;