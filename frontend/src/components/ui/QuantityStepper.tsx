import { Minus, Plus } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import { palette } from '@/theme';
import { PressableScale } from './PressableScale';
import { Text } from './Text';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
}

export function QuantityStepper({ value, onChange, min = 1, max = 20, compact }: Props) {
  const size = compact ? 28 : 38;
  const Step = ({ delta, icon: Icon, label }: { delta: number; icon: typeof Plus; label: string }) => {
    const disabled = value + delta < min || value + delta > max;
    return (
      <PressableScale
        disabled={disabled}
        onPress={() => onChange(value + delta)}
        accessibilityLabel={label}
        scaleTo={0.85}
        className={cn('items-center justify-center rounded-full bg-white', disabled && 'opacity-40')}
        style={{ width: size, height: size }}
      >
        <Icon size={compact ? 13 : 16} color={palette.ink} strokeWidth={2.4} />
      </PressableScale>
    );
  };

  return (
    <View className={cn('flex-row items-center rounded-full bg-blush-100', compact ? 'gap-1 p-1' : 'gap-2 p-1.5')}>
      <Step delta={-1} icon={Minus} label="Decrease quantity" />
      <View className="min-w-6 items-center overflow-hidden">
        <Animated.View key={value} entering={FadeInDown.duration(180)} exiting={FadeOutUp.duration(120)}>
          <Text className={cn('font-body-semibold text-ink', compact ? 'text-xs' : 'text-[15px]')}>{value}</Text>
        </Animated.View>
      </View>
      <Step delta={1} icon={Plus} label="Increase quantity" />
    </View>
  );
}
