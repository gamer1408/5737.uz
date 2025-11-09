import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Mail, Send, MapPin, Check, Clock, Users, Zap, Heart } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState<'default' | 'sending' | 'sent'>('default');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState("2 daqiqa");
  const [onlineSupport, setOnlineSupport] = useState(true);
  const [todayMessages, setTodayMessages] = useState(147);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTodayMessages(prev => prev + Math.floor(Math.random() * 3));
      const times = ["1 daqiqa", "2 daqiqa", "3 daqiqa"];
      setResponseTime(times[Math.floor(Math.random() * times.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    {
      question: "Yetkazib berish variantlaringiz qanday?",
      answer: "Biz kuzatuv bilan butun dunyoga yetkazib beramiz. Standart yetkazib berish 5-7 ish kuni, tezkor yetkazib berish 2-3 kun."
    },
    {
      question: "Buyurtmamni qanday kuzatishim mumkin?",
      answer: "Buyurtmangiz jo'natilgandan so'ng, elektron pochta orqali kuzatuv raqamini olasiz. Shuningdek, hisobingizda buyurtma holatini tekshirishingiz mumkin."
    },
    {
      question: "Qaytarish siyosatingiz qanday?",
      answer: "Biz ishlatilmagan va asl holatidagi mahsulotlar uchun 30 kunlik qaytarish imkoniyatini taklif qilamiz. Maxsus buyurtmalar qaytarilmaydi."
    },
    {
      question: "Mahsulotlaringiz haqiqiymi?",
      answer: "Ha, barcha mahsulotlarimiz tasdiqlangan hunarmandlar tomonidan an'anaviy o'zbek texnikasi va materiallari yordamida qo'lda yasalgan."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => setFormState('default'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary via-primary-hover to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          <span className="text-sm font-medium">Online yordam</span>
        </div>
        <div className="container-premium h-full flex items-center justify-center text-center relative z-10">
          <div className="animate-slide-up max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-red-400 animate-bounce" />
              <span className="text-white/90 font-medium">24/7 mijozlar xizmati</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Sizning <span className="text-yellow-300">muvaffaqiyatingiz</span> bizning maqsadimiz
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              O'rtacha javob vaqti: <span className="font-bold text-yellow-300">{responseTime}</span> • Bugun <span className="font-bold text-yellow-300">{todayMessages}+</span> mijozga yordam berdik
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Users className="h-5 w-5 text-green-300 mx-auto mb-1" />
                <span className="text-white text-sm font-medium">5000+ baxtli mijoz</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-300 mx-auto mb-1" />
                <span className="text-white text-sm font-medium">Tez javob</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-blue-300 mx-auto mb-1" />
                <span className="text-white text-sm font-medium">24/7 xizmat</span>
              </div>
            </div>
            <Button 
              size="lg"
              className="animate-gentle-pulse bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🚀 Darhol bog'lanish
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Info */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-premium">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Bizga murojaat qiling</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Sizning har bir savolingiz biz uchun muhim. Professional jamoamiz sizga yordam berishga tayyor.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <div id="contact-form" className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-2xl font-bold">Tezkor xabar</h3>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">O'rtacha {responseTime} javob</span>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input 
                    placeholder="Ismingiz" 
                    required 
                    className="h-14 pl-4 border-2 focus:border-primary transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="Elektron pochtangiz" 
                    required 
                    className="h-14 pl-4 border-2 focus:border-primary transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <div className="relative">
                  <Textarea 
                    placeholder="Xabaringiz (batafsil yozing, tezroq yordam beramiz)" 
                    required 
                    className="min-h-32 p-4 border-2 focus:border-primary transition-all duration-300 hover:shadow-md resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${
                    formState === 'sent' 
                      ? 'bg-green-500 hover:bg-green-600 scale-105' 
                      : 'bg-primary hover:bg-primary-hover hover:scale-105'
                  }`}
                  disabled={formState === 'sending'}
                >
                  {formState === 'sending' && (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  )}
                  {formState === 'sent' && <Check className="h-5 w-5 mr-2 animate-bounce" />}
                  {formState === 'default' && '📨 Xabar yuborish'}
                  {formState === 'sending' && 'Yuborilmoqda...'}
                  {formState === 'sent' && '✅ Muvaffaqiyatli yuborildi!'}
                </Button>
                
                {formState === 'sent' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-slide-up">
                    <p className="text-green-700 text-sm font-medium">Rahmat! Sizning xabaringizni oldik. {responseTime} ichida javob beramiz.</p>
                  </div>
                )}
              </form>
            </div>

            {/* Enhanced Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold mb-6">Tezkor aloqa</h3>
                <div className="space-y-6">
                  <a href="mailto:hello@5737.uz" className="flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Elektron pochta</h4>
                      <p className="text-blue-600 font-medium">hello@5737.uz</p>
                      <p className="text-sm text-muted-foreground">Professional yordam</p>
                    </div>
                  </a>
                  
                  <a href="https://t.me/uz5737" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Telegram</h4>
                      <p className="text-blue-600 font-medium">@uz5737</p>
                      <p className="text-sm text-muted-foreground">Eng tez javob • {onlineSupport ? '🟢 Online' : '🔴 Offline'}</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Manzil</h4>
                      <p className="text-muted-foreground">Toshkent, O'zbekiston</p>
                      <p className="text-sm text-muted-foreground">Ish vaqti: 9:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-4">Nima uchun bizni tanlashadi?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">24/7 mijozlar xizmati</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">O'rtacha 2 daqiqada javob</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">5000+ baxtli mijoz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary">
        <div className="container-premium">
          <h2 className="text-3xl font-bold text-center mb-12">Tez-tez so'raladigan savollar</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg border">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 animate-slide-up">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;