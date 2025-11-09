import { useState, useEffect } from 'react';
import { authService, type User } from '@/lib/AuthService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.signIn(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await authService.signUp(userData);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    const result = await authService.updateUser(updates);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const addToLiked = async (productId: string) => {
    const success = await authService.addToLiked(productId);
    if (success) {
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
    }
    return success;
  };

  const removeFromLiked = async (productId: string) => {
    const success = await authService.removeFromLiked(productId);
    if (success) {
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
    }
    return success;
  };

  const addToWishlist = async (productId: string) => {
    const success = await authService.addToWishlist(productId);
    if (success) {
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
    }
    return success;
  };

  const addToBasket = async (productId: string, quantity: number = 1) => {
    const success = await authService.addToBasket(productId, quantity);
    if (success) {
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
    }
    return success;
  };

  const addOrder = async (orderData: {
    orderId: string;
    totalAmount: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
  }) => {
    const success = await authService.addOrder(orderData);
    if (success) {
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
    }
    return success;
  };

  const addToSearchHistory = async (query: string) => {
    const success = await authService.addToSearchHistory(query);
    if (success) {
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
    }
    return success;
  };

  return {
    user,
    isLoading,
    isSignedIn: !!user,
    signIn,
    signUp,
    signOut,
    updateUser,
    addToLiked,
    removeFromLiked,
    addToWishlist,
    addToBasket,
    addOrder,
    addToSearchHistory,
  };
}

export default useAuth;