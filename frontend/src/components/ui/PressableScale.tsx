import * as Haptics from 'expo-haptics';
import { Platform, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { styled } from '@/lib/styling';
import { motion } from '@/theme';

const AnimatedPressable = styled(Animated.createAnimatedComponent(Pressable));

interface Props extends Omit<PressableProps, 'style'> {
  /** How far the element shrinks while pressed. */
  scaleTo?: number;
  haptic?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** The single tactile primitive: every tappable surface springs the same way. */
export function PressableScale({ scaleTo = 0.96, haptic = true, onPressIn, onPressOut, onPress, style, ...rest }: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPressIn={(e) => {
        scale.value = withSpring(scaleTo, motion.spring);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, motion.springBouncy);
        onPressOut?.(e);
      }}
      onPress={(e) => {
        if (haptic && Platform.OS !== 'web') void Haptics.selectionAsync();
        onPress?.(e);
      }}
      style={[animatedStyle, style]}
      {...rest}
    />
  );
}
