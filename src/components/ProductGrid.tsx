import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { products } from "@/lib/products";
import categories from "@/db/categories.json";

const ProductGrid = () => {
  return (
    <section className="py-16 bg-background" aria-label="Featured products">
      <div className="container-premium">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Tanlangan kolleksiyalar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An'anaviy o'zbek hunarmandchiligi va zamonaviy nafislikni uyg'unlashtirgan qo'lda tanlangan buyumlarni kashf eting
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Categories Section */}
        <div className="mt-20">
          {categories.map((category) => {
            const categoryProducts = products.filter(product => 
              category.productIds.includes(product.id)
            ).slice(0, 4);
            
            return (
              <div key={category.id} className="mb-16">
                <Link 
                  to={`/category/${category.id}`}
                  className="text-2xl font-bold mb-8 hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {category.name} &gt;
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
