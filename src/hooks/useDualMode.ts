import { useState, useEffect } from 'react';
import { dualModeService, type UserData } from '@/lib/DualModeService';
import { useWindowSync } from './useWindowSync';

export function useDualMode() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const currentUser = dualModeService.getCurrentUser();
      setUser(currentUser);
      setIsSignedIn(dualModeService.isSignedIn());
    };
    
    // Initial state
    updateState();
    
    // Listen for changes
    dualModeService.addListener(updateState);
    
    return () => {
      dualModeService.removeListener(updateState);
    };
  }, []);

  // Sync data across windows
  useWindowSync(() => {
    const currentUser = dualModeService.getCurrentUser();
    setUser(currentUser);
    setIsSignedIn(dualModeService.isSignedIn());
  });

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await dualModeService.signIn(email, password);
    if (result.success) {
      setUser(result.user!);
      setIsSignedIn(true);
    }
    setLoading(false);
    return result;
  };

  const signUp = async (userData: { name: string; email: string; password: string; phone?: string }) => {
    setLoading(true);
    const result = await dualModeService.signUp(userData);
    if (result.success) {
      setUser(result.user!);
      setIsSignedIn(true);
    }
    setLoading(false);
    return result;
  };

  const signOut = () => {
    dualModeService.signOut();
    setUser(null);
    setIsSignedIn(false);
  };

  // Actions that work in both modes
  const addToLiked = (productId: string) => {
    dualModeService.addToLiked(productId);
  };

  const removeFromLiked = (productId: string) => {
    dualModeService.removeFromLiked(productId);
  };

  const addToCart = (productId: string, quantity: number = 1) => {
    dualModeService.addToCart(productId, quantity);
  };

  const addToSearchHistory = (query: string) => {
    dualModeService.addToSearchHistory(query);
  };

  const addToViewHistory = (productId: string) => {
    dualModeService.addToViewHistory(productId);
  };

  // Getters
  const getLikedProducts = () => dualModeService.getLikedProducts();
  const getCart = () => dualModeService.getCart();
  const getSearchHistory = () => dualModeService.getSearchHistory();
  const getViewHistory = () => dualModeService.getViewHistory();

  return {
    user,
    isSignedIn,
    loading,
    signIn,
    signUp,
    signOut,
    addToLiked,
    removeFromLiked,
    addToCart,
    addToSearchHistory,
    addToViewHistory,
    getLikedProducts,
    getCart,
    getSearchHistory,
    getViewHistory,
    userLPID: user?.LPID || null
  };
}

export default useDualMode;