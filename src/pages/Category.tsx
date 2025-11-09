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
import { useRecommendations } from "@/hooks/useRecommendations";
import { useState, useEffect } from "react";

const Category = () => {
  const { id } = useParams();
  const categoryId = Number(id);
  const category = categories.find(c => c.id === categoryId);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState([1000000]);
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);

  
  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CategoryNav />
        <div className="container-premium py-16 text-center">
          <h2 className="text-2xl font-semibold">Kategoriya topilmadi</h2>
          <Button asChild className="mt-4">
            <Link to="/">Bosh sahifaga qaytish</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const categorySubcategories = subcategories.filter(sub => sub.categoryId === categoryId);
  const { recommendations } = useRecommendations();
  
  const categoryProducts = categoryId === 0 ? recommendations : products.filter(product => {
    if (selectedSubcategory) {
      const subcategory = subcategories.find(sub => sub.id === selectedSubcategory);
      return subcategory?.productIds.includes(product.id) || false;
    }
    return category.productIds.includes(product.id);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  useEffect(() => {
    let filtered = categoryProducts.filter(product => {
      const matchesPrice = product.price <= priceRange[0];
      const matchesSale = !onSale || product.originalPrice;
      const matchesStock = !inStock || product.inStock;
      
      return matchesPrice && matchesSale && matchesStock;
    });
    
    setFilteredProducts(filtered);
  }, [categoryProducts, priceRange, onSale, inStock]);



  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium">
          {/* Back Button - Top Left */}
          <div className="flex justify-start mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Orqaga
              </Link>
            </Button>
          </div>

          {/* Category Header */}
          <div className={`mb-8 ${categoryId === 0 ? 'text-center' : ''}`}>
            {categoryId === 0 ? (
              <div className="relative py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl animate-pulse" />
                <div className="relative">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl animate-bounce">✨</span>
                    <span className="text-4xl animate-pulse">💎</span>
                    <span className="text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🎯</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-slide-up">
                    {category.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
                    Sizning didingizga mos kelgan maxsus tanlangan mahsulotlar
                  </p>
                  <div className="flex items-center justify-center gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-medium text-primary">🔥 Shaxsiy tanlov</span>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-medium text-green-600">⚡ Smart AI</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-muted-foreground mb-4">{category.description}</p>
              </>
            )}
            
            {/* Subcategories */}
            {categorySubcategories.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={selectedSubcategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubcategory(null)}
                    className="flex items-center gap-2 rounded-full"
                  >
                    <span className="text-lg">🏠</span>
                    Barchasi
                  </Button>
                  {categorySubcategories.map((subcategory) => (
                    <Button
                      key={subcategory.id}
                      variant={selectedSubcategory === subcategory.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSubcategory(subcategory.id)}
                      className="flex items-center gap-2 rounded-full"
                    >
                      <span className="text-lg">{subcategory.icon}</span>
                      {subcategory.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {categoryId !== 0 && <hr className="border-black" />}
          </div>

          {/* Main Layout with Sidebar */}
          <div className="flex gap-8">
            {/* Left Sidebar - Filters */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-card border rounded-lg p-6 sticky top-4">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-semibold">Filtrlar</h3>
                </div>
                
                <hr className="border-black mb-6" />
                
                {/* Price Filter */}
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
                
                {/* Availability Filters */}
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
                
                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{filteredProducts.length}</span> ta mahsulot topildi
                </div>
              </div>
            </div>

            {/* Right Content - Products */}
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

export default Category;