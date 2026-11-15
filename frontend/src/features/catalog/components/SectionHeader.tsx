import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui';

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View className="mb-3 flex-row items-end justify-between">
      <Text variant="heading">{title}</Text>
      {action && (
        <Pressable onPress={onAction} hitSlop={10}>
          <Text className="font-body-medium text-xs text-rose-600">{action}</Text>
        </Pressable>
      )}
    </View>
  );
}
