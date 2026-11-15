import { useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

export type AppearPreset = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

export interface AppearOptions {
  delay?: number;
  duration?: number;
  preset?: AppearPreset;
  /** Travel distance in px for slide presets. */
  distance?: number;
}

export const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1);

/**
 * Entrance animation driven by a shared value on the UI thread.
 * Deliberately avoids Reanimated layout animations (`entering`), which can
 * leave views stuck invisible when a screen mounts during a native transition.
 */
export function useAppear({ delay = 0, duration = 420, preset = 'up', distance = 16 }: AppearOptions = {}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(1, { duration, easing: EASE_OUT }));
  }, [delay, duration, progress]);

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
