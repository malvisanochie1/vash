import { create } from 'zustand';

/** Visual state shared by the flying product, its card and the bag. */
interface BagFxState {
  /** Increments on every landing; the bag swells when it changes. */
  pulse: number;
  /** Product currently in the air — its card image dims as if it left the frame. */
  flyingProductId: string | null;
  setFlying(productId: string | null): void;
  land(): void;
}

export const useBagFx = create<BagFxState>((set) => ({
  pulse: 0,
  flyingProductId: null,
  setFlying: (flyingProductId) => set({ flyingProductId }),
  land: () => set((s) => ({ pulse: s.pulse + 1, flyingProductId: null })),
}));
