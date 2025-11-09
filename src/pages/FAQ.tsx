import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNav from "@/components/CategoryNav";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Buyurtma qanday beriladi?",
      answer: "Mahsulotni tanlang, savatchaga qo'shing va buyurtma berish tugmasini bosing. Keyin ma'lumotlaringizni kiriting va to'lovni amalga oshiring."
    },
    {
      question: "Yetkazib berish qancha vaqt oladi?",
      answer: "Toshkent bo'ylab 1-2 kun, boshqa viloyatlarga 3-5 kun ichida yetkazib beramiz."
    },
    {
      question: "To'lov usullari qanday?",
      answer: "Naqd pul, bank kartalari, Click, Payme va boshqa elektron to'lov tizimlari orqali to'lash mumkin."
    },
    {
      question: "Mahsulotni qaytarish mumkinmi?",
      answer: "Ha, 14 kun ichida mahsulotni qaytarish yoki almashtirish mumkin. Batafsil ma'lumot uchun qaytarish siyosatimizni o'qing."
    },
    {
      question: "Mahsulotlar haqiqiy qo'lda yasalganmi?",
      answer: "Ha, barcha mahsulotlarimiz O'zbekiston hunarmandlari tomonidan qo'lda yasalgan va sifat sertifikatiga ega."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      
      <main className="py-8">
        <div className="container-premium max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tez-tez so'raladigan savollar</h1>
            <p className="text-muted-foreground">Eng ko'p so'raladigan savollarga javoblar</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border rounded-lg">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-secondary/50 transition-colors"
                >
                  <h3 className="font-semibold">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;