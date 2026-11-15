import { router } from 'expo-router';
import { useAuthStore } from '@/features/auth/auth.store';
import { SplashIntro } from '@/features/onboarding/SplashIntro';

/** Entry: plays the brand intro, then routes by session and onboarding state. */
export default function Index() {
  const goNext = () => {
    const route = () => {
      const { token, hasOnboarded } = useAuthStore.getState();
      router.replace(token ? '/(tabs)' : hasOnboarded ? '/login' : '/welcome');
    };
    if (useAuthStore.persist.hasHydrated()) route();
    else useAuthStore.persist.onFinishHydration(route);
  };

  return <SplashIntro onFinish={goNext} />;
}
