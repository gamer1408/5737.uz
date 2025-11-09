import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { Truck, Clock, MapPin } from "lucide-react";

const Shipping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Yetkazib berish ma'lumoti</h1>
            <p className="text-muted-foreground">Buyurtmangizni qanday yetkazib berishimiz haqida</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border rounded-lg p-6 text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Bepul yetkazib berish</h3>
              <p className="text-muted-foreground">100,000 UZS dan ortiq buyurtmalarga</p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Tez yetkazib berish</h3>
              <p className="text-muted-foreground">Toshkent bo'ylab 1-2 kun</p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Butun O'zbekiston</h3>
              <p className="text-muted-foreground">Barcha viloyatlarga yetkazamiz</p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Yetkazib berish shartlari</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Toshkent shahri</h3>
                <p className="text-muted-foreground">1-2 ish kuni ichida, 15,000 UZS</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Toshkent viloyati</h3>
                <p className="text-muted-foreground">2-3 ish kuni ichida, 25,000 UZS</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Boshqa viloyatlar</h3>
                <p className="text-muted-foreground">3-5 ish kuni ichida, 35,000 UZS</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;