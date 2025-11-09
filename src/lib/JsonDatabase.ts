export interface UserAction {
  id: number;
  user_id: string;
  action_type: 'view' | 'like' | 'purchase' | 'search' | 'cart_add';
  product_id: number;
  category_id: number;
  timestamp: string;
  session_id: string;
}

export interface UserPreference {
  user_id: string;
  category_scores: Record<string, number>;
  last_updated: string;
  total_actions: number;
}

export class JsonDatabase {
  private static instance: JsonDatabase;
  
  static getInstance(): JsonDatabase {
    if (!JsonDatabase.instance) {
      JsonDatabase.instance = new JsonDatabase();
    }
    return JsonDatabase.instance;
  }

  async readJsonFile<T>(filename: string): Promise<T> {
    try {
      const response = await fetch(`/src/db/${filename}`);
      return await response.json();
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      throw error;
    }
  }

  async writeJsonFile<T>(filename: string, data: T): Promise<void> {
    // In a real implementation, this would need a backend API
    console.log(`Writing to ${filename}:`, data);
    localStorage.setItem(filename, JSON.stringify(data));
  }

  async appendToJsonFile(filename: string, newData: any): Promise<void> {
    try {
      const existingData = await this.readJsonFile<any>(filename);
      const key = Object.keys(existingData)[0];
      existingData[key].push(newData);
      await this.writeJsonFile(filename, existingData);
    } catch (error) {
      console.error(`Error appending to ${filename}:`, error);
    }
  }

  findInJson<T>(data: T[], criteria: Partial<T>): T[] {
    return data.filter(item => {
      return Object.entries(criteria).every(([key, value]) => 
        (item as any)[key] === value
      );
    });
  }
}