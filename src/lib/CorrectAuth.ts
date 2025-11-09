interface User {
  id: string;
  email: string;
  LPID: string;
  profile: { firstName: string; lastName: string; phone: string };
  likedProducts: string[];
  cart: Array<{ productId: string; quantity: number; addedAt: string }>;
  searchHistory: Array<{ query: string; timestamp: string }>;
}

class CorrectAuth {
  private user: User | null = null;
  private authToken: string | null = null;
  
  // GUEST MODE: In-memory only (resets on page refresh)
  private guestBasket: Array<{ productId: string; quantity: number }> = [];
  private guestLikes: string[] = [];
  private guestSearches: string[] = [];

  constructor() {
    this.authToken = localStorage.getItem('authToken');
    if (this.authToken) {
      this.fetchUserData();
    }
  }

  // GUEST MODE ACTIONS (In-memory only)
  addToLiked(productId: string) {
    if (this.user) {
      // LOGGED IN: Save to server
      this.saveToServer('likes', productId, 'add');
    } else {
      // GUEST: In-memory only
      if (!this.guestLikes.includes(productId)) {
        this.guestLikes.push(productId);
      }
    }
  }

  removeFromLiked(productId: string) {
    if (this.user) {
      // LOGGED IN: Save to server
      this.saveToServer('likes', productId, 'remove');
    } else {
      // GUEST: In-memory only
      this.guestLikes = this.guestLikes.filter(id => id !== productId);
    }
  }

  addToCart(productId: string, quantity: number = 1) {
    if (this.user) {
      // LOGGED IN: Save to server
      this.saveToServer('cart', { productId, quantity }, 'add');
    } else {
      // GUEST: In-memory only
      const existing = this.guestBasket.find(item => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.guestBasket.push({ productId, quantity });
      }
    }
  }

  addToSearchHistory(query: string) {
    if (this.user) {
      // LOGGED IN: Save to server
      this.saveToServer('search', query, 'add');
    } else {
      // GUEST: In-memory only
      if (!this.guestSearches.includes(query)) {
        this.guestSearches.unshift(query);
        this.guestSearches = this.guestSearches.slice(0, 10);
      }
    }
  }

  async signIn(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3001/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password,
          // Send guest data for merging
          guestData: {
            basket: this.guestBasket,
            likes: this.guestLikes,
            searches: this.guestSearches
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        this.authToken = result.token || 'temp_token';
        this.user = result.user;
        
        localStorage.setItem('authToken', this.authToken);
        
        // Clear guest data after successful login
        this.clearGuestData();
        
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } catch {
      return { success: false, error: 'Connection error' };
    }
  }

  async signUp(data: { name: string; email: string; password: string; phone?: string }) {
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...data, 
          LPID: 'LPID_' + Date.now(),
          guestData: {
            basket: this.guestBasket,
            likes: this.guestLikes,
            searches: this.guestSearches
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        this.authToken = result.token || 'temp_token';
        this.user = result.user;
        
        localStorage.setItem('authToken', this.authToken);
        this.clearGuestData();
        
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } catch {
      return { success: false, error: 'Connection error' };
    }
  }

  signOut() {
    // Clear authentication
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('authToken');
    
    // Reset all state to empty
    this.clearGuestData();
    
    // Reload page to ensure clean state
    window.location.reload();
  }

  private clearGuestData() {
    this.guestBasket = [];
    this.guestLikes = [];
    this.guestSearches = [];
  }

  private async fetchUserData() {
    if (!this.authToken) return;
    
    try {
      const response = await fetch('http://localhost:3001/api/user/me', {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      });
      
      if (response.ok) {
        this.user = await response.json();
      } else {
        this.signOut();
      }
    } catch {
      console.log('Failed to fetch user data');
    }
  }

  private async saveToServer(type: string, data: any, action: string) {
    if (!this.authToken || !this.user) return;
    
    try {
      await fetch(`http://localhost:3001/api/user/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify({ data, action })
      });
    } catch {
      console.log('Failed to save to server');
    }
  }

  // GETTERS
  getUser() { return this.user; }
  isSignedIn() { return !!this.user; }
  
  getLikedProducts() {
    return this.user ? this.user.likedProducts : this.guestLikes;
  }
  
  getCart() {
    if (this.user) {
      return this.user.cart;
    }
    return this.guestBasket.map(item => ({
      ...item,
      addedAt: new Date().toISOString()
    }));
  }
  
  getSearchHistory() {
    if (this.user) {
      return this.user.searchHistory;
    }
    return this.guestSearches.map(query => ({
      query,
      timestamp: new Date().toISOString()
    }));
  }
}

export const correctAuth = new CorrectAuth();
export type { User };