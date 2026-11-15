import { create } from 'zustand';

/** Visual state for the floating bag: when it shows, and a counter that makes it bounce. */
interface BagFxState {
  /** The current tab screen is scrolled past its header bag icon. */
  scrolled: boolean;
  /** Timestamp of the last landed item; keeps the bag visible briefly after adding. */
  lastLandAt: number;
  /** Increments on every landing; the bag bounces when it changes. */
  pulse: number;
  setScrolled(scrolled: boolean): void;
  reveal(): void;
  land(): void;
}

export const useBagFx = create<BagFxState>((set) => ({
  scrolled: false,
  lastLandAt: 0,
  pulse: 0,
  setScrolled: (scrolled) => set((s) => (s.scrolled === scrolled ? s : { scrolled })),
  reveal: () => set({ lastLandAt: Date.now() }),
  land: () => set((s) => ({ lastLandAt: Date.now(), pulse: s.pulse + 1 })),
}));

/** Scroll handler factory for tab screens: shows the floating bag once the header scrolls away. */
export const trackScrollForBag = (y: number) => useBagFx.getState().setScrolled(y > 90);
