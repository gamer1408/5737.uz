interface User {
  id: string;
  email: string;
  LPID: string;
  profile: { firstName: string; lastName: string; phone: string };
  likedProducts: string[];
  cart: Array<{ productId: string; quantity: number; addedAt: string }>;
  searchHistory: Array<{ query: string; timestamp: string }>;
}

class SimpleAuth {
  private user: User | null = null;

  constructor() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      try {
        this.user = JSON.parse(saved);
      } catch {
        localStorage.removeItem('currentUser');
      }
    }
  }

  async signIn(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3001/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      
      if (result.success) {
        this.user = result.user;
        localStorage.setItem('currentUser', JSON.stringify(result.user));
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
        body: JSON.stringify({ ...data, LPID: 'LPID_' + Date.now() })
      });
      const result = await response.json();
      
      if (result.success) {
        this.user = result.user;
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error };
    } catch {
      return { success: false, error: 'Connection error' };
    }
  }

  signOut() {
    this.user = null;
    localStorage.clear();
    window.location.reload();
  }

  addToLiked(productId: string) {
    if (!this.user) return; // GUEST: DO NOTHING
    
    if (!this.user.likedProducts.includes(productId)) {
      this.user.likedProducts.push(productId);
      this.saveUser();
    }
  }

  removeFromLiked(productId: string) {
    if (!this.user) return; // GUEST: DO NOTHING
    
    this.user.likedProducts = this.user.likedProducts.filter(id => id !== productId);
    this.saveUser();
  }

  addToCart(productId: string, quantity: number = 1) {
    if (!this.user) return; // GUEST: DO NOTHING
    
    const existing = this.user.cart.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.user.cart.push({ productId, quantity, addedAt: new Date().toISOString() });
    }
    this.saveUser();
  }

  private saveUser() {
    if (this.user) {
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    }
  }

  getUser() { return this.user; }
  isSignedIn() { return !!this.user; }
  getLikedProducts() { return this.user ? this.user.likedProducts : []; }
  getCart() { return this.user ? this.user.cart : []; }
}

export const simpleAuth = new SimpleAuth();
export type { User };