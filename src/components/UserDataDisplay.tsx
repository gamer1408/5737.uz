import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/lib/AuthService';
import { Heart, ShoppingCart, Search } from 'lucide-react';

export default function UserDataDisplay() {
  const { user, isSignedIn } = useAuth();

  const likedProducts = authService.getLikedProducts();
  const basket = authService.getBasket();
  const searchHistory = authService.getSearchHistory();

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-4">
        {isSignedIn ? `${user?.profile?.firstName}'s Data` : 'Guest Data (Temporary)'}
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span>Liked: {likedProducts.length} items</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          <span>Basket: {basket.length} items</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span>Search History: {searchHistory.length} queries</span>
        </div>
      </div>

      {!isSignedIn && (
        <p className="text-sm text-muted-foreground mt-3">
          Sign in to save your data permanently
        </p>
      )}
    </div>
  );
}