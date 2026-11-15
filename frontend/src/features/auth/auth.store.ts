import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokenGetter } from '@/lib/http';
import { persistStorage } from '@/lib/storage';
import type { AuthSession, User } from '@/types/domain';

/** Away longer than this and the app asks for fingerprint or password again. */
export const LOCK_AFTER_MS = 5 * 60_000;

interface AuthState {
  token: string | null;
  user: User | null;
  /** Session is valid but hidden behind the unlock screen. */
  locked: boolean;
  /** When the app last went to the background (or was closed). */
  lastActiveAt: number;
  biometricEnabled: boolean;
  setSession(session: AuthSession): void;
  markBackgrounded(): void;
  lockIfIdle(): boolean;
  unlock(): void;
  setBiometricEnabled(enabled: boolean): void;
  signOut(): void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      locked: false,
      lastActiveAt: 0,
      biometricEnabled: true,
      setSession: ({ token, user }) => set({ token, user, locked: false, lastActiveAt: Date.now() }),
      markBackgrounded: () => set({ lastActiveAt: Date.now() }),
      lockIfIdle: () => {
        const { token, locked, lastActiveAt } = get();
        if (!token) return false;
        if (locked || Date.now() - lastActiveAt > LOCK_AFTER_MS) {
          if (!locked) set({ locked: true });
          return true;
        }
        return false;
      },
      unlock: () => set({ locked: false, lastActiveAt: Date.now() }),
      setBiometricEnabled: (biometricEnabled) => set({ biometricEnabled }),
      signOut: () => set({ token: null, user: null, locked: false }),
    }),
    { name: 'velora.auth', storage: persistStorage },
  ),
);

setTokenGetter(() => useAuthStore.getState().token);
