import { Link } from "react-router-dom";
import { Facebook, Instagram, Send } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Yangi kelganlar", href: "/shop/new" },
      { name: "Eng ko'p sotilganlar", href: "/shop/bestsellers" },
      { name: "Chegirma", href: "/shop/sale" },
      { name: "Sovg'a kartalari", href: "/shop/gift-cards" },
    ],
    support: [
      { name: "Biz bilan bog'laning", href: "/contact" },
      { name: "Tez-tez so'raladigan savollar", href: "/faq" },
      { name: "Yetkazib berish ma'lumoti", href: "/shipping" },
      { name: "Qaytarish va almashtirish", href: "/returns" },
    ],
    company: [
      { name: "Biz haqimizda", href: "/about" },
      { name: "Bizning hikoyamiz", href: "/story" },
      { name: "Karyera", href: "/careers" },
      { name: "Matbuot", href: "/press" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border" role="contentinfo">
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-bold gradient-text">5737.UZ</h2>
            </Link>
            <p className="text-muted-foreground max-w-md">
              An'anaviy o'zbek hunarmandchiligi va zamonaviy nafislikni uyg'unlashtirgan tanlangan kolleksiyalar. O'zbekiston bo'ylab 50,000+ oilalar ishonadi.
            </p>
            
            {/* Newsletter */}
            <NewsletterSignup variant="footer" />

            {/* Social Media */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth"
                aria-label="Follow us on Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Do'kon</h3>
            <nav aria-label="Shop links">
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Yordam</h3>
            <nav aria-label="Support links">
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Kompaniya</h3>
            <nav aria-label="Company links">
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} 5737.UZ. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                Maxfiylik siyosati
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                Xizmat shartlari
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                Cookie siyosati
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
