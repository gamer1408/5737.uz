import { useState } from "react";
import { Plus, Minus, Heart, Share2, ShoppingCart, Zap } from "lucide-react";

interface PurchaseControlsProps {
  price: number;
  originalPrice: number;
  discount: number;
  stockCount: number;
  onAddToCart: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
}

const PurchaseControls = ({
  price,
  originalPrice,
  discount,
  stockCount,
  onAddToCart,
  onBuyNow
}: PurchaseControlsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const giftProgress = 80; // Mock progress towards free gift
  const giftThreshold = 50; // Amount needed for free gift

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      {/* Pricing Section */}
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-gray-500 line-through text-lg">${originalPrice.toFixed(2)}</span>
          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            -{discount}%
          </span>
        </div>
        <div className="text-3xl font-bold text-red-600">${price.toFixed(2)}</div>
        <div className="text-sm text-gray-600 mt-1">
          You save ${(originalPrice - price).toFixed(2)}
        </div>
      </div>

      {/* Gift Progress Bar */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium flex items-center">
            🎁 You're ${giftThreshold} away from a FREE gift!
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 relative"
            style={{ width: `${giftProgress}%` }}
          >
            <div className="absolute right-0 top-0 h-3 w-1 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-1">{giftProgress}% complete</div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center border-2 border-gray-200 rounded-lg">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 border-x-2 border-gray-200 min-w-[3rem] text-center font-medium">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(Math.min(stockCount, quantity + 1))}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={quantity >= stockCount}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <span className="text-sm text-gray-600">
          {stockCount} available
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={() => onBuyNow(quantity)}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Zap className="h-5 w-5" />
          <span>BUY NOW</span>
        </button>
        
        <button 
          onClick={() => onAddToCart(quantity)}
          className="w-full border-2 border-red-600 text-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>ADD TO CART</span>
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center justify-center space-x-6 pt-4 border-t">
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`flex items-center space-x-2 text-sm transition-colors ${
            isWishlisted ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
        </button>
        
        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 text-green-600 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">In Stock - Ready to Ship</span>
        </div>
        <div className="flex items-center space-x-2 text-blue-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm">Free shipping on orders over $150</span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseControls;