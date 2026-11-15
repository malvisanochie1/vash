import { Link } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Reveal } from '@/components/motion/Reveal';
import { Button, Input, Text, toast, type InputRef } from '@/components/ui';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { SocialButtons } from '@/features/auth/components/SocialButtons';
import { useLogin } from '@/features/auth/use-auth';
import { validateLogin, type FieldErrors } from '@/features/auth/validation';
import { env } from '@/config/env';
import { demoAccount } from '@/data/catalog';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors<'email' | 'password'>>({});
  const passwordRef = useRef<InputRef>(null);
  const login = useLogin();

  const submit = () => {
    const found = validateLogin(email, password);
    setErrors(found);
    if (Object.keys(found).length) return;
    login.mutate({ email: email.trim(), password });
  };

  return (
    <AuthLayout title="Welcome back, gorgeous" emoji="💕" subtitle="Sign in to continue your wash-day glow.">
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
          />
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
    </AuthLayout>
  );
}
