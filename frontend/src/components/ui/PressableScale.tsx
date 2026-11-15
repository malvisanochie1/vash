import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { EASE_OUT } from '@/theme';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  children?: ReactNode;
  /** How far the element shrinks while pressed. */
  scaleTo?: number;
  /** Classes for the pressable surface itself. */
  className?: string;
  style?: StyleProp<ViewStyle>;
  /** Style for the outer animated box (e.g. `{ flex: 1 }` inside a row). */
  wrapperStyle?: StyleProp<ViewStyle>;
}

/**
 * The single tactile primitive: every tappable surface springs the same way.
 * Scale runs on an outer Animated.View; classes stay on the core Pressable.
 */
export function PressableScale({
  children,
  scaleTo = 0.96,
  className,
  style,
  wrapperStyle,
  onPressIn,
  onPressOut,
  onPress,
  ...rest
}: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={[wrapperStyle, animatedStyle]}>
      <Pressable
        accessibilityRole="button"
        className={className}
        style={style}
        onPressIn={(e) => {
          scale.value = withTiming(scaleTo, { duration: 160, easing: EASE_OUT });
          onPressIn?.(e);
        }}
        onPressOut={(e) => {
          // Soft release: eases back out, no bounce.
          scale.value = withTiming(1, { duration: 360, easing: EASE_OUT });
          onPressOut?.(e);
        }}
        onPress={onPress}
        {...rest}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
