interface User {
  id: string;
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  status: {
    current: 'active' | 'inactive' | 'poor';
    lastLoginAt: string;
  };
  createdAt: string;
  basket: Array<{
    productId: string;
    quantity: number;
    addedAt: string;
  }>;
  wishlist: Array<{
    productId: string;
    addedAt: string;
  }>;
  likedProducts: Array<{
    productId: string;
    likedAt: string;
  }>;
  searchHistory: Array<{
    query: string;
    timestamp: string;
  }>;
  orderHistory: Array<{
    orderId: string;
    orderDate: string;
    totalAmount: number;
    status: string;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
  }>;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
  };
}

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

class AuthService {
  private baseUrl = 'http://localhost:3001/api';
  private currentUser: User | null = null;

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      localStorage.removeItem('currentUser');
    }
  }

  private saveUserToStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        this.saveUserToStorage(data.user);
        return { success: true, user: data.user };
      }

      return { success: false, error: data.error };
    } catch (error) {
      console.error('Server unavailable, using local auth:', error);
      return this.localSignIn(email, password);
    }
  }

  async signUp(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success && data.user) {
        this.saveUserToStorage(data.user);
        return { success: true, user: data.user };
      }

      return { success: false, error: data.error };
    } catch (error) {
      console.error('Server unavailable, using local auth:', error);
      return this.localSignUp(userData);
    }
  }

  async updateUser(updates: Partial<User>): Promise<AuthResponse> {
    if (!this.currentUser) {
      return { success: false, error: 'Foydalanuvchi tizimga kirmagan' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/user/${this.currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success && data.user) {
        this.saveUserToStorage(data.user);
        return { success: true, user: data.user };
      }

      return { success: false, error: data.error };
    } catch (error) {
      console.error('Server unavailable, updating locally:', error);
      return this.localUpdateUser(updates);
    }
  }

  private localUpdateUser(updates: Partial<User>): AuthResponse {
    if (!this.currentUser) {
      return { success: false, error: 'Foydalanuvchi tizimga kirmagan' };
    }

    const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === this.currentUser!.id);
    
    if (userIndex === -1) {
      return { success: false, error: 'Foydalanuvchi topilmadi' };
    }

    delete updates.password;
    delete updates.id;
    
    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };
    this.updateLocalUsers(users);
    this.saveUserToStorage(users[userIndex]);
    
    return { success: true, user: users[userIndex] };
  }

  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('guestData');
    this.currentUser = null;
  }

  getLikedProducts() {
    if (this.currentUser) {
      return this.currentUser.likedProducts;
    }
    const guestData = JSON.parse(localStorage.getItem('guestData') || '{}');
    return guestData.likedProducts || [];
  }

  getBasket() {
    if (this.currentUser) {
      return this.currentUser.basket;
    }
    const guestData = JSON.parse(localStorage.getItem('guestData') || '{}');
    return guestData.basket || [];
  }

  getSearchHistory() {
    if (this.currentUser) {
      return this.currentUser.searchHistory;
    }
    const guestData = JSON.parse(localStorage.getItem('guestData') || '{}');
    return guestData.searchHistory || [];
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isSignedIn(): boolean {
    return this.currentUser !== null;
  }

  private hashPassword(password: string): string {
    // Simple hash for client-side (in production, use proper hashing)
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  private generateUserId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private localSignIn(email: string, password: string): AuthResponse {
    const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
    const hashedPassword = this.hashPassword(password);
    const user = users.find((u: User) => u.email === email && u.password === hashedPassword);
    
    if (user) {
      user.status.lastLoginAt = new Date().toISOString();
      user.status.current = 'active';
      this.updateLocalUsers(users);
      this.saveUserToStorage(user);
      return { success: true, user };
    }
    
    return { success: false, error: 'Email yoki parol noto\'g\'ri' };
  }

  private localSignUp(userData: { name: string; email: string; password: string; phone?: string }): AuthResponse {
    const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
    
    if (users.find((u: User) => u.email === userData.email)) {
      return { success: false, error: 'Bu email allaqachon ro\'yxatdan o\'tgan' };
    }

    const newUser: User = {
      id: this.generateUserId(),
      email: userData.email.toLowerCase().trim(),
      password: this.hashPassword(userData.password),
      profile: {
        firstName: userData.name.split(' ')[0] || '',
        lastName: userData.name.split(' ').slice(1).join(' ') || '',
        phone: userData.phone || ''
      },
      status: {
        current: 'active',
        lastLoginAt: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      basket: [],
      wishlist: [],
      likedProducts: [],
      searchHistory: [],
      orderHistory: [],
      preferences: {
        language: 'uz',
        currency: 'UZS',
        notifications: true
      }
    };

    users.push(newUser);
    this.updateLocalUsers(users);
    this.saveUserToStorage(newUser);
    
    return { success: true, user: newUser };
  }

  private updateLocalUsers(users: User[]) {
    localStorage.setItem('localUsers', JSON.stringify(users));
  }

  // User data management methods
  async addToLiked(productId: string): Promise<boolean> {
    if (!this.currentUser) {
      // Guest mode - temporary storage
      const guestData = JSON.parse(localStorage.getItem('guestData') || '{}');
      if (!guestData.likedProducts) guestData.likedProducts = [];
      if (!guestData.likedProducts.find((item: any) => item.productId === productId)) {
        guestData.likedProducts.push({ productId, likedAt: new Date().toISOString() });
        localStorage.setItem('guestData', JSON.stringify(guestData));
      }
      return true;
    }
    
    const exists = this.currentUser.likedProducts.find(item => item.productId === productId);
    if (!exists) {
      const updatedLiked = [...this.currentUser.likedProducts, {
        productId,
        likedAt: new Date().toISOString()
      }];
      const result = await this.updateUser({ likedProducts: updatedLiked });
      return result.success;
    }
    return true;
  }

  async removeFromLiked(productId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    const updatedLiked = this.currentUser.likedProducts.filter(item => item.productId !== productId);
    const result = await this.updateUser({ likedProducts: updatedLiked });
    return result.success;
  }

  async addToWishlist(productId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    const exists = this.currentUser.wishlist.find(item => item.productId === productId);
    if (!exists) {
      const updatedWishlist = [...this.currentUser.wishlist, {
        productId,
        addedAt: new Date().toISOString()
      }];
      const result = await this.updateUser({ wishlist: updatedWishlist });
      return result.success;
    }
    return true;
  }

  async addToBasket(productId: string, quantity: number = 1): Promise<boolean> {
    if (!this.currentUser) {
      // Guest mode - temporary storage
      const guestData = JSON.parse(localStorage.getItem('guestData') || '{}');
      if (!guestData.basket) guestData.basket = [];
      const existing = guestData.basket.find((item: any) => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        guestData.basket.push({ productId, quantity, addedAt: new Date().toISOString() });
      }
      localStorage.setItem('guestData', JSON.stringify(guestData));
      return true;
    }
    
    const existingItem = this.currentUser.basket.find(item => item.productId === productId);
    let updatedBasket;
    
    if (existingItem) {
      updatedBasket = this.currentUser.basket.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedBasket = [...this.currentUser.basket, {
        productId,
        quantity,
        addedAt: new Date().toISOString()
      }];
    }
    
    const result = await this.updateUser({ basket: updatedBasket });
    return result.success;
  }

  async addToSearchHistory(query: string): Promise<boolean> {
    if (!query.trim()) return false;
    
    if (!this.currentUser) {
      // Guest mode - temporary storage
      const guestData = JSON.parse(localStorage.getItem('guestData') || '{}');
      if (!guestData.searchHistory) guestData.searchHistory = [];
      guestData.searchHistory = [
        { query: query.trim(), timestamp: new Date().toISOString() },
        ...guestData.searchHistory.filter((h: any) => h.query !== query.trim())
      ].slice(0, 10);
      localStorage.setItem('guestData', JSON.stringify(guestData));
      return true;
    }
    
    const updatedHistory = [
      { query: query.trim(), timestamp: new Date().toISOString() },
      ...this.currentUser.searchHistory.filter(h => h.query !== query.trim())
    ].slice(0, 10);
    
    const result = await this.updateUser({ searchHistory: updatedHistory });
    return result.success;
  }

  async addOrder(orderData: {
    orderId: string;
    totalAmount: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
  }): Promise<boolean> {
    if (!this.currentUser) return false;
    
    const newOrder = {
      orderId: orderData.orderId,
      orderDate: new Date().toISOString(),
      totalAmount: orderData.totalAmount,
      status: 'pending',
      items: orderData.items
    };
    
    const updatedHistory = [newOrder, ...this.currentUser.orderHistory];
    const result = await this.updateUser({ orderHistory: updatedHistory });
    return result.success;
  }
}

export const authService = new AuthService();
export type { User, AuthResponse };