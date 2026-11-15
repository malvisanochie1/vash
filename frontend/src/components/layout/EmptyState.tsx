import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Appear } from '@/components/motion/Appear';
import { Logo } from '@/components/brand/Logo';
import { Text } from '@/components/ui';

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <Appear preset="scale" className="items-center px-6 py-16">
      <View className="mb-5 h-28 w-28 items-center justify-center rounded-full bg-blush-200">
        <Logo size={72} withWordmark={false} />
      </View>
      <Text variant="heading" className="text-center">
        {title}
      </Text>
      <Text className="mt-2 max-w-[280px] text-center text-muted">{body}</Text>
      {action && <View className="mt-6 w-full max-w-[280px]">{action}</View>}
    </Appear>
  );
}
