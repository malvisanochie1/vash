import type { LucideIcon } from 'lucide-react-native';
import { useEffect, useRef, type ComponentRef, type Ref } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import { motion, palette, shadow } from '@/theme';
import { PressableScale } from './PressableScale';
import { Text } from './Text';

interface Props {
  ref?: Ref<ComponentRef<typeof View>>;
  icon: LucideIcon;
  onPress?: () => void;
  badge?: number;
  tone?: 'light' | 'glass' | 'pink';
  size?: number;
  accessibilityLabel: string;
  className?: string;
  iconColor?: string;
  filled?: boolean;
}

/** Round icon button with an optional count badge that bounces when it changes. */
export function IconButton({
  ref,
  icon: Icon,
  onPress,
  badge,
  tone = 'light',
  size = 44,
  accessibilityLabel,
  className,
  iconColor,
  filled,
}: Props) {
  const bump = useSharedValue(1);
  const previous = useRef(badge);
  useEffect(() => {
    if (badge && badge !== previous.current) {
      bump.value = withSequence(withTiming(1.3, { duration: 140 }), withSpring(1, motion.spring));
    }
    previous.current = badge;
  }, [badge, bump]);
  const bumpStyle = useAnimatedStyle(() => ({ transform: [{ scale: bump.value }] }));

  const color = iconColor ?? (tone === 'pink' ? palette.white : palette.ink);

  return (
    <PressableScale onPress={onPress} accessibilityLabel={accessibilityLabel} scaleTo={0.88}>
      <View
        ref={ref}
        collapsable={false}
        className={cn(
          'items-center justify-center rounded-full',
          tone === 'light' && 'bg-white',
          tone === 'glass' && 'bg-white/80',
          tone === 'pink' && 'bg-rose-500',
          className,
        )}
        style={[{ width: size, height: size }, tone === 'light' ? shadow.card : undefined]}
      >
        <Animated.View style={bumpStyle}>
          <Icon size={size * 0.42} color={color} fill={filled ? color : 'transparent'} strokeWidth={2} />
        </Animated.View>
        {!!badge && (
          <View className="absolute -right-0.5 -top-0.5 h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1">
            <Text className="font-body-semibold text-[10px] text-white">{badge}</Text>
          </View>
        )}
      </View>
    </PressableScale>
  );
}
