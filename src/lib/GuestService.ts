class GuestService {
  private guestData = {
    basket: [],
    wishlist: [],
    likedProducts: [],
    searchHistory: []
  };

  // Guest actions - temporary only
  addToLiked(productId: string) {
    if (!this.guestData.likedProducts.find(item => item.productId === productId)) {
      this.guestData.likedProducts.push({
        productId,
        likedAt: new Date().toISOString()
      });
    }
  }

  removeFromLiked(productId: string) {
    this.guestData.likedProducts = this.guestData.likedProducts.filter(
      item => item.productId !== productId
    );
  }

  addToBasket(productId: string, quantity: number = 1) {
    const existing = this.guestData.basket.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.guestData.basket.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
  }

  addToWishlist(productId: string) {
    if (!this.guestData.wishlist.find(item => item.productId === productId)) {
      this.guestData.wishlist.push({
        productId,
        addedAt: new Date().toISOString()
      });
    }
  }

  addToSearchHistory(query: string) {
    this.guestData.searchHistory = [
      { query, timestamp: new Date().toISOString() },
      ...this.guestData.searchHistory.filter(h => h.query !== query)
    ].slice(0, 10);
  }

  getGuestData() {
    return this.guestData;
  }

  clearGuestData() {
    this.guestData = {
      basket: [],
      wishlist: [],
      likedProducts: [],
      searchHistory: []
    };
  }
}

export const guestService = new GuestService();