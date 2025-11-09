import ProductCard from './ProductCard';
import { useRecommendations } from '@/hooks/useRecommendations';

interface YouMayLikeProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
}

const YouMayLike = ({ 
  title = "Mahsulotlar", 
  subtitle = "Tanlangan kolleksiyalar",
  maxItems = 8 
}: YouMayLikeProps) => {
  const { recommendations } = useRecommendations();

  if (recommendations.length === 0) return null;

  const displayProducts = recommendations.slice(0, maxItems);

  return (
    <section className="py-16 bg-background">
      <div className="container-premium">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMayLike;