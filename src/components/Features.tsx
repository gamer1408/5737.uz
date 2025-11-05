import { Truck, Shield, Gift, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over 500,000 UZS across Uzbekistan",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Click, Payme, Humo - 100% secure transactions",
  },
  {
    icon: Gift,
    title: "Loyalty Rewards",
    description: "Earn points with every purchase and unlock exclusive perks",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is here to help in Uzbek, Russian, and English",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-secondary/50" aria-label="Key features">
      <div className="container-premium">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={index}
                className="text-center space-y-4 p-6 rounded-xl bg-card hover:shadow-lg transition-smooth border border-border group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-smooth">
                  <Icon 
                    className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-smooth" 
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
