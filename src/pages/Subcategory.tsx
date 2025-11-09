import { useParams } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { products } from "@/lib/products";
import categories from "@/db/categories.json";
import subcategories from "@/db/subcategories.json";
import { useState, useEffect } from "react";

const Subcategory = () => {
  const { id } = useParams();
  const subcategoryId = Number(id);
  const subcategory = subcategories.find(s => s.id === subcategoryId);
  const parentCategory = subcategory ? categories.find(c => c.id === subcategory.categoryId) : null;
  
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState([1000000]);
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);

  if (!subcategory || !parentCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CategoryNav />
        <div className="container-premium py-16 text-center">
          <h2 className="text-2xl font-semibold">Subkategoriya topilmadi</h2>
          <Button asChild className="mt-4">
            <Link to="/">Bosh sahifaga qaytish</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const subcategoryProducts = products.filter(product => 
    subcategory.productIds.includes(product.id)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subcategoryId]);

  useEffect(() => {
    let filtered = subcategoryProducts.filter(product => {
      const matchesPrice = product.price <= priceRange[0];
      const matchesSale = !onSale || product.originalPrice;
      const matchesStock = !inStock || product.inStock;
      
      return matchesPrice && matchesSale && matchesStock;
    });
    
    setFilteredProducts(filtered);
  }, [subcategoryProducts, priceRange, onSale, inStock]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium">
          <div className="flex justify-start mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/category/${parentCategory.id}`} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {parentCategory.name}
              </Link>
            </Button>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{subcategory.icon}</span>
              <div>
                <h1 className="text-3xl font-bold">{subcategory.name}</h1>
                <p className="text-muted-foreground">{subcategory.description}</p>
              </div>
            </div>
            <hr className="border-black" />
          </div>

          <div className="flex gap-8">
            <div className="w-64 flex-shrink-0">
              <div className="bg-card border rounded-lg p-6 sticky top-4">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-semibold">Filtrlar</h3>
                </div>
                
                <hr className="border-black mb-6" />
                
                <div className="mb-6">
                  <h4 className="font-medium mb-4">Narx</h4>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000000}
                      min={50000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground text-center">
                      {priceRange[0].toLocaleString()} UZS gacha
                    </div>
                  </div>
                </div>
                
                <hr className="border-black mb-6" />
                
                <div className="mb-6">
                  <h4 className="font-medium mb-4">Mavjudlik</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="sale"
                        checked={onSale}
                        onCheckedChange={setOnSale}
                      />
                      <label htmlFor="sale" className="text-sm cursor-pointer text-destructive font-medium">
                        Chegirmada
                      </label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="stock"
                        checked={inStock}
                        onCheckedChange={setInStock}
                      />
                      <label htmlFor="stock" className="text-sm cursor-pointer">
                        Faqat mavjud
                      </label>
                    </div>
                  </div>
                </div>
                
                <hr className="border-black mb-6" />
                
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{filteredProducts.length}</span> ta mahsulot topildi
                </div>
              </div>
            </div>

            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold mb-2">
                    Bu filtrlar bo'yicha mahsulot yo'q
                  </h3>
                  <p className="text-muted-foreground">
                    Filtrlarni o'zgartirib ko'ring
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Subcategory;