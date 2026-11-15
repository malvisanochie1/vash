import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokenGetter } from '@/lib/http';
import { persistStorage } from '@/lib/storage';
import type { AuthSession, User } from '@/types/domain';

interface AuthState {
  token: string | null;
  user: User | null;
  hasOnboarded: boolean;
  setSession(session: AuthSession): void;
  completeOnboarding(): void;
  signOut(): void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hasOnboarded: false,
      setSession: ({ token, user }) => set({ token, user }),
      completeOnboarding: () => set({ hasOnboarded: true }),
      signOut: () => set({ token: null, user: null }),
    }),
    { name: 'velora.auth', storage: persistStorage },
  ),
);

setTokenGetter(() => useAuthStore.getState().token);
