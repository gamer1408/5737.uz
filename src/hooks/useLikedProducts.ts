// src/hooks/useLikedProducts.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface LikedProductsState {
  likedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  isLiked: (productId: number) => boolean;
}

export const useLikedProducts = create<LikedProductsState>()(
  persist(
    (set, get) => ({
      likedProducts: [],
      addProduct: (product) =>
        set((state) => ({
          likedProducts: [...state.likedProducts, product],
        })),
      removeProduct: (productId) =>
        set((state) => ({
          likedProducts: state.likedProducts.filter((p) => p.id !== productId),
        })),
      isLiked: (productId) =>
        get().likedProducts.some((p) => p.id === productId),
    }),
    {
      name: 'liked-products-storage',
    }
  )
);