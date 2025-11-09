import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Shield } from "lucide-react";

const Returns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showDownload, setShowDownload] = useState(false);

  const handleDownloadPDF = () => {
    setShowDownload(true);
    // Simulate PDF download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/qaytarish-va-almashtirish.pdf';
      link.download = 'qaytarish-va-almashtirish.pdf';
      link.click();
      setShowDownload(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Qaytarish va almashtirish</h1>
            <p className="text-muted-foreground">Mahsulotlarni qaytarish va almashtirish shartlari</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border rounded-lg p-6 text-center">
              <RefreshCw className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">14 kun</h3>
              <p className="text-muted-foreground">Qaytarish muddati</p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Kafolat</h3>
              <p className="text-muted-foreground">Sifat kafolati</p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Download className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">PDF hujjat</h3>
              <p className="text-muted-foreground">Batafsil ma'lumot</p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Asosiy shartlar</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Mahsulot xarid qilingan kundan boshlab 14 kun ichida qaytarish mumkin</li>
              <li>• Mahsulot asl holatida va qadoqda bo'lishi kerak</li>
              <li>• Chek yoki buyurtma raqami talab qilinadi</li>
              <li>• Shaxsiy gigiena mahsulotlari qaytarilmaydi</li>
              <li>• Maxsus buyurtma asosida yasalgan mahsulotlar qaytarilmaydi</li>
            </ul>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleDownloadPDF}
              disabled={showDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {showDownload ? "Yuklanmoqda..." : "Batafsil PDF yuklab olish"}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;