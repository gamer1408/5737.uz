import { ArrowLeft, Plus, Minus, ShoppingCart, Check, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { ProductOverviewDialog } from "@/components/ProductOverviewDialog";
import Footer from "@/components/Footer";
import { useLikedProducts } from "@/hooks/useLikedProducts";
import { useCart } from "@/hooks/useCart";
import { products } from "@/lib/products";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LikedProducts = () => {
  const { likedProducts, removeProduct } = useLikedProducts();
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});
  
  // Get other products (not liked)
  const otherProducts = products.filter(product => 
    !likedProducts.some(liked => liked.id === product.id)
  ).slice(0, 4);

  const getQuantity = (id: number) => quantities[id] || 1;
  
  const updateQuantity = (id: number, change: number) => {
    const newQty = Math.max(1, getQuantity(id) + change);
    setQuantities(prev => ({ ...prev, [id]: newQty }));
  };

  const totalCost = likedProducts.reduce((sum, product) => 
    sum + (product.price * getQuantity(product.id)), 0
  );

  const addToCart = (product: any) => {
    const qty = getQuantity(product.id);
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
    
    // Show success animation
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container-premium">
          <div className="flex h-16 items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Orqaga
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="container-premium">
          {/* Liked Products Section */}
          <div className="mb-16">
            <h1 className="text-3xl font-bold mb-8">Yoqtirilgan mahsulotlar</h1>
            
            {likedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💝</div>
                <h2 className="text-2xl font-semibold mb-2">Hali yoqtirilgan mahsulotlar yo'q</h2>
                <p className="text-muted-foreground mb-6">
                  Mahsulotlarni yoqtirish uchun yurak belgisini bosing
                </p>
                <Button asChild>
                  <Link to="/shop">Xarid qilishni boshlash</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {likedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 bg-card border rounded-lg">
                    <ProductOverviewDialog product={product}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </ProductOverviewDialog>
                    
                    <div className="flex-1">
                      <ProductOverviewDialog product={product}>
                        <div className="cursor-pointer">
                          <h3 className="font-medium mb-2">{product.name}</h3>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < Math.floor(product.rating || 4.5)
                                    ? "text-accent"
                                    : "text-muted-foreground"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.rating || 4.5})
                            </span>
                          </div>
                        </div>
                      </ProductOverviewDialog>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(product.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{getQuantity(product.id)}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right min-w-[100px]">
                        <p className="font-bold text-primary">
                          {(product.price * getQuantity(product.id)).toLocaleString()} UZS
                        </p>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 w-8 p-0 bg-primary text-white hover:bg-primary-hover"
                        onClick={() => removeProduct(product.id)}
                        aria-label="Remove from wishlist"
                      >
                        <Heart className="h-3 w-3 fill-current" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        className={cn(
                          "h-8 w-8 p-0 transition-all duration-300",
                          addedItems[product.id] 
                            ? "bg-green-500 hover:bg-green-600 scale-110" 
                            : "bg-primary hover:bg-primary-hover"
                        )}
                        onClick={() => addToCart(product)}
                      >
                        {addedItems[product.id] ? (
                          <Check className="h-3 w-3 animate-checkmark" />
                        ) : (
                          <ShoppingCart className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Total Cost */}
            {likedProducts.length > 0 && (
              <div className="mt-6 p-4 bg-secondary rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Jami narx:</span>
                  <span className="text-2xl font-bold text-primary">
                    {totalCost.toLocaleString()} UZS
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Other Products Section */}
          {otherProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Boshqa mahsulotlar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LikedProducts;