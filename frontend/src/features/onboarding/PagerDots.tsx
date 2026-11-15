import { View } from 'react-native';
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { palette } from '@/theme';

interface DotProps {
  index: number;
  count: number;
  width: number;
  scrollX: SharedValue<number>;
  loop?: boolean;
}

function Dot({ index, count, width, scrollX, loop }: DotProps) {
  const style = useAnimatedStyle(() => {
    const range = [(index - 1) * width, index * width, (index + 1) * width];
    let active = interpolate(scrollX.value, range, [0, 1, 0], Extrapolation.CLAMP);
    if (loop) {
      // The repeated slide after the last one lights up the first dot.
      const again = [(index + count - 1) * width, (index + count) * width, (index + count + 1) * width];
      active = Math.max(active, interpolate(scrollX.value, again, [0, 1, 0], Extrapolation.CLAMP));
    }
    return {
      width: 8 + active * 20,
      backgroundColor: interpolateColor(active, [0, 1], [palette.blush[300], palette.rose[500]]),
    };
  });
  return <Animated.View style={[{ height: 8, borderRadius: 4 }, style]} />;
}

export function PagerDots({ count, width, scrollX, loop }: { count: number; width: number; scrollX: SharedValue<number>; loop?: boolean }) {
  return (
    <View className="flex-row items-center justify-center gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} index={i} count={count} width={width} scrollX={scrollX} loop={loop} />
      ))}
    </View>
  );
}
