import { router } from 'expo-router';
import { useAuthStore } from '@/features/auth/auth.store';
import { SplashIntro } from '@/features/onboarding/SplashIntro';

/** Entry: plays the brand intro, then routes by session and onboarding state. */
export default function Index() {
  const goNext = () => {
    const route = () => {
      // Signed-in users go to the shop (or unlock first if they've been away);
      // everyone else sees the intro on every launch.
      const auth = useAuthStore.getState();
      if (!auth.token) router.replace('/welcome');
      else router.replace(auth.lockIfIdle() ? '/unlock' : '/(tabs)');
    };
    if (useAuthStore.persist.hasHydrated()) route();
    else useAuthStore.persist.onFinishHydration(route);
  };

  return <SplashIntro onFinish={goNext} />;
}
