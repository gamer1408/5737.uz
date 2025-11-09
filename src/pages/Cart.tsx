import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { ProductOverviewDialog } from "@/components/ProductOverviewDialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { products } from "@/lib/products";

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal } = useCart();
  
  // Get other products (not in cart)
  const otherProducts = products.filter(product => 
    !items.some(item => item.id === product.id)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          {/* Cart Items Section */}
          <div className="mb-16">
            <h1 className="text-3xl font-bold mb-8">Savatdagi mahsulotlar</h1>
            
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-semibold mb-2">Savat bo'sh</h2>
                <p className="text-muted-foreground mb-6">
                  Mahsulotlarni savatga qo'shish uchun "Savatga qo'shish" tugmasini bosing
                </p>
                <Button asChild>
                  <Link to="/shop">Xarid qilishni boshlash</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-card border rounded-lg">
                    <ProductOverviewDialog product={item}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </ProductOverviewDialog>
                    
                    <div className="flex-1">
                      <ProductOverviewDialog product={item}>
                        <div className="cursor-pointer">
                          <h3 className="font-medium mb-2">{item.name}</h3>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < Math.floor(item.rating || 4.5)
                                    ? "text-accent"
                                    : "text-muted-foreground"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({item.rating || 4.5})
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
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right min-w-[100px]">
                        <p className="font-bold text-primary">
                          {(item.price * item.quantity).toLocaleString()} UZS
                        </p>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Total Cost & Payment */}
            {items.length > 0 && (
              <>
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Jami narx:</span>
                    <span className="text-2xl font-bold text-primary">
                      {getTotal().toLocaleString()} UZS
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-accent hover:bg-accent-hover"
                    onClick={() => {
                      // Show coming soon message
                      alert('🚀 Tez orada!\n\nBiz sizning uchun mukammal to\'lov tizimini tayyorlayapmiz. Sabrli bo\'ling, ajoyib yangiliklar kutmoqda! ✨');
                    }}
                  >
                    To'lov qilish
                  </Button>
                </div>
              </>
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

export default Cart;