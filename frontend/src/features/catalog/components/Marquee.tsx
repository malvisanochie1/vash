import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Text } from '@/components/ui';

/** Endless ribbon of text — the Black Friday tape from the campaign. */
export function Marquee({ text, speed = 40 }: { text: string; speed?: number }) {
  const [segmentWidth, setSegmentWidth] = useState(0);
  const x = useSharedValue(0);

  useEffect(() => {
    if (!segmentWidth) return;
    x.value = 0;
    x.value = withRepeat(withTiming(-segmentWidth, { duration: (segmentWidth / speed) * 1000, easing: Easing.linear }), -1);
  }, [segmentWidth, speed, x]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const segment = `${text}   ·   `.repeat(4);

  return (
    <View className="overflow-hidden">
      <Animated.View style={[{ flexDirection: 'row' }, style]}>
        {[0, 1].map((i) => (
          <Text
            key={i}
            numberOfLines={1}
            onLayout={i === 0 ? (e) => setSegmentWidth(e.nativeEvent.layout.width) : undefined}
            className="font-body-semibold text-[10px] uppercase tracking-[2px] text-white"
          >
            {segment}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
}
