import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Filter, Clock, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { products } from "@/lib/products";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [priceRange, setPriceRange] = useState([1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onSale, setOnSale] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const { searches, addSearch, clearHistory, removeSearch } = useSearchHistory();

  const suggestions = ["Suzani", "Ikat", "Keramika", "Zargarlik", "Doppi"];
  const categories = ["An'anaviy kiyim", "Uy", "Aksessuarlar", "Zargarlik"];

  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
      addSearch(queryFromUrl);
    }
  }, [searchParams, addSearch]);

  useEffect(() => {
    let filtered = products;
    
    if (searchQuery.trim()) {
      filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = filtered.filter(product => {
      const matchesPrice = product.price <= priceRange[0];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesSale = !onSale || product.originalPrice;
      
      return matchesPrice && matchesCategory && matchesSale;
    });

    setFilteredProducts(filtered);
    setVisibleCards([]);

    // Staggered animation
    filtered.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 100);
    });
  }, [searchQuery, priceRange, selectedCategories, onSale]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className={searchQuery ? "bg-muted/20" : ""}>
        <Header />
      </div>
      


      <div className="container-premium py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl border sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Aqlli filtrlar</h3>
              </div>
              
              {/* Search History */}
              {searches.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-primary">Qidiruv tarixi</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearHistory}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Tozalash
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {searches.slice(0, 5).map((search, index) => (
                      <div key={index} className="flex items-center justify-between group">
                        <button
                          onClick={() => setSearchQuery(search)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex-1 text-left"
                        >
                          {search}
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSearch(search)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-primary">Kategoriya</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-primary">Narx</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000000}
                  min={50000}
                  step={10000}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {priceRange[0].toLocaleString()} UZS gacha
                </p>
              </div>

              {/* Special Offers */}
              <div>
                <h4 className="font-medium mb-3 text-primary">Maxsus takliflar</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sale"
                    checked={onSale}
                    onCheckedChange={setOnSale}
                  />
                  <label htmlFor="sale" className="text-sm cursor-pointer text-destructive">
                    Chegirmada
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Section */}
          <main className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {searchQuery ? `"${searchQuery}" uchun natijalar` : "Barcha mahsulotlar"}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} ta mahsulot topildi
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`transition-all duration-500 ${
                      visibleCards.includes(index)
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              /* No Results State */
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">
                  Hech narsa topilmadi
                </h3>
                <p className="text-muted-foreground mb-6">
                  "{searchQuery}" bo'yicha natija yo'q. Boshqa so'z bilan qidirib ko'ring.
                </p>
                <div className="mb-8">
                  <p className="mb-4">Masalan:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          addSearch(suggestion);
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4">Sizga yoqishi mumkin</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.slice(0, 6).map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;