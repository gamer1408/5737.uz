import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryState {
  searches: string[];
  addSearch: (query: string) => void;
  clearHistory: () => void;
  removeSearch: (query: string) => void;
}

export const useSearchHistory = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      searches: [],
      addSearch: (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;
        
        set((state) => {
          const filtered = state.searches.filter(s => s !== trimmedQuery);
          return {
            searches: [trimmedQuery, ...filtered].slice(0, 10) // Keep last 10 searches
          };
        });
      },
      clearHistory: () => set({ searches: [] }),
      removeSearch: (query: string) => set((state) => ({
        searches: state.searches.filter(s => s !== query)
      }))
    }),
    {
      name: 'search-history-storage',
    }
  )
);