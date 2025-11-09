import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { RecommendedProduct } from '@/lib/RecommendationEngine';
import { useUserTracking } from '@/hooks/useUserTracking';

interface RecommendedProductsProps {
  userId?: string;
  title?: string;
  limit?: number;
}

const RecommendedProducts = ({ 
  userId = 'anonymous', 
  title = "Sizga tavsiya etilgan mahsulotlar",
  limit = 8 
}: RecommendedProductsProps) => {
  const { recommendations, refreshRecommendations } = useUserTracking(userId);
  const [displayedProducts, setDisplayedProducts] = useState<RecommendedProduct[]>([]);

  useEffect(() => {
    setDisplayedProducts(recommendations.slice(0, limit));
  }, [recommendations, limit]);

  if (displayedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-premium">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">
            Sizning xarid tarixingiz asosida tanlangan mahsulotlar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard {...product} />
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {product.reason}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={refreshRecommendations}
            className="text-primary hover:text-primary-hover font-medium"
          >
            Yangi tavsiyalar ko'rish
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;