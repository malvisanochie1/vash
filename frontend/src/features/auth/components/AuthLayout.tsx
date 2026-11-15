import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Logo } from '@/components/brand/Logo';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui';
import { useResponsive } from '@/hooks/use-responsive';
import { ArtScene } from '@/features/catalog/art/ArtScene';

interface Props {
  title: string;
  emoji?: string;
  subtitle: string;
  children: ReactNode;
}

/** Shared frame for sign-in / sign-up. Splits into image + form on wide screens. */
export function AuthLayout({ title, emoji, subtitle, children }: Props) {
  const { isTablet } = useResponsive();

  const form = (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="flex-grow justify-center px-6 py-8">
      <View className="w-full max-w-[440px] self-center">
        <Animated.View entering={FadeIn.duration(600)} className="mb-10 items-end">
          <Logo size={40} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(80).springify()}>
          <Text variant="hero">
            {title}
            {emoji ? ` ${emoji}` : ''}
          </Text>
          <Text className="mt-2 text-muted">{subtitle}</Text>
        </Animated.View>
        <View className="mt-8">{children}</View>
      </View>
    </ScrollView>
  );

  return (
    <Screen edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 flex-row">
        {isTablet && (
          <Animated.View entering={FadeIn.duration(700)} className="m-5 flex-1 items-center justify-center overflow-hidden rounded-[40px] bg-blush-200">
            <ArtScene productIds={['p-leave-in', 'p-protein-mask', 'p-growth-oil']} size={420} />
          </Animated.View>
        )}
        <View className="flex-1">{form}</View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
