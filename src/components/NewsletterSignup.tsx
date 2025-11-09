import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "footer" | "about" | "popup";
  discount?: string;
}

const NewsletterSignup = ({ variant = "footer", discount }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add to subscribers database
      const subscriber = {
        id: Date.now(),
        email: email.trim(),
        signup_date: new Date().toISOString(),
        status: "pending",
        source: variant
      };

      setStatus("success");
      setMessage("Rahmat qo'shilganiz uchun! Biz sizni qadrlaymiz va eng so'ngi yangiliklarni jo'natib turamiz.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  const getContent = () => {
    switch (variant) {
      case "about":
        return {
          title: "Jamiyatimizga qo'shiling va 10% chegirma oling!",
          buttonText: "10% chegirma olish",
          placeholder: "Elektron pochta manzilingiz"
        };
      case "popup":
        return {
          title: `Kuting! ${discount || "15%"} chegirmani o'tkazib yubormang!`,
          buttonText: "Chegirma olish",
          placeholder: "Elektron pochta manzilingiz"
        };
      default:
        return {
          title: "Yangiliklar bilan tanishib turing!",
          buttonText: "Obuna bo'lish",
          placeholder: "Elektron pochta manzilingiz"
        };
    }
  };

  const content = getContent();

  if (status === "success") {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
        <h3 className="font-semibold text-green-800 mb-1">Rahmat!</h3>
        <p className="text-sm text-green-700">{message}</p>
      </div>
    );
  }

  return (
    <div className={`${variant === "popup" ? "p-6 bg-white rounded-lg shadow-xl" : ""}`}>
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
        {variant === "about" && (
          <p className="text-sm text-muted-foreground">
            Yangi mahsulotlar va maxsus takliflar haqida birinchi bo'lib bilib oling
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={content.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`flex-1 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
            variant === "about" ? "text-black placeholder:text-gray-500" : ""
          }`}
          disabled={status === "loading"}
        />
        <Button 
          type="submit" 
          disabled={status === "loading" || !email.trim()}
          className="bg-primary hover:bg-primary-hover"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            content.buttonText
          )}
        </Button>
      </form>

      {status === "error" && (
        <p className="text-sm text-destructive mt-2">{message}</p>
      )}

      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <a href="/privacy" className="hover:text-primary">Maxfiylik siyosati</a>
        <a href="/unsubscribe" className="hover:text-primary">Obunani bekor qilish</a>
      </div>
    </div>
  );
};

export default NewsletterSignup;