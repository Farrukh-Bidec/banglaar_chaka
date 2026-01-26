import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { watchlistApi } from '../api/watchlist';
import { extractErrorMessage } from '../utils/errorHelpers';

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],
      isLoading: false,
      error: null,
      async fetchWatchlist() {
        set({ isLoading: true, error: null });
        try {
          const { data } = await watchlistApi.getWatchlist();
          set({ watchlist: data?.data, isLoading: false });
        } catch (error) {
          set({ error: extractErrorMessage(error, "Failed to fetch watchlist"), isLoading: false });
        }
      },
      async addToWatchlist(productSlug) {
        set({ isLoading: true, error: null });
        try {
          await watchlistApi.addToWatchlist(productSlug);
          const { data } = await watchlistApi.getWatchlist();
          set({ watchlist: data?.data, isLoading: false });
        } catch (error) {
          set({ error: extractErrorMessage(error, "Failed to add to watchlist"), isLoading: false });
        }
      },
      async removeFromWatchlist(productSlug) {
        set({ isLoading: true, error: null });
        try {
          await watchlistApi.removeFromWatchlist(productSlug);
          set({ watchlist: get().watchlist.filter(item => item.listing.slug !== productSlug), isLoading: false });
        } catch (error) {
          set({ error: extractErrorMessage(error, "Failed to remove from watchlist"), isLoading: false });
        }
      },
      setWatchlist(watchlist) {
        set({ watchlist });
      },
      clearWatchlist() {
        set({ watchlist: [] });
      },
    }),
    {
      name: 'watchlist-storage',
      getStorage: () => localStorage,
    }
  )
); 