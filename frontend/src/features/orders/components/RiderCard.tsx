import { Phone, Star } from 'lucide-react-native';
import { Linking, View } from 'react-native';
import { PressableScale, Text } from '@/components/ui';
import { palette } from '@/theme';
import type { Order } from '@/types/domain';

export function RiderCard({ rider }: { rider: NonNullable<Order['rider']> }) {
  const initials = rider.name
    .split(' ')
    .map((n) => n[0])
    .join('');
  return (
    <View className="flex-row items-center gap-3 rounded-[28px] bg-plum-900 p-3.5">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-rose-300">
        <Text className="font-body-semibold text-plum-900">{initials}</Text>
      </View>
      <View className="flex-1">
        <Text className="font-body-semibold text-white">{rider.name} · Your rider</Text>
        <View className="flex-row items-center gap-1">
          <Star size={11} color={palette.gold} fill={palette.gold} />
          <Text className="text-xs text-white/70">{rider.rating} · Lagos Express</Text>
        </View>
      </View>
      <PressableScale
        accessibilityLabel="Call rider"
        onPress={() => Linking.openURL(`tel:${rider.phone}`)}
        className="h-11 w-11 items-center justify-center rounded-full bg-rose-500"
      >
        <Phone size={18} color={palette.white} />
      </PressableScale>
    </View>
  );
}
