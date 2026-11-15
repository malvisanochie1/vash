import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Fingerprint, Lock } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Monogram } from '@/components/brand/Monogram';
import { Screen } from '@/components/layout/Screen';
import { Appear } from '@/components/motion/Appear';
import { Button, Input, PressableScale, Text } from '@/components/ui';
import { useAuthStore } from '@/features/auth/auth.store';
import { readFingerprintLogin } from '@/features/auth/fingerprint-login';
import { useBiometricAvailability } from '@/features/auth/use-biometrics';
import { useCartStore } from '@/features/cart/cart.store';
import { firstName } from '@/lib/format';
import { api } from '@/services';
import { palette } from '@/theme';

function PulseRing({ size }: { size: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 2200, easing: Easing.out(Easing.quad) }), -1);
  }, [t]);
  const style = useAnimatedStyle(() => ({ opacity: 0.35 * (1 - t.value), transform: [{ scale: 1 + t.value * 0.45 }] }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: palette.rose[300] }, style]}
    />
  );
}

/** Shown after the app has been away for a while: fingerprint first, password as fallback. */
export default function Unlock() {
  const { user, fingerprintEmail, unlock, setSession, signOut } = useAuthStore();
  const clearCart = useCartStore((s) => s.clear);
  const canUseBiometrics = useBiometricAvailability() && !!user && fingerprintEmail === user.email;
  const [password, setPassword] = useState('');

  const enter = useCallback(() => {
    unlock();
    router.replace('/(tabs)');
  }, [unlock]);

  const tryBiometrics = useCallback(async () => {
    const credentials = await readFingerprintLogin();
    if (!credentials) return;
    try {
      setSession(await api.auth.login(credentials.email, credentials.password));
      enter();
    } catch {
      // Password changed since fingerprint was set up — the password box below still works.
    }
  }, [enter, setSession]);

  useEffect(() => {
    if (canUseBiometrics) void tryBiometrics();
  }, [canUseBiometrics, tryBiometrics]);

  const withPassword = useMutation({
    mutationFn: () => api.auth.login(user?.email ?? '', password),
    onSuccess: (session) => {
      setSession(session);
      enter();
    },
  });

  return (
    <Screen edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: '7%', paddingVertical: '8%' }}
        >
          <View style={{ width: '100%', maxWidth: 420, alignSelf: 'center' }}>
            <Appear preset="scale" className="items-center">
              <Monogram size={72} />
              <Text variant="title" className="mt-5 text-center">
                Welcome back, {firstName(user?.name)} 💕
              </Text>
              <Text className="mt-1 text-center text-muted">For your security, please confirm it's you.</Text>
            </Appear>

            {canUseBiometrics && (
              <Appear delay={120} className="mt-10 items-center">
                <View className="items-center justify-center" style={{ width: 96, height: 96 }}>
                  <PulseRing size={96} />
                  <PressableScale
                    onPress={tryBiometrics}
                    accessibilityLabel="Unlock with fingerprint"
                    className="h-24 w-24 items-center justify-center rounded-full bg-white"
                  >
                    <Fingerprint size={44} color={palette.rose[500]} strokeWidth={1.6} />
                  </PressableScale>
                </View>
                <Text className="mt-3 font-body-medium text-rose-600">Touch to unlock</Text>
              </Appear>
            )}

            <Appear delay={220} className="mt-10 gap-3">
              {canUseBiometrics && <Text className="text-center text-xs text-muted">or use your password</Text>}
              <Input
                icon={Lock}
                placeholder="Password"
                secure
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={() => password && withPassword.mutate()}
                error={withPassword.error?.message}
              />
              <Button title="Unlock" disabled={!password} loading={withPassword.isPending} onPress={() => withPassword.mutate()} />
            </Appear>

            <Pressable
              onPress={() => {
                signOut();
                clearCart();
                router.replace('/login');
              }}
              className="mt-8 items-center py-2"
            >
              <Text className="text-muted">
                Not {firstName(user?.name)}? <Text className="font-body-semibold text-rose-600">Sign out</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
