import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { persistStorage } from '@/lib/storage';

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface AppliedPromo {
  code: string;
  description: string;
}

interface CartState {
  items: CartItem[];
  promo: AppliedPromo | null;
  add(item: CartItem): void;
  setQuantity(productId: string, variantId: string, quantity: number): void;
  remove(productId: string, variantId: string): void;
  applyPromo(promo: AppliedPromo | null): void;
  clear(): void;
}

const same = (a: CartItem, productId: string, variantId: string) =>
  a.productId === productId && a.variantId === variantId;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      promo: null,
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => same(i, item.productId, item.variantId));
          return {
            items: existing
              ? s.items.map((i) => (i === existing ? { ...i, quantity: i.quantity + item.quantity } : i))
              : [...s.items, item],
          };
        }),
      setQuantity: (productId, variantId, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => !same(i, productId, variantId))
              : s.items.map((i) => (same(i, productId, variantId) ? { ...i, quantity } : i)),
        })),
      remove: (productId, variantId) =>
        set((s) => ({ items: s.items.filter((i) => !same(i, productId, variantId)) })),
      applyPromo: (promo) => set({ promo }),
      clear: () => set({ items: [], promo: null }),
    }),
    { name: 'velora.cart', storage: persistStorage },
  ),
);

export const selectCartCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0);
