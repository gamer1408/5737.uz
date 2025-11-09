import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";

export function ShoppingCartDialog() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      aria-label="Savatdagi mahsulotlar"
      asChild
    >
      <Link to="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge 
            variant="secondary"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-semibold"
          >
            {totalItems}
          </Badge>
        )}
      </Link>
    </Button>
  );
}