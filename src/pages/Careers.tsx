import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { Button } from "@/components/ui/button";
import { Users, Heart, Zap } from "lucide-react";

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jobs = [
    {
      title: "Marketing mutaxassisi",
      department: "Marketing",
      type: "To'liq vaqt",
      location: "Toshkent"
    },
    {
      title: "Mahsulot menejeri",
      department: "Mahsulot",
      type: "To'liq vaqt", 
      location: "Toshkent"
    },
    {
      title: "Dizayner",
      department: "Dizayn",
      type: "Yarim vaqt",
      location: "Masofaviy"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Karyera</h1>
            <p className="text-muted-foreground">Bizning jamoamizga qo'shiling</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border rounded-lg p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Jamoa</h3>
              <p className="text-muted-foreground">50+ xodim</p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Madaniyat</h3>
              <p className="text-muted-foreground">Do'stona muhit</p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Rivojlanish</h3>
              <p className="text-muted-foreground">Doimiy o'sish</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Ochiq pozitsiyalar</h2>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <div key={index} className="bg-card border rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-muted-foreground">{job.department} • {job.type} • {job.location}</p>
                  </div>
                  <Button>Ariza berish</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;