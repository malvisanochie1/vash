import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokenGetter } from '@/lib/http';
import { persistStorage } from '@/lib/storage';
import type { AuthSession, User } from '@/types/domain';

interface AuthState {
  token: string | null;
  user: User | null;
  setSession(session: AuthSession): void;
  signOut(): void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: ({ token, user }) => set({ token, user }),
      signOut: () => set({ token: null, user: null }),
    }),
    { name: 'velora.auth', storage: persistStorage },
  ),
);

setTokenGetter(() => useAuthStore.getState().token);
