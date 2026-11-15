import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Appear } from '@/components/motion/Appear';
import { IconButton, Text } from '@/components/ui';

interface Props {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

export function Header({ title, subtitle, right, onBack, showBack = true }: Props) {
  return (
    <Appear preset="fade" duration={300} className="flex-row items-center gap-3 py-3">
      {showBack && (
        <IconButton
          icon={ChevronLeft}
          accessibilityLabel="Go back"
          onPress={onBack ?? (() => (router.canGoBack() ? router.back() : router.replace('/(tabs)')))}
        />
      )}
      <View className="flex-1">
        <Text variant="title">{title}</Text>
        {subtitle && <Text variant="caption">{subtitle}</Text>}
      </View>
      {right}
    </Appear>
  );
}
