import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  rating?: number;
  inStock?: boolean;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  category,
  badge,
  rating = 4.5,
  inStock = true,
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <article className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-smooth border border-border">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-110 transition-smooth"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {badge && (
            <Badge className="bg-accent text-accent-foreground font-semibold">
              {badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive" className="font-semibold">
              -{discount}%
            </Badge>
          )}
          {!inStock && (
            <Badge variant="secondary" className="font-semibold">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full shadow-lg hover:scale-110 transition-smooth"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full shadow-lg hover:scale-110 transition-smooth"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart - Hover Action */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
            disabled={!inStock}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground font-medium">{category}</p>
        <h3 className="font-semibold text-base line-clamp-2 text-foreground">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(rating)
                    ? "text-accent"
                    : "text-muted-foreground"
                }`}
                aria-hidden="true"
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({rating})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">
            {price.toLocaleString()} UZS
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toLocaleString()} UZS
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
