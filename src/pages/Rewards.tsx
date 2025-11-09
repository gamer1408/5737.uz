import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Gift, Crown, Star, Zap, Clock, Users, TrendingUp } from "lucide-react";

const Rewards = () => {
  const [userProgress, setUserProgress] = useState(0);
  const [userPoints, setUserPoints] = useState(1250);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);
  const [joinedProgram, setJoinedProgram] = useState(false);

  useEffect(() => {
    // Animate progress bar on load
    setTimeout(() => setUserProgress(65), 500);
    
    // Timer for limited offers
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const claimReward = (rewardId: number, cost: number) => {
    if (userPoints >= cost && !claimedRewards.includes(rewardId)) {
      setUserPoints(prev => prev - cost);
      setClaimedRewards(prev => [...prev, rewardId]);
    }
  };

  const joinProgram = () => {
    setJoinedProgram(true);
    setUserPoints(prev => prev + 100); // Welcome bonus
  };

  const rewards = [
    { id: 1, name: "10% chegirma", cost: 500, icon: "🎯", urgency: "Faqat bugun!", claimed: 1247 },
    { id: 2, name: "Bepul yetkazib berish", cost: 300, icon: "🚚", urgency: "Mashhur tanlov", claimed: 2156 },
    { id: 3, name: "Eksklyuziv mahsulot", cost: 1000, icon: "💎", urgency: "Cheklangan", claimed: 543 },
    { id: 4, name: "25% mega chegirma", cost: 1500, icon: "🔥", urgency: "VIP tanlov", claimed: 234 },
  ];

  const tiers = [
    {
      name: "Ko'k a'zo",
      benefits: ["Har 10,000 UZS ga 1 ball", "Tug'ilgan kun 100 ball", "A'zolar yangiliklari"],
      color: "bg-blue-500",
      requirement: "0 UZS",
      icon: Star
    },
    {
      name: "Kumush hunarmand", 
      benefits: ["Barcha ko'k imtiyozlar", "Har 10,000 UZS ga 1.5 ball", "Chegirmalarga erta kirish", "Bepul sovg'a o'rash"],
      color: "bg-gray-400",
      requirement: "500,000 UZS",
      icon: Gift
    },
    {
      name: "Oltin usta",
      benefits: ["Barcha kumush imtiyozlar", "Har 10,000 UZS ga 2 ball", "Bepul yetkazib berish", "Eksklyuziv mahsulotlar", "Shaxsiy kurator"],
      color: "bg-accent",
      isGold: true,
      requirement: "1,500,000 UZS",
      icon: Crown
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary via-primary-hover to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
          🔥 {timeLeft.hours}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')} qoldi
        </div>
        <div className="relative container-premium h-full flex items-center justify-center text-center">
          <div className="max-w-3xl animate-slide-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-6 w-6 text-yellow-300" />
              <span className="text-yellow-300 font-semibold">15,000+ a'zo bizga ishonadi</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Har xariddan <span className="text-yellow-300">2x ball</span> to'plang!
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Bugun qo'shilsangiz <span className="font-bold text-yellow-300">100 ball BEPUL!</span>
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-300 mx-auto mb-1" />
                <span className="text-white text-sm font-medium">Bugun +234 a'zo</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-300 mx-auto mb-1" />
                <span className="text-white text-sm font-medium">Darhol faol</span>
              </div>
            </div>
            <Button 
              size="lg"
              onClick={joinProgram}
              disabled={joinedProgram}
              className={`animate-gentle-pulse font-semibold px-8 py-4 text-lg ${
                joinedProgram 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-primary hover:bg-white/90'
              }`}
            >
              {joinedProgram ? '✅ Qo\'shildingiz!' : '🎁 BEPUL qo\'shilish'}
            </Button>
            {joinedProgram && (
              <p className="text-green-300 font-semibold mt-2 animate-bounce">+100 ball qo'shildi!</p>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced User Progress */}
      <section className="py-12 bg-gradient-to-r from-secondary via-background to-secondary">
        <div className="container-premium">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="h-8 w-8 text-accent" />
                <h3 className="text-3xl font-bold">Sizning ballaringiz</h3>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">{userPoints.toLocaleString()}</div>
              <p className="text-muted-foreground">Oltin darajasiga yo'lingiz</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Kumush hunarmand</span>
                <span className="text-sm text-muted-foreground">{userProgress}%</span>
              </div>
              <Progress value={userProgress} className="h-4 bg-gray-200" />
              <p className="text-sm text-muted-foreground mt-2">
                Oltin maqomini ochish uchun yana <span className="font-bold text-primary">500,000 UZS</span> sarflang
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-blue-600">Xaridlar</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-green-600">Mukofotlar</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">45</div>
                <div className="text-sm text-purple-600">Kun a'zo</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-orange-600">Taklif qilingan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Marketplace */}
      <section className="py-16">
        <div className="container-premium">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Mukofotlar bozori</h2>
            <p className="text-muted-foreground">Ballaringizni ajoyib mukofotlarga almashtiring</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => {
              const canClaim = userPoints >= reward.cost;
              const isClaimed = claimedRewards.includes(reward.id);
              
              return (
                <div key={reward.id} className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-500 text-white text-xs animate-pulse">
                      {reward.urgency}
                    </Badge>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{reward.icon}</div>
                    <h3 className="font-bold text-lg">{reward.name}</h3>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-primary">{reward.cost}</div>
                    <div className="text-sm text-muted-foreground">ball kerak</div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{reward.claimed} kishi oldi</span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      isClaimed 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : canClaim 
                          ? 'bg-primary hover:bg-primary-hover' 
                          : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!canClaim || isClaimed}
                    onClick={() => claimReward(reward.id, reward.cost)}
                  >
                    {isClaimed ? '✅ Olingan' : canClaim ? '🎁 Olish' : '🔒 Yetarli emas'}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Membership Tiers */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-premium">
          <h2 className="text-4xl font-bold text-center mb-4">A'zolik darajalari</h2>
          <p className="text-center text-muted-foreground mb-12">Ko'proq xarid qiling, ko'proq mukofot oling</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => {
              const IconComponent = tier.icon;
              return (
                <div 
                  key={index}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-2xl ${
                    tier.isGold 
                      ? 'border-accent bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl' 
                      : 'border-gray-200 bg-white hover:border-primary/30'
                  }`}
                >
                  {tier.isGold && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-accent to-orange-500 text-white px-4 py-1 animate-bounce">
                        🔥 Eng mashhur
                      </Badge>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${tier.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{tier.requirement} dan boshlab</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className="text-green-500 mr-3 mt-0.5 font-bold">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {tier.isGold && (
                    <div className="text-center">
                      <Button className="w-full bg-gradient-to-r from-accent to-orange-500 hover:from-accent-hover hover:to-orange-600 text-white font-semibold">
                        Oltin bo'lish
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container-premium">
          <h2 className="text-4xl font-bold text-center mb-4">Qanday ishlaydi</h2>
          <p className="text-center text-muted-foreground mb-12">3 oddiy qadamda mukofotlarga erishing</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛒</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">1. Xarid qiling</h4>
              <p className="text-muted-foreground mb-4">Har 10,000 UZS ga 1-2 ball oling</p>
              <div className="bg-blue-50 rounded-lg p-3">
                <span className="text-sm font-medium text-blue-600">Bugun: 2x ball!</span>
              </div>
            </div>
            
            <div className="text-center animate-slide-up bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">2. Ball to'plang</h4>
              <p className="text-muted-foreground mb-4">Sharh, taklif, tug'ilgan kun bonuslari</p>
              <div className="bg-green-50 rounded-lg p-3">
                <span className="text-sm font-medium text-green-600">+100 ball welcome bonus</span>
              </div>
            </div>
            
            <div className="text-center animate-slide-up bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎁</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">3. Mukofot oling</h4>
              <p className="text-muted-foreground mb-4">Chegirmalar, bepul yetkazib berish va ko'p narsalar</p>
              <div className="bg-purple-50 rounded-lg p-3">
                <span className="text-sm font-medium text-purple-600">300 balldan boshlab</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Cheklangan vaqt!</h3>
              <p className="text-muted-foreground text-sm mb-3">Bugun qo'shilsangiz 2x ball olasiz</p>
              <div className="text-2xl font-bold text-orange-500">
                {timeLeft.hours}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rewards;