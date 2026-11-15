import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import { palette } from '@/theme';
import { PressableScale } from './PressableScale';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  className?: string;
}

/** Selectable pill; colours cross-fade to deep plum when chosen. */
export function Chip({ label, selected, onPress, className }: Props) {
  const progress = useDerivedValue(() => withTiming(selected ? 1 : 0, { duration: 240 }));
  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [palette.white, palette.plum[800]]),
    borderColor: interpolateColor(progress.value, [0, 1], [palette.line, palette.plum[800]]),
  }));
  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [palette.ink, palette.white]),
  }));

  return (
    <PressableScale onPress={onPress} scaleTo={0.92} accessibilityState={{ selected }}>
      <Animated.View className={cn('h-11 min-w-[72px] items-center justify-center rounded-full border px-5', className)} style={boxStyle}>
        <Animated.Text className="font-body-medium text-[13px]" style={textStyle}>
          {label}
        </Animated.Text>
      </Animated.View>
    </PressableScale>
  );
}
