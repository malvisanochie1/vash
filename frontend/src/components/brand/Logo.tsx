import { View } from 'react-native';
import { Text } from '@/components/ui';
import { brand } from '@/config/brand';
import { Monogram } from './Monogram';

/** Brand lockup: monogram seal + serif wordmark. */
export function Logo({ size = 44, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <View className="flex-row items-center gap-2.5">
      <Monogram size={size} />
      {withWordmark && (
        <View>
          <Text className="font-display-bold text-[20px] leading-6 tracking-[4px] text-rose-600">{brand.wordmark}</Text>
          <Text className="font-display-italic -mt-0.5 text-[13px] text-rose-500">{brand.descriptor}</Text>
        </View>
      )}
    </View>
  );
}
