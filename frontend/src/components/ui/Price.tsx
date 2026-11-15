import { View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import { formatNaira, percentOff } from '@/lib/format';
import { Text } from './Text';

interface Props {
  price: number;
  compareAt?: number;
  size?: 'sm' | 'lg';
  className?: string;
}

/** Price with strike-through and a discount pill; the figure rolls when it changes. */
export function Price({ price, compareAt, size = 'sm', className }: Props) {
  const off = percentOff(price, compareAt);
  return (
    <View className={cn('flex-row items-center gap-2', className)}>
      <Animated.View key={price} entering={FadeInUp.duration(260)} exiting={FadeOutDown.duration(160)}>
        <Text className={cn('font-body-semibold text-rose-600', size === 'lg' ? 'text-[26px]' : 'text-[15px]')}>
          {formatNaira(price)}
        </Text>
      </Animated.View>
      {off > 0 && (
        <>
          <Text className={cn('text-muted line-through', size === 'lg' ? 'text-sm' : 'text-[11px]')}>
            {formatNaira(compareAt!)}
          </Text>
          {size === 'lg' && (
            <View className="rounded-full bg-rose-500 px-2 py-0.5">
              <Text className="font-body-semibold text-[11px] text-white">-{off}%</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}
