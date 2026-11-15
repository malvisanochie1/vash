import { router, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useAuthStore } from './auth.store';

const OPEN_ROUTES = new Set(['/', '/unlock', '/login', '/register', '/welcome']);

/**
 * Locks the app after it has been away for a while. Remembers when the app
 * went to the background; on return (or next launch) the unlock screen asks
 * for fingerprint or password before anything else is shown.
 */
export function SessionGuard() {
  const pathname = usePathname();
  const locked = useAuthStore((s) => s.locked);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      const auth = useAuthStore.getState();
      if (state === 'background') auth.markBackgrounded();
      if (state === 'active') auth.lockIfIdle();
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (locked && !OPEN_ROUTES.has(pathname)) router.replace('/unlock');
  }, [locked, pathname]);

  return null;
}
