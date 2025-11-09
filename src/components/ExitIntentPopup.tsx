import { useState, useEffect } from "react";
import { X } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-md mx-4">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
        <NewsletterSignup variant="popup" discount="15%" />
      </div>
    </div>
  );
};

export default ExitIntentPopup;