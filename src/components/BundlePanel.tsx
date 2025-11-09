import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { products } from "@/lib/products";

interface BundlePanelProps {
  currentProduct: any;
}

const BundlePanel = ({ currentProduct }: BundlePanelProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { addItem } = useCart();

  // Get related products for bundle
  const bundleProducts = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 2);

  const allBundleItems = [currentProduct, ...bundleProducts];
  const totalOriginalPrice = allBundleItems.reduce((sum, item) => sum + item.price, 0);
  const bundlePrice = Math.round(totalOriginalPrice * 0.85); // 15% discount
  const savings = totalOriginalPrice - bundlePrice;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleItem = (productId: number) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addBundleToCart = () => {
    const itemsToAdd = allBundleItems.filter(item => 
      item.id === currentProduct.id || selectedItems.includes(item.id)
    );
    
    itemsToAdd.forEach(item => addItem(item));
    setIsVisible(false);
  };

  const progress = ((selectedItems.length + 1) / allBundleItems.length) * 100;

  if (!isVisible) return null;

  return (
    <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-transform duration-500 ${
      isVisible ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="bg-white shadow-2xl rounded-l-xl p-6 w-80 border-l border-t border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">To'plamni yakunlang</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Bundle Items */}
        <div className="space-y-3 mb-4">
          {allBundleItems.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                index === 0 
                  ? 'border-2 border-green-500 bg-green-50' 
                  : selectedItems.includes(item.id)
                    ? 'border-2 border-blue-500 bg-blue-50'
                    : 'border border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => index !== 0 && toggleItem(item.id)}
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {index === 0 ? 'Sizning buyumingiz' : `+${item.price.toLocaleString()} UZS`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            {allBundleItems.map((_, index) => (
              <div 
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  index === 0 || selectedItems.includes(allBundleItems[index].id)
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-4 text-center">
          <div className="relative">
            <span className="text-lg text-gray-500 line-through">
              {totalOriginalPrice.toLocaleString()} UZS
            </span>
            <div className="text-2xl font-bold text-primary">
              {bundlePrice.toLocaleString()} UZS
            </div>
            <div className="text-green-600 font-semibold">
              {savings.toLocaleString()} UZS tejaysiz!
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 hover:scale-105 transition-all"
          onClick={addBundleToCart}
        >
          To'plamni savatga qo'shish
        </Button>
      </div>
    </div>
  );
};

export default BundlePanel;