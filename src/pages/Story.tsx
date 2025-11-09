import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";

const Story = () => {
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
            <h1 className="text-3xl font-bold mb-2">Bizning hikoyamiz</h1>
            <p className="text-muted-foreground">5737.UZ qanday paydo bo'ldi</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-card border rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Boshlanish</h2>
              <p className="text-muted-foreground mb-4">
                2020-yilda, O'zbekiston hunarmandchiligini dunyoga tanituv g'oyasi bilan boshlangan 5737.UZ loyihasi bugun minglab oilalarning sevimli brendi bo'lib qoldi.
              </p>
              <p className="text-muted-foreground">
                Bizning maqsadimiz - an'anaviy o'zbek san'atini zamonaviy hayot bilan uyg'unlashtirish va har bir uyga o'ziga xos go'zallik olib kelish edi.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Bugun</h2>
              <p className="text-muted-foreground mb-4">
                Hozirda biz 200+ hunarmand bilan hamkorlik qilamiz va 50,000+ mijozga xizmat ko'rsatamiz. Har bir mahsulot qo'lda yasalgan va sifat nazoratidan o'tgan.
              </p>
              <p className="text-muted-foreground">
                Bizning jamoamiz har kuni O'zbekiston hunarmandchiligini rivojlantirish va dunyoga tanituv uchun mehnat qiladi.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Kelajak</h2>
              <p className="text-muted-foreground">
                Bizning rejalarimizda xalqaro bozorga chiqish, yangi hunarmandlar bilan hamkorlik va O'zbekiston san'atini butun dunyoga yetkazish bor.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Story;