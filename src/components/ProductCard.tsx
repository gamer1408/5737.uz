import { Heart, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLikedProducts } from "@/hooks/useLikedProducts";
import { useCart } from "@/hooks/useCart";
import { useUserTracking } from "@/hooks/useUserTracking";
import { animateToCart } from "@/lib/animate-to-cart";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ProductOverviewDialog } from "@/components/ProductOverviewDialog";
import categories from "@/db/categories.json";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  badge?: string;
  rating?: number;
  inStock?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  images,
  category,
  badge,
  rating = 4.5,
  inStock = true,
}: ProductCardProps) => {
  const { addProduct, removeProduct, isLiked } = useLikedProducts();
  const { addItem } = useCart();
  const { trackView, trackLike, trackCartAdd } = useUserTracking();
  const liked = isLiked(id);

  // Get category ID for tracking
  const categoryId = categories.find(cat => 
    cat.productIds.includes(id)
  )?.id || 1;

  const handleLikeClick = () => {
    if (liked) {
      removeProduct(id);
    } else {
      addProduct({ id, name, price, image, category });
      trackLike(id, categoryId);
    }
  };

  const [buttonState, setButtonState] = useState<'default' | 'adding' | 'success'>('default');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (buttonState !== 'default') return;
    
    // Start the animation sequence
    setButtonState('adding');

    // Find the cart button in the header
    const cartButton = document.querySelector('[aria-label="Shopping cart"]');
    if (buttonRef.current && cartButton) {
      animateToCart({
        sourceElement: buttonRef.current,
        targetElement: cartButton as HTMLElement,
      });
    }

    // Add item to cart
    addItem({ id, name, price, image, category });
    trackCartAdd(id, categoryId);

    // Show success state
    setTimeout(() => {
      setButtonState('success');
      
      // Reset to default state after showing success
      setTimeout(() => {
        setButtonState('default');
      }, 1500); // Show checkmark for 1.5 seconds
    }, 750); // Wait for flying animation to complete
  };
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Track product view when component mounts
  useEffect(() => {
    trackView(id, categoryId);
  }, [id, categoryId, trackView]);

  return (
    <ProductOverviewDialog product={{ id, name, price, image, images, category }}>
      <article className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-smooth border border-border cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
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



        {/* Action Icons */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {/* Like Icon */}
          <Button
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full shadow-lg transition-all duration-300",
              liked ? "bg-primary text-white hover:bg-primary-hover" : "bg-white hover:bg-primary text-gray-700 hover:text-white"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLikeClick();
            }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-5 w-5", liked && "fill-current")} />
          </Button>
          
          {/* Shop Icon */}
          <Button
            ref={buttonRef}
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full shadow-lg transition-all duration-300",
              buttonState === 'default' && "bg-white hover:bg-blue-500 text-gray-700 hover:text-white",
              buttonState === 'adding' && "bg-blue-500 text-white scale-110",
              buttonState === 'success' && "bg-green-500 text-white scale-110"
            )}
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(e);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label={`Add ${name} to cart`}
          >
            {buttonState === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <ShoppingBag className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <Link 
          to={`/category/${categories.find(cat => cat.productIds.includes(id))?.id || 1}`}
          className="text-xs text-muted-foreground font-medium hover:text-primary transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {category}
        </Link>
        <h3 className="font-medium text-sm line-clamp-2 text-foreground">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
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
          <span className="text-base font-bold text-foreground">
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
    </ProductOverviewDialog>
  );
};

export default ProductCard;
