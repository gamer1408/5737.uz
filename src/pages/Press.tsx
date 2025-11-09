import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { Calendar, ExternalLink } from "lucide-react";

const Press = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pressReleases = [
    {
      title: "5737.UZ 1 million foydalanuvchiga erishdi",
      date: "2024-01-15",
      source: "Kun.uz",
      excerpt: "O'zbekiston hunarmandchilik platformasi yangi yutuqqa erishdi..."
    },
    {
      title: "Yangi hunarmandlar dasturi e'lon qilindi",
      date: "2023-12-20",
      source: "Gazeta.uz",
      excerpt: "Yosh hunarmandlarni qo'llab-quvvatlash dasturi boshlandi..."
    },
    {
      title: "Xalqaro bozorga chiqish rejalari",
      date: "2023-11-10",
      source: "Daryo.uz",
      excerpt: "5737.UZ xalqaro kengayish strategiyasini e'lon qildi..."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Matbuot</h1>
            <p className="text-muted-foreground">Bizning yangiliklar va e'lonlarimiz</p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((item, index) => (
              <div key={index} className="bg-card border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(item.date).toLocaleDateString('uz-UZ')}
                      </div>
                      <span>{item.source}</span>
                    </div>
                    <p className="text-muted-foreground">{item.excerpt}</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground ml-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-card border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Matbuot uchun</h2>
            <p className="text-muted-foreground mb-6">
              Matbuot so'rovlari va hamkorlik uchun bizga murojaat qiling
            </p>
            <p className="text-primary font-medium">press@5737.uz</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;