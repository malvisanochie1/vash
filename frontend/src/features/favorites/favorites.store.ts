import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { persistStorage } from '@/lib/storage';

interface FavoritesState {
  ids: string[];
  toggle(productId: string): void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (productId) =>
        set((s) => ({
          ids: s.ids.includes(productId) ? s.ids.filter((id) => id !== productId) : [...s.ids, productId],
        })),
    }),
    { name: 'velora.favorites', storage: persistStorage },
  ),
);

export const useIsFavorite = (productId: string) =>
  useFavoritesStore((s) => s.ids.includes(productId));
