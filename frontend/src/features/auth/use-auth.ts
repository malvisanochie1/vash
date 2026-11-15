import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { api } from '@/services';
import { useAuthStore } from './auth.store';

interface Credentials {
  email: string;
  password: string;
}

/**
 * Signs in. By default it goes straight to the shop; pass `onSignedIn` to
 * show something first (e.g. offering fingerprint sign-in).
 */
export const useLogin = (onSignedIn?: (credentials: Credentials) => void) => {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: ({ email, password }: Credentials) => api.auth.login(email, password),
    onSuccess: (session, credentials) => {
      setSession(session);
      if (onSignedIn) onSignedIn(credentials);
      else router.replace('/(tabs)');
    },
  });
};

export const useRegister = () => {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      api.auth.register(name, email, password),
    onSuccess: (session) => {
      setSession(session);
      router.replace('/(tabs)');
    },
  });
};
