import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import YouMayLike from "@/components/YouMayLike";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      <main>
        <Hero />
        <YouMayLike />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
