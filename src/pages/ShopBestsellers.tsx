import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const ShopBestsellers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bestsellers = products.filter(p => p.rating && p.rating >= 4.5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Eng ko'p sotilganlar</h1>
            <p className="text-muted-foreground">Mijozlar eng ko'p xarid qilgan mahsulotlar</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopBestsellers;