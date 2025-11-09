import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const GiftCards = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const giftAmounts = [50000, 100000, 200000, 500000];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium">
          <div className="text-center mb-12">
            <Gift className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-2">Sovg'a kartalari</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Yaqinlaringizga mukammal sovg'a - ular o'zlari yoqtirgan mahsulotni tanlash imkoniyati
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {giftAmounts.map((amount) => (
              <div key={amount} className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-smooth">
                <div className="text-2xl font-bold text-primary mb-2">
                  {amount.toLocaleString()} UZS
                </div>
                <p className="text-muted-foreground mb-4">Sovg'a kartasi</p>
                <Button className="w-full">Xarid qilish</Button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GiftCards;