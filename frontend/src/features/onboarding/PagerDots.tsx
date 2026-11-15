import { View } from 'react-native';
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { palette } from '@/theme';

function Dot({ index, width, scrollX }: { index: number; width: number; scrollX: SharedValue<number> }) {
  const style = useAnimatedStyle(() => {
    const range = [(index - 1) * width, index * width, (index + 1) * width];
    const active = interpolate(scrollX.value, range, [0, 1, 0], Extrapolation.CLAMP);
    return {
      width: 8 + active * 20,
      backgroundColor: interpolateColor(active, [0, 1], [palette.blush[300], palette.rose[500]]),
    };
  });
  return <Animated.View style={[{ height: 8, borderRadius: 4 }, style]} />;
}

export function PagerDots({ count, width, scrollX }: { count: number; width: number; scrollX: SharedValue<number> }) {
  return (
    <View className="flex-row items-center justify-center gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} index={i} width={width} scrollX={scrollX} />
      ))}
    </View>
  );
}
