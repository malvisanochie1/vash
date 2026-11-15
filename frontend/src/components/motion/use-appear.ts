import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { EASE_OUT } from '@/theme';

export type AppearPreset = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

export interface AppearOptions {
  delay?: number;
  duration?: number;
  preset?: AppearPreset;
  /** Travel distance in px for slide presets. */
  distance?: number;
  /** Show straight away, no animation. */
  disabled?: boolean;
}

export { EASE_OUT } from '@/theme';

/**
 * Entrance animation driven by a shared value on the UI thread.
 * Deliberately avoids Reanimated layout animations (`entering`), which can
 * leave views stuck invisible when a screen mounts during a native transition.
 */
export function useAppear({ delay = 0, duration = 700, preset = 'up', distance = 12, disabled = false }: AppearOptions = {}) {
  const progress = useSharedValue(disabled ? 1 : 0);

  useEffect(() => {
    if (disabled) return;
    progress.value = withDelay(delay, withTiming(1, { duration, easing: EASE_OUT }));
  }, [delay, disabled, duration, progress]);

  return useAnimatedStyle(() => {
    const p = progress.value;
    const offset = (1 - p) * distance;
    switch (preset) {
      case 'up':
        return { opacity: p, transform: [{ translateY: offset }] };
      case 'down':
        return { opacity: p, transform: [{ translateY: -offset }] };
      case 'left':
        return { opacity: p, transform: [{ translateX: offset }] };
      case 'right':
        return { opacity: p, transform: [{ translateX: -offset }] };
      case 'scale':
        return { opacity: p, transform: [{ scale: 0.92 + p * 0.08 }] };
      default:
        return { opacity: p };
    }
  });
}
