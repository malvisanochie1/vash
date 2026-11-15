import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import { Text } from './Text';

interface Props {
  label: string;
  value: string;
  emphasis?: boolean;
  tone?: 'default' | 'positive';
}

export function SummaryRow({ label, value, emphasis, tone = 'default' }: Props) {
  return (
    <View className={cn('flex-row items-center justify-between', emphasis && 'mt-1 border-t border-line pt-3')}>
      <Text className={cn(emphasis ? 'font-body-semibold text-base' : 'text-muted')}>{label}</Text>
      <Animated.View key={value} entering={FadeIn.duration(250)}>
        <Text
          className={cn(
            emphasis ? 'font-body-semibold text-lg text-ink' : 'font-body-medium',
            tone === 'positive' && 'text-success',
          )}
        >
          {value}
        </Text>
      </Animated.View>
    </View>
  );
}
