import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { useLikedProducts } from "@/hooks/useLikedProducts";
import { Link } from "react-router-dom";

export function LikedProductsDialog() {
  const { likedProducts } = useLikedProducts();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      aria-label={`Yoqtirilgan mahsulotlar (${likedProducts.length})`}
      asChild
    >
      <Link to="/liked">
        <Heart className="h-5 w-5" />
        {likedProducts.length > 0 && (
          <Badge 
            variant="secondary"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-semibold"
          >
            {likedProducts.length}
          </Badge>
        )}
      </Link>
    </Button>
  );
}