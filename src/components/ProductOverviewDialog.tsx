import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductFullDetail from "./ProductFullDetail";
import { ShoppingCart, Gift, Star, Clock, TrendingUp, ChevronRight, Check } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductOverviewDialogProps {
  children: React.ReactNode;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    images?: string[];
    category: string;
    description?: string;
  };
}

export function ProductOverviewDialog({ children, product }: ProductOverviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const { addItem } = useCart();
  const [showFullDetail, setShowFullDetail] = useState(false);
  const [buttonState, setButtonState] = useState<'default' | 'adding' | 'success'>('default');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const navigate = useNavigate();
  
  const allImages = product.images ? [product.image, ...product.images] : [product.image];

  // Simulate loading sequence (kept short for snappy UX)
  useEffect(() => {
    if (isOpen) {
      setContentLoaded(false);
      setShowSocialProof(false);
      // Start loading sequence quickly
      setTimeout(() => setContentLoaded(true), 20);
      // Show social proof shortly after content loads
      setTimeout(() => setShowSocialProof(true), 500);
      // Animate progress bar quickly
      setProgress(0);
      setTimeout(() => setProgress(80), 100);
    }
  }, [isOpen]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (buttonState !== 'default') return;
    
    setButtonState('adding');
    addItem(product);
    
    setTimeout(() => {
      setButtonState('success');
      
      setTimeout(() => {
        setIsOpen(false);
        setButtonState('default');
      }, 1500);
    }, 750);
  };

  const randomViewers = Math.floor(Math.random() * 15) + 5;
  const recentSales = Math.floor(Math.random() * 8) + 3;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div className="relative overflow-hidden">
          {/* Main Content */}
          <div className={`transition-all duration-700 transform ${
            contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <DialogHeader>
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
            </DialogHeader>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className={`w-full object-cover transition-all duration-300 hover:scale-105 ${product.category === 'Home' ? 'h-64' : 'h-full'}`}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                          selectedImage === image 
                            ? 'border-primary shadow-md' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                {/* Social Proof */}
                <div className={`transition-all duration-500 ${
                  showSocialProof ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span>{randomViewers} people are viewing this product</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>{recentSales} sold in the last hour</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-2xl font-bold">
                  {product.price.toLocaleString()} UZS
                </div>

                {/* Description */}
                <p className="text-muted-foreground">
                  {product.description || "Experience the finest craftsmanship with this authentic Uzbek masterpiece."}
                </p>

                {/* Bonus Offer */}
                <div className="bg-accent/10 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Gift className="h-5 w-5" />
                    <span className="font-medium">Only 20,000 UZS away from a FREE gift!</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button 
                    ref={buttonRef}
                    type="button"
                    className={cn(
                      "w-full font-medium transform hover:scale-[1.02] transition-all duration-300",
                      buttonState === 'adding' && "scale-95 opacity-80 bg-[#C0392B]",
                      buttonState === 'success' && "scale-100 bg-green-500 hover:bg-green-600",
                      buttonState === 'default' && "bg-[#C0392B] hover:bg-[#A93226] text-white"
                    )}
                    disabled={buttonState !== 'default'}
                    onClick={handleAddToCart}
                  >
                    {buttonState === 'success' ? (
                      <Check className="h-4 w-4 mr-2 animate-checkmark" />
                    ) : (
                      <ShoppingCart className={cn(
                        "h-4 w-4 mr-2 transition-transform",
                        buttonState === 'adding' && "scale-110"
                      )} />
                    )}
                    {buttonState === 'success' ? 'Added!' : buttonState === 'adding' ? 'Adding...' : 'Add to Cart'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full hover:bg-secondary transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    View More Details
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
            {/* Full Details Block */}
            {showFullDetail && (
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg border animate-slide-up">
                <h4 className="font-semibold mb-3">Product Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Material:</span> Premium handwoven fabric</p>
                  <p><span className="font-medium">Dimensions:</span> 150cm x 200cm</p>
                  <p><span className="font-medium">Origin:</span> Bukhara, Uzbekistan</p>
                  <p><span className="font-medium">Care:</span> Dry clean only</p>
                  <p><span className="font-medium">Shipping:</span> 3-5 business days</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AnimatedPulseButtonProps {
  children: React.ReactNode;
  className?: string;
}

function AnimatedPulseButton({ children, className }: AnimatedPulseButtonProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 rounded-full animate-ping" />
      <div className={cn("relative", className)}>
        {children}
      </div>
    </div>
  );
}