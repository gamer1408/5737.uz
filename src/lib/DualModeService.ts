interface UserData {
  id: string;
  email: string;
  LPID: string;
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  likedProducts: string[];
  viewHistory: string[];
  searchHistory: Array<{ query: string; timestamp: string }>;
  cart: Array<{ productId: string; quantity: number; addedAt: string }>;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
  };
}

class DualModeService {
  private currentUser: UserData | null = null;
  private baseUrl = 'http://localhost:3001/api';
  private isGuestMode = true;
  private listeners: Array<() => void> = [];

  constructor() {
    this.initializeMode();
  }

  private initializeMode() {
    // Clear all temporary data
    sessionStorage.clear();
    
    // Check if user exists
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData);
        this.isGuestMode = false;
        this.refreshUserData();
      } catch {
        this.enterGuestMode();
      }
    } else {
      this.enterGuestMode();
    }
  }

  private enterGuestMode() {
    this.isGuestMode = true;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.notifyListeners();
  }

  private enterUserMode(user: UserData) {
    this.isGuestMode = false;
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  public addListener(listener: () => void) {
    this.listeners.push(listener);
  }

  public removeListener(listener: () => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }



  private async refreshUserData() {
    if (!this.currentUser || this.isGuestMode) return;
    
    try {
      const response = await fetch(`${this.baseUrl}/user/${this.currentUser.LPID}`);
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          this.currentUser = data.user;
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          this.notifyListeners();
        }
      } else {
        console.error('User not found on server');
        this.enterGuestMode();
      }
    } catch (error) {
      console.log('Server unavailable, using cached data');
    }
  }

  private useLocalAuth() {
    // Fallback to local authentication when server is down
    console.log('Using local authentication mode');
  }

  private generateLPID(): string {
    return 'LPID_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }



  // USER MODE METHODS
  async signIn(email: string, password: string) {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      if (result.success && result.user) {
        this.enterUserMode(result.user);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error || 'Login failed' };
    } catch (error) {
      console.log('Server unavailable, trying local auth');
      return this.localSignIn(email, password);
    }
  }

  private localSignIn(email: string, password: string) {
    try {
      const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        this.enterUserMode(user);
        return { success: true, user };
      }
      
      return { success: false, error: 'Email yoki parol noto\'g\'ri' };
    } catch (error) {
      return { success: false, error: 'Local authentication error' };
    }
  }

  async signUp(userData: { name: string; email: string; password: string; phone?: string }) {
    try {
      const LPID = this.generateLPID();
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, LPID })
      });

      const result = await response.json();
      if (result.success && result.user) {
        this.enterUserMode(result.user);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error || 'Registration failed' };
    } catch (error) {
      console.log('Server unavailable, trying local registration');
      return this.localSignUp(userData);
    }
  }

  private localSignUp(userData: { name: string; email: string; password: string; phone?: string }) {
    try {
      const users = JSON.parse(localStorage.getItem('localUsers') || '[]');
      
      if (users.find((u: any) => u.email === userData.email)) {
        return { success: false, error: 'Bu email allaqachon ro\'yxatdan o\'tgan' };
      }

      const newUser = {
        id: Date.now().toString(),
        email: userData.email.toLowerCase(),
        password: userData.password,
        LPID: this.generateLPID(),
        profile: {
          firstName: userData.name.split(' ')[0] || '',
          lastName: userData.name.split(' ').slice(1).join(' ') || '',
          phone: userData.phone || ''
        },
        likedProducts: [],
        viewHistory: [],
        searchHistory: [],
        cart: [],
        preferences: { language: 'uz', currency: 'UZS', notifications: true }
      };

      users.push(newUser);
      localStorage.setItem('localUsers', JSON.stringify(users));
      this.enterUserMode(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Local registration error' };
    }
  }

  signOut() {
    this.enterGuestMode();
    window.location.reload();
  }



  // DUAL MODE ACTIONS
  addToLiked(productId: string) {
    if (this.isGuestMode) {
      // GUEST: Do nothing, no save, no UI update
      return false;
    }
    
    if (this.currentUser && !this.currentUser.likedProducts.includes(productId)) {
      this.updateUserData('likedProducts', [...this.currentUser.likedProducts, productId]);
    }
    return true;
  }

  removeFromLiked(productId: string) {
    if (this.isGuestMode) {
      // GUEST: Do nothing
      return false;
    }
    
    if (this.currentUser) {
      const updated = this.currentUser.likedProducts.filter(id => id !== productId);
      this.updateUserData('likedProducts', updated);
    }
    return true;
  }

  addToCart(productId: string, quantity: number = 1) {
    if (this.isGuestMode) {
      // GUEST: Do nothing
      return false;
    }
    
    if (this.currentUser) {
      const existing = this.currentUser.cart.find(item => item.productId === productId);
      let updatedCart;
      if (existing) {
        updatedCart = this.currentUser.cart.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...this.currentUser.cart, { productId, quantity, addedAt: new Date().toISOString() }];
      }
      this.updateUserData('cart', updatedCart);
    }
    return true;
  }

  addToSearchHistory(query: string) {
    if (!this.currentUser) {
      // GUEST: Update UI only, no save
      return true;
    }
    
    const updated = [
      { query, timestamp: new Date().toISOString() },
      ...this.currentUser.searchHistory.filter(h => h.query !== query)
    ].slice(0, 10);
    this.updateUserData('searchHistory', updated);
  }

  addToViewHistory(productId: string) {
    if (!this.currentUser) return; // GUEST: DO NOTHING
    
    const updated = [productId, ...this.currentUser.viewHistory.filter(id => id !== productId)].slice(0, 20);
    this.updateUserData('viewHistory', updated);
  }

  private async updateUserData(field: string, data: any) {
    if (!this.currentUser) return;

    try {
      const response = await fetch(`${this.baseUrl}/user/${this.currentUser.LPID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: data })
      });

      if (response.ok) {
        (this.currentUser as any)[field] = data;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        // Trigger storage event for other windows
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'currentUser',
          newValue: JSON.stringify(this.currentUser)
        }));
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  }

  // GETTERS
  getLikedProducts(): string[] {
    return this.isGuestMode ? [] : (this.currentUser?.likedProducts || []);
  }

  getCart() {
    return this.isGuestMode ? [] : (this.currentUser?.cart || []);
  }

  getSearchHistory() {
    return this.isGuestMode ? [] : (this.currentUser?.searchHistory || []);
  }

  getViewHistory(): string[] {
    return this.currentUser ? this.currentUser.viewHistory : [];
  }

  getCurrentUser(): UserData | null {
    return this.currentUser;
  }

  isSignedIn(): boolean {
    return !this.isGuestMode && this.currentUser !== null;
  }

  isGuest(): boolean {
    return this.isGuestMode;
  }

  getUserLPID(): string | null {
    return this.currentUser?.LPID || null;
  }
}

export const dualModeService = new DualModeService();
export type { UserData };