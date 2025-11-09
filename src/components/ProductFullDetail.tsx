import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ShoppingCart, Gift, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  description?: string;
  longDescription?: string;
}

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

interface PropsWithMode extends Props {
  mode?: 'modal' | 'fullscreen';
}

export default function ProductFullDetail({ product, open, onClose, mode = 'fullscreen' }: PropsWithMode) {
  // Build images array: prefer product.images, otherwise create variants
  const images = useMemo(() => {
    if (product.images && product.images.length) return product.images;
    // generate up to 4 image variants if only single image is provided
    return [product.image, product.image + "?v=2", product.image + "?v=3", product.image + "?v=4"];
  }, [product]);

  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [viewerCount, setViewerCount] = useState(12);
  const [progress, setProgress] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const { addItem } = useCart();
  const [buttonState, setButtonState] = useState<'default'|'adding'|'success'>('default');

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => {
      setViewerCount((v) => Math.max(10, v + (Math.random() > 0.6 ? 1 : -1)));
    }, 8000);
    setProgress(Math.min(100, Math.floor((product.price * quantity) / 1000 * 100)));
    return () => clearInterval(t);
  }, [open, product.price, quantity]);

  useEffect(() => {
    setIndex(0);
  }, [product.id]);

  // Prefetch images for snappy gallery
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  if (!open) return null;

  const handleAdd = () => {
    if (buttonState !== 'default') return;
    setButtonState('adding');
    addItem({ ...product, price: product.price });
    // success animation
    setTimeout(() => {
      setButtonState('success');
      setTimeout(() => setButtonState('default'), 1400);
    }, 500);
  };

  const content = (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Back">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-semibold">{product.name}</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{viewerCount} viewing now</span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative rounded-lg overflow-hidden mb-4">
            <img src={images[index]} alt={`${product.name} ${index+1}`} className="w-full h-[520px] object-cover" />
            {/* simple prev/next controls */}
            <button aria-label="previous" onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full">
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button aria-label="next" onClick={() => setIndex((i) => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full">
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="flex gap-3">
            {images.map((src, i) => (
              <img key={i} src={src} alt={`thumb-${i}`} className={`w-20 h-20 object-cover rounded cursor-pointer border ${i===index? 'ring-2 ring-primary' : 'border-transparent'}`} onClick={() => setIndex(i)} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Badge className="bg-black/60 text-white">{product.category}</Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="font-medium">4.8</span>
              <span className="text-xs">(48 reviews)</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-bold">{product.price.toLocaleString()} UZS</div>
            <p className="text-muted-foreground mt-3">
              {product.description}
            </p>
            <div className="mt-2 text-sm text-muted-foreground">
              {product.longDescription ? (
                <>
                  <div className={`${readMore ? 'max-h-[2000px]' : 'max-h-20'} overflow-hidden transition-[max-height] duration-300`}>{product.longDescription}</div>
                  <button className="mt-2 text-primary underline" onClick={() => setReadMore(r => !r)}>{readMore ? 'Show less' : 'Read more'}</button>
                </>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button className="px-3" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <input className="w-12 text-center" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))} />
              <button className="px-3" onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <Button className={`text-white ${buttonState==='default' ? 'bg-primary hover:bg-primary-hover' : ''} ${buttonState==='success' ? 'bg-green-500' : ''}`} onClick={handleAdd}>
              <span className="inline-flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                {buttonState === 'adding' ? 'Adding...' : buttonState === 'success' ? 'Added' : 'Add to Cart'}
              </span>
            </Button>
          </div>

          <div className="mt-6 bg-accent/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-accent">
              <Gift className="h-5 w-5" />
              <span className="font-medium">Only 20,000 UZS away from a FREE gift!</span>
            </div>
            <div className="mt-3 h-2 bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5">
              <li>Material: 100% Silk on Cotton Canvas</li>
              <li>Dimensions: 200cm x 150cm</li>
              <li>Origin: Bukhara, Uzbekistan</li>
              <li>Care: Dry clean only</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Flash Sale</h3>
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <div className="text-sm text-muted-foreground">Ends in</div>
                <div className="text-lg font-medium">01:45:30</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products placeholder */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">You May Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Placeholder cards */}
          <div className="p-4 border rounded">Product A</div>
          <div className="p-4 border rounded">Product B</div>
          <div className="p-4 border rounded">Product C</div>
          <div className="p-4 border rounded">Product D</div>
        </div>
      </div>

    </div>
  );

  if (mode === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto">{content}</div>
    );
  }

  // modal centered overlay
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-background rounded-xl shadow-xl overflow-auto">
        <div className="p-6">{content}</div>
        <button className="absolute top-4 right-4 p-2" aria-label="Close" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
