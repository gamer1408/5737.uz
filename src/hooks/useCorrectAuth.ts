import { useState, useEffect } from 'react';
import { correctAuth, type User } from '@/lib/CorrectAuth';

export function useCorrectAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const updateCounts = () => {
    const liked = correctAuth.getLikedProducts();
    const cart = correctAuth.getCart();
    setLikedCount(liked.length);
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  };

  useEffect(() => {
    const currentUser = correctAuth.getUser();
    setUser(currentUser);
    setIsSignedIn(!!currentUser);
    updateCounts();

    // Update every second to catch changes
    const interval = setInterval(updateCounts, 1000);
    return () => clearInterval(interval);
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await correctAuth.signIn(email, password);
    if (result.success) {
      setUser(result.user!);
      setIsSignedIn(true);
      updateCounts();
    }
    return result;
  };

  const signUp = async (userData: { name: string; email: string; password: string; phone?: string }) => {
    const result = await correctAuth.signUp(userData);
    if (result.success) {
      setUser(result.user!);
      setIsSignedIn(true);
      updateCounts();
    }
    return result;
  };

  const signOut = () => {
    correctAuth.signOut();
    setUser(null);
    setIsSignedIn(false);
    setLikedCount(0);
    setCartCount(0);
  };

  const addToLiked = (productId: string) => {
    correctAuth.addToLiked(productId);
    updateCounts();
  };

  const removeFromLiked = (productId: string) => {
    correctAuth.removeFromLiked(productId);
    updateCounts();
  };

  const addToCart = (productId: string, quantity: number = 1) => {
    correctAuth.addToCart(productId, quantity);
    updateCounts();
  };

  return {
    user,
    isSignedIn,
    likedCount,
    cartCount,
    signIn,
    signUp,
    signOut,
    addToLiked,
    removeFromLiked,
    addToCart,
    getLikedProducts: () => correctAuth.getLikedProducts(),
    getCart: () => correctAuth.getCart()
  };
}

export default useCorrectAuth;