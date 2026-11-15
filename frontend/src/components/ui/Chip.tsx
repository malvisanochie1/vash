import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import { palette } from '@/theme';
import { PressableScale } from './PressableScale';
import { Text } from './Text';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  className?: string;
}

/** Selectable pill; a deep plum fill fades in behind the label when chosen. */
export function Chip({ label, selected, onPress, className }: Props) {
  const fill = useSharedValue(selected ? 1 : 0);
  useEffect(() => {
    fill.value = withTiming(selected ? 1 : 0, { duration: 320 });
  }, [fill, selected]);
  const fillStyle = useAnimatedStyle(() => ({ opacity: fill.value }));

  return (
    <PressableScale onPress={onPress} scaleTo={0.92} accessibilityState={{ selected }}>
      <View className={cn('h-11 min-w-[72px] items-center justify-center overflow-hidden rounded-full border border-line bg-white px-5', className)}>
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: palette.plum[800] }, fillStyle]} />
        <Text className={cn('font-body-medium text-[13px]', selected ? 'text-white' : 'text-ink')}>{label}</Text>
      </View>
    </PressableScale>
  );
}
