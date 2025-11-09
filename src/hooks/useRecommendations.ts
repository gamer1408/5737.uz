import { useState, useEffect } from 'react';
import { products } from '@/lib/products';
import { useLikedProducts } from './useLikedProducts';
import { useCart } from './useCart';

export const useRecommendations = (userId?: string) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { likedProducts } = useLikedProducts();
  const { items } = useCart();

  useEffect(() => {
    // Just show first 8 products without filtering or shuffling
    const staticRecommendations = products.slice(0, 8);
    setRecommendations(staticRecommendations);
  }, []); // Remove dependencies to prevent re-rendering when liked products change

  return { recommendations };
};