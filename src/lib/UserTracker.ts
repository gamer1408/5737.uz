import { JsonDatabase, UserAction, UserPreference } from './JsonDatabase';

export class UserTracker {
  private db: JsonDatabase;
  private userId: string;
  private sessionId: string;

  constructor(userId: string = 'anonymous') {
    this.db = JsonDatabase.getInstance();
    this.userId = userId;
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async trackAction(
    actionType: UserAction['action_type'], 
    productId: number, 
    categoryId: number
  ): Promise<void> {
    const action: UserAction = {
      id: Date.now(),
      user_id: this.userId,
      action_type: actionType,
      product_id: productId,
      category_id: categoryId,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId
    };

    try {
      await this.db.appendToJsonFile('user-actions.json', action);
      await this.updateUserPreferences(categoryId, actionType);
    } catch (error) {
      console.error('Error tracking action:', error);
    }
  }

  private async updateUserPreferences(categoryId: number, actionType: string): Promise<void> {
    const weights = {
      'view': 1,
      'like': 3,
      'cart_add': 2,
      'purchase': 5,
      'search': 1
    };

    try {
      const preferencesData = await this.db.readJsonFile<{preferences: UserPreference[]}>('user-preferences.json');
      let userPref = preferencesData.preferences.find(p => p.user_id === this.userId);

      if (!userPref) {
        userPref = {
          user_id: this.userId,
          category_scores: {},
          last_updated: new Date().toISOString(),
          total_actions: 0
        };
        preferencesData.preferences.push(userPref);
      }

      const score = weights[actionType as keyof typeof weights] || 1;
      userPref.category_scores[categoryId.toString()] = 
        (userPref.category_scores[categoryId.toString()] || 0) + score;
      userPref.total_actions += 1;
      userPref.last_updated = new Date().toISOString();

      await this.db.writeJsonFile('user-preferences.json', preferencesData);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  }

  async getUserActions(): Promise<UserAction[]> {
    try {
      const actionsData = await this.db.readJsonFile<{actions: UserAction[]}>('user-actions.json');
      return this.db.findInJson(actionsData.actions, { user_id: this.userId });
    } catch (error) {
      console.error('Error getting user actions:', error);
      return [];
    }
  }

  async getUserPreferredCategories(): Promise<Record<string, number>> {
    try {
      const preferencesData = await this.db.readJsonFile<{preferences: UserPreference[]}>('user-preferences.json');
      const userPref = preferencesData.preferences.find(p => p.user_id === this.userId);
      return userPref?.category_scores || {};
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return {};
    }
  }
}