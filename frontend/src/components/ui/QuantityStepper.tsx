import { Minus, Plus } from 'lucide-react-native';
import { View } from 'react-native';
import { Appear } from '@/components/motion/Appear';
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
        className="items-center justify-center rounded-full bg-white"
        style={{ width: size, height: size, opacity: disabled ? 0.4 : 1 }}
      >
        <Icon size={compact ? 13 : 16} color={palette.ink} strokeWidth={2.4} />
      </PressableScale>
    );
  };

  return (
    <View className={cn('flex-row items-center rounded-full bg-blush-100', compact ? 'gap-1 p-1' : 'gap-2 p-1.5')}>
      <Step delta={-1} icon={Minus} label="Decrease quantity" />
      <View className="min-w-6 items-center overflow-hidden">
        <Appear key={value} preset="up" distance={8} duration={200}>
          <Text className={cn('font-body-semibold text-ink', compact ? 'text-xs' : 'text-[15px]')}>{value}</Text>
        </Appear>
      </View>
      <Step delta={1} icon={Plus} label="Increase quantity" />
    </View>
  );
}
