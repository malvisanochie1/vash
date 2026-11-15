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
  disabled?: boolean;
}

/** Radio card: border, tint and the radio dot all animate on selection. */
export function OptionCard({ icon: Icon, title, subtitle, trailing, selected, onPress, disabled }: Props) {
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
    <PressableScale
      scaleTo={0.98}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      style={disabled ? { opacity: 0.5 } : undefined}
    >
      <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 24, borderWidth: 1.5, padding: 14 }, card]}>
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-blush-200">
          <Icon size={20} color={palette.rose[600]} />
        </View>
        <View className="flex-1">
          <Text className="font-body-semibold text-[14px]">{title}</Text>
          <Text variant="caption">{subtitle}</Text>
        </View>
        {trailing && <Text className="font-body-semibold text-[13px]">{trailing}</Text>}
        <Animated.View style={[{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }, ring]}>
          <Animated.View style={[{ width: 10, height: 10, borderRadius: 5, backgroundColor: palette.rose[500] }, fill]} />
        </Animated.View>
      </Animated.View>
    </PressableScale>
  );
}
