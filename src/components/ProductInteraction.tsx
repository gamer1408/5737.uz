import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useDualMode } from '@/hooks/useDualMode';
import { Button } from '@/components/ui/button';

interface ProductInteractionProps {
  productId: string;
  productName: string;
}

export default function ProductInteraction({ productId, productName }: ProductInteractionProps) {
  const { 
    isSignedIn, 
    addToLiked, 
    removeFromLiked, 
    addToCart, 
    addToViewHistory,
    getLikedProducts 
  } = useDualMode();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Track product view
    addToViewHistory(productId);
    
    // Check if product is liked
    const likedProducts = getLikedProducts();
    setIsLiked(likedProducts.includes(productId));
  }, [productId]);

  const handleLike = () => {
    if (isLiked) {
      removeFromLiked(productId);
      setIsLiked(false);
    } else {
      addToLiked(productId);
      setIsLiked(true);
    }
  };

  const handleAddToCart = () => {
    addToCart(productId, 1);
  };

  return (
    <div className="flex gap-2 p-4 border rounded-lg">
      <div className="flex-1">
        <h3 className="font-semibold">{productName}</h3>
        <p className="text-sm text-gray-600">Product ID: {productId}</p>
        {!isSignedIn && (
          <p className="text-xs text-red-600 mt-1">
            ⚠️ Guest mode - data not saved (lost on refresh)
          </p>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center text-xs text-gray-500">
          <Eye className="w-3 h-3 mr-1" />
          {isSignedIn ? 'Tracked' : 'Not saved'}
        </div>
      </div>
    </div>
  );
}