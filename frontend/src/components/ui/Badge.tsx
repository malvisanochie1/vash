import { View } from 'react-native';
import { cn } from '@/lib/cn';
import { Text } from './Text';

const tones = {
  pink: 'bg-blush-200',
  solid: 'bg-rose-500',
  dark: 'bg-plum-800',
  white: 'bg-white/90',
} as const;

interface Props {
  label: string;
  tone?: keyof typeof tones;
  className?: string;
}

export function Badge({ label, tone = 'pink', className }: Props) {
  return (
    <View className={cn('self-start rounded-full px-2.5 py-1', tones[tone], className)}>
      <Text
        className={cn(
          'font-body-semibold text-[9.5px] uppercase tracking-[1.4px]',
          tone === 'pink' || tone === 'white' ? 'text-rose-600' : 'text-white',
        )}
      >
        {label}
      </Text>
    </View>
  );
}
