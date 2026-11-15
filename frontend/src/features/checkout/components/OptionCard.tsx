import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import { PressableScale, Text } from '@/components/ui';
import { palette } from '@/theme';

interface Props {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  trailing?: string;
  selected: boolean;
  onPress: () => void;
}

/** Radio card: border, tint and the radio dot all animate on selection. */
export function OptionCard({ icon: Icon, title, subtitle, trailing, selected, onPress }: Props) {
  const p = useDerivedValue(() => withTiming(selected ? 1 : 0, { duration: 220 }));
  const dot = useDerivedValue(() => withSpring(selected ? 1 : 0, { damping: 12, stiffness: 260 }));

  const card = useAnimatedStyle(() => ({
    borderColor: interpolateColor(p.value, [0, 1], [palette.line, palette.rose[400]]),
    backgroundColor: interpolateColor(p.value, [0, 1], [palette.white, palette.blush[100]]),
  }));
  const ring = useAnimatedStyle(() => ({
    borderColor: interpolateColor(p.value, [0, 1], [palette.blush[300], palette.rose[500]]),
  }));
  const fill = useAnimatedStyle(() => ({ transform: [{ scale: dot.value }] }));

  return (
    <PressableScale scaleTo={0.98} onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected }}>
      <Animated.View className="flex-row items-center gap-3 rounded-3xl border-[1.5px] p-3.5" style={card}>
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-blush-200">
          <Icon size={20} color={palette.rose[600]} />
        </View>
        <View className="flex-1">
          <Text className="font-body-semibold text-[14px]">{title}</Text>
          <Text variant="caption">{subtitle}</Text>
        </View>
        {trailing && <Text className="font-body-semibold text-[13px]">{trailing}</Text>}
        <Animated.View className="h-[22px] w-[22px] items-center justify-center rounded-full border-2" style={ring}>
          <Animated.View className="h-2.5 w-2.5 rounded-full bg-rose-500" style={fill} />
        </Animated.View>
      </Animated.View>
    </PressableScale>
  );
}
