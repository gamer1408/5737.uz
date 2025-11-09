import React from 'react';
import { useCorrectAuth } from '@/hooks/useCorrectAuth';
import { Button } from '@/components/ui/button';

export default function TestCounter() {
  const { likedCount, cartCount, addToLiked, addToCart, isSignedIn } = useCorrectAuth();

  return (
    <div className="fixed bottom-4 left-4 bg-white border rounded-lg p-4 shadow-lg">
      <h3 className="font-bold mb-2">Test Counter</h3>
      <div className="space-y-2">
        <div>Liked: {likedCount}</div>
        <div>Cart: {cartCount}</div>
        <div>Mode: {isSignedIn ? 'USER' : 'GUEST'}</div>
        <div className="space-x-2">
          <Button size="sm" onClick={() => addToLiked('test1')}>Like</Button>
          <Button size="sm" onClick={() => addToCart('test2', 1)}>Cart</Button>
        </div>
        <div className="text-xs text-gray-500">
          {isSignedIn ? 'Saves to server' : 'In-memory only'}
        </div>
      </div>
    </div>
  );
}