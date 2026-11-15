import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { api } from '@/services';
import { useAuthStore } from './auth.store';

export const useLogin = () => {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => api.auth.login(email, password),
    onSuccess: (session) => {
      setSession(session);
      router.replace('/(tabs)');
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
