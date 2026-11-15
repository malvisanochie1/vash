import { Star } from 'lucide-react-native';
import { View } from 'react-native';
import { palette } from '@/theme';
import { Text } from './Text';

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <View className="flex-row items-center gap-1">
      <Star size={12} color={palette.gold} fill={palette.gold} />
      <Text className="font-body-semibold text-xs text-ink">{value.toFixed(1)}</Text>
      {count !== undefined && <Text className="text-xs text-muted">({count} reviews)</Text>}
    </View>
  );
}
