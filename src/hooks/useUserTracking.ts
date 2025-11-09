import { useEffect, useState } from 'react';
import { UserTracker } from '@/lib/UserTracker';
import { RecommendationEngine, RecommendedProduct } from '@/lib/RecommendationEngine';

export const useUserTracking = (userId?: string) => {
  const [tracker] = useState(() => new UserTracker(userId));
  const [recommendationEngine] = useState(() => new RecommendationEngine());
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);

  const trackView = async (productId: number, categoryId: number) => {
    await tracker.trackAction('view', productId, categoryId);
    refreshRecommendations();
  };

  const trackLike = async (productId: number, categoryId: number) => {
    await tracker.trackAction('like', productId, categoryId);
    refreshRecommendations();
  };

  const trackPurchase = async (productId: number, categoryId: number) => {
    await tracker.trackAction('purchase', productId, categoryId);
    refreshRecommendations();
  };

  const trackCartAdd = async (productId: number, categoryId: number) => {
    await tracker.trackAction('cart_add', productId, categoryId);
    refreshRecommendations();
  };

  const trackSearch = async (productId: number, categoryId: number) => {
    await tracker.trackAction('search', productId, categoryId);
  };

  const refreshRecommendations = async () => {
    if (userId) {
      const newRecommendations = await recommendationEngine.getPersonalizedProducts(userId, 8);
      setRecommendations(newRecommendations);
    }
  };

  const getSimilarProducts = async (productId: number) => {
    return await recommendationEngine.getSimilarProducts(productId, 4);
  };

  useEffect(() => {
    refreshRecommendations();
  }, [userId]);

  return {
    trackView,
    trackLike,
    trackPurchase,
    trackCartAdd,
    trackSearch,
    recommendations,
    refreshRecommendations,
    getSimilarProducts
  };
};