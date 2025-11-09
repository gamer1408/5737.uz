import { JsonDatabase, UserPreference } from './JsonDatabase';
import { products } from './products';
import categories from '@/db/categories.json';

export interface RecommendedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  score: number;
  reason: string;
}

export class RecommendationEngine {
  private db: JsonDatabase;

  constructor() {
    this.db = JsonDatabase.getInstance();
  }

  async getPersonalizedProducts(userId: string, limit: number = 8): Promise<RecommendedProduct[]> {
    try {
      const userPreferences = await this.getUserPreferences(userId);
      if (!userPreferences || Object.keys(userPreferences.category_scores).length === 0) {
        return this.getPopularProducts(limit);
      }

      const recommendations: RecommendedProduct[] = [];
      const sortedCategories = Object.entries(userPreferences.category_scores)
        .sort(([,a], [,b]) => b - a);

      for (const [categoryId, score] of sortedCategories) {
        const categoryProducts = this.getProductsByCategory(parseInt(categoryId));
        const categoryName = this.getCategoryName(parseInt(categoryId));
        
        for (const product of categoryProducts.slice(0, 3)) {
          recommendations.push({
            ...product,
            score: score,
            reason: `Based on your interest in ${categoryName}`
          });
        }
      }

      // Add some popular products if we don't have enough recommendations
      if (recommendations.length < limit) {
        const popular = this.getPopularProducts(limit - recommendations.length);
        recommendations.push(...popular);
      }

      return recommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting personalized products:', error);
      return this.getPopularProducts(limit);
    }
  }

  private async getUserPreferences(userId: string): Promise<UserPreference | null> {
    try {
      const preferencesData = await this.db.readJsonFile<{preferences: UserPreference[]}>('user-preferences.json');
      return preferencesData.preferences.find(p => p.user_id === userId) || null;
    } catch (error) {
      return null;
    }
  }

  private getProductsByCategory(categoryId: number): RecommendedProduct[] {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return [];

    return products
      .filter(product => category.productIds.includes(product.id))
      .map(product => ({
        ...product,
        score: 0,
        reason: 'Popular in category'
      }));
  }

  private getCategoryName(categoryId: number): string {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown Category';
  }

  private getPopularProducts(limit: number): RecommendedProduct[] {
    return products
      .slice(0, limit)
      .map(product => ({
        ...product,
        score: Math.random() * 10,
        reason: 'Popular product'
      }));
  }

  async getSimilarProducts(productId: number, limit: number = 4): Promise<RecommendedProduct[]> {
    const product = products.find(p => p.id === productId);
    if (!product) return [];

    const sameCategory = products
      .filter(p => p.category === product.category && p.id !== productId)
      .slice(0, limit)
      .map(p => ({
        ...p,
        score: 8,
        reason: `Similar to ${product.name}`
      }));

    return sameCategory;
  }

  async trackProductView(userId: string, productId: number): Promise<void> {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const category = categories.find(c => c.productIds.includes(productId));
    if (!category) return;

    // This would integrate with UserTracker
    console.log(`Tracking view: User ${userId} viewed product ${productId} in category ${category.id}`);
  }
}