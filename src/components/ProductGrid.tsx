import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Premium Silk Ikat Dress",
    price: 850000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
    category: "Traditional Wear",
    badge: "Bestseller",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: "Modern Chapan Jacket",
    price: 680000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
    category: "Outerwear",
    badge: "New",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 3,
    name: "Embroidered Suzani Cushion",
    price: 120000,
    originalPrice: 180000,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=600&fit=crop",
    category: "Home Decor",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 4,
    name: "Handcrafted Ceramic Set",
    price: 450000,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop",
    category: "Kitchenware",
    badge: "Limited",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: "Traditional Doppi Hat",
    price: 95000,
    originalPrice: 130000,
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&h=600&fit=crop",
    category: "Accessories",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 6,
    name: "Silk Scarf Collection",
    price: 280000,
    image: "https://images.unsplash.com/photo-1601924638867-17fpc4c41c3e?w=600&h=600&fit=crop",
    category: "Accessories",
    badge: "Hot",
    rating: 4.8,
    inStock: false,
  },
  {
    id: 7,
    name: "Leather Boots - Modern Design",
    price: 720000,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop",
    category: "Footwear",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 8,
    name: "Wedding Collection Set",
    price: 2500000,
    originalPrice: 3200000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop",
    category: "Special Occasions",
    badge: "Exclusive",
    rating: 5.0,
    inStock: true,
  },
];

const ProductGrid = () => {
  return (
    <section className="py-16 bg-background" aria-label="Featured products">
      <div className="container-premium">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Featured Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover handpicked items that blend traditional Uzbek craftsmanship with modern elegance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
