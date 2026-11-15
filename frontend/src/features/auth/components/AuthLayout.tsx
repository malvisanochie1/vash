import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Logo } from '@/components/brand/Logo';
import { Screen } from '@/components/layout/Screen';
import { Appear } from '@/components/motion/Appear';
import { Text } from '@/components/ui';
import { SceneImage } from '@/features/catalog/art/SceneImage';
import { useResponsive } from '@/hooks/use-responsive';

interface Props {
  title: string;
  emoji?: string;
  subtitle: string;
  children: ReactNode;
}

/** Shared frame for sign-in / sign-up. Splits into art + form on wide screens. */
export function AuthLayout({ title, emoji, subtitle, children }: Props) {
  const { isTablet, width } = useResponsive();

  return (
    <Screen edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View className="flex-1 flex-row">
          {isTablet && (
            <Appear preset="fade" duration={600} style={{ flex: 1, margin: '2%' }}>
              <View className="flex-1 items-center justify-center overflow-hidden rounded-[40px] bg-blush-200">
                <SceneImage scene="treatment" size={Math.min(width * 0.36, 460)} />
              </View>
            </Appear>
          )}
          <ScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: '6%', paddingVertical: '8%' }}
          >
            <View style={{ width: '100%', maxWidth: 440, alignSelf: 'center' }}>
              <Appear preset="fade" duration={500} className="mb-8 items-end">
                <Logo size={40} />
              </Appear>
              <Appear delay={60}>
                <Text variant="hero">
                  {title}
                  {emoji ? ` ${emoji}` : ''}
                </Text>
                <Text className="mt-2 text-muted">{subtitle}</Text>
              </Appear>
              <View className="mt-8">{children}</View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
