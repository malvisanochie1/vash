import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

const FALLBACK_MS = 450;

/**
 * True once the screen's enter transition has finished. Use it to defer
 * below-the-fold content so the slide-in itself stays perfectly smooth.
 */
export function useAfterTransition() {
  const navigation = useNavigation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const done = () => setReady(true);
    const timer = setTimeout(done, FALLBACK_MS);
    const unsubscribe = navigation.addListener('transitionEnd' as never, done);
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [navigation]);

  return ready;
}
