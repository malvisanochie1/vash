import { Link, router } from 'expo-router';
import { Fingerprint, Lock, Mail } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Reveal } from '@/components/motion/Reveal';
import { Button, Input, PressableScale, Text, toast, type InputRef } from '@/components/ui';
import { env } from '@/config/env';
import { demoAccount } from '@/data/catalog';
import { useAuthStore } from '@/features/auth/auth.store';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { FingerprintSetupSheet } from '@/features/auth/components/FingerprintSetupSheet';
import { SocialButtons } from '@/features/auth/components/SocialButtons';
import { readFingerprintLogin } from '@/features/auth/fingerprint-login';
import { useLogin } from '@/features/auth/use-auth';
import { useBiometricAvailability } from '@/features/auth/use-biometrics';
import { validateLogin, type FieldErrors } from '@/features/auth/validation';
import { palette } from '@/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors<'email' | 'password'>>({});
  const [hint, setHint] = useState<string>();
  const [offer, setOffer] = useState<{ email: string; password: string } | null>(null);
  const passwordRef = useRef<InputRef>(null);

  const fingerprintReady = useBiometricAvailability();
  const fingerprintEmail = useAuthStore((s) => s.fingerprintEmail);

  // After a password sign-in, offer fingerprint sign-in once for this account.
  const login = useLogin((credentials) => {
    if (fingerprintReady && fingerprintEmail !== credentials.email) setOffer(credentials);
    else router.replace('/(tabs)');
  });

  const submit = () => {
    const found = validateLogin(email, password);
    setErrors(found);
    if (Object.keys(found).length) return;
    login.mutate({ email: email.trim().toLowerCase(), password });
  };

  const signInWithFingerprint = async () => {
    setHint(undefined);
    if (!fingerprintEmail) {
      setHint('Sign in with your password once, then turn on fingerprint sign-in.');
      return;
    }
    const credentials = await readFingerprintLogin();
    if (!credentials) return;
    setEmail(credentials.email);
    login.mutate(credentials);
  };

  return (
    <AuthLayout title="Welcome back, gorgeous" emoji="💕" subtitle="Sign in to continue your hair care journey.">
      <View className="gap-4">
        <Reveal index={1}>
          <Input
            icon={Mail}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errors.email}
          />
        </Reveal>
        <Reveal index={2}>
          <Input
            ref={passwordRef}
            icon={Lock}
            placeholder="Password"
            secure
            autoComplete="password"
            returnKeyType="go"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={submit}
            error={errors.password ?? (login.error ? login.error.message : undefined)}
            accessory={
              fingerprintReady ? (
                <PressableScale onPress={signInWithFingerprint} accessibilityLabel="Sign in with fingerprint" hitSlop={10}>
                  <Fingerprint size={20} color={fingerprintEmail ? palette.rose[500] : palette.muted} />
                </PressableScale>
              ) : undefined
            }
          />
          {hint && <Text className="ml-2 mt-1.5 text-xs text-muted">{hint}</Text>}
        </Reveal>
        <Reveal index={3} className="items-end">
          <Pressable onPress={() => toast.show({ title: 'Password reset link sent', message: 'Check your inbox', tone: 'info' })}>
            <Text className="font-body-medium text-xs text-rose-600">Forgot password?</Text>
          </Pressable>
        </Reveal>
        <Reveal index={4}>
          <Button title="Sign In" onPress={submit} loading={login.isPending} />
        </Reveal>
      </View>

      {!env.useRemoteApi && (
        <Reveal index={5}>
          <Pressable
            onPress={() => {
              setEmail(demoAccount.email);
              setPassword(demoAccount.password);
            }}
            className="mt-4 self-center rounded-full bg-blush-100 px-4 py-2"
          >
            <Text className="text-xs text-rose-600">Tap to use the demo account</Text>
          </Pressable>
        </Reveal>
      )}

      <Reveal index={6}>
        <SocialButtons />
      </Reveal>

      <Reveal index={7} className="mt-8 flex-row justify-center gap-1">
        <Text className="text-muted">New here?</Text>
        <Link href="/register" replace>
          <Text className="font-body-semibold text-rose-600">Create an account</Text>
        </Link>
      </Reveal>

      {offer && (
        <FingerprintSetupSheet
          visible
          email={offer.email}
          password={offer.password}
          onDone={(enabled) => {
            setOffer(null);
            if (enabled) toast.show({ title: 'Fingerprint sign-in is on', message: 'Use the fingerprint icon next time' });
            router.replace('/(tabs)');
          }}
        />
      )}
    </AuthLayout>
  );
}
