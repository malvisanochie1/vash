import { Link } from 'expo-router';
import { Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { Reveal } from '@/components/motion/Reveal';
import { Button, Input, Text } from '@/components/ui';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { SocialButtons } from '@/features/auth/components/SocialButtons';
import { useRegister } from '@/features/auth/use-auth';
import { validateRegister, type FieldErrors } from '@/features/auth/validation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors<'name' | 'email' | 'password'>>({});
  const register = useRegister();

  const submit = () => {
    const found = validateRegister(name, email, password);
    setErrors(found);
    if (Object.keys(found).length) return;
    register.mutate({ name: name.trim(), email: email.trim(), password });
  };

  return (
    <AuthLayout title="Join the glow" emoji="✨" subtitle="Create your account to shop treatments, care & extensions.">
      <View className="gap-4">
        <Reveal index={1}>
          <Input icon={User} placeholder="Full name" value={name} onChangeText={setName} error={errors.name} />
        </Reveal>
        <Reveal index={2}>
          <Input
            icon={Mail}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
        </Reveal>
        <Reveal index={3}>
          <Input
            icon={Lock}
            placeholder="Password (8+ characters)"
            secure
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={submit}
            error={errors.password ?? register.error?.message}
          />
        </Reveal>
        <Reveal index={4} className="mt-2">
          <Button title="Create Account" onPress={submit} loading={register.isPending} />
        </Reveal>
      </View>
      <Reveal index={5}>
        <SocialButtons />
      </Reveal>
      <Reveal index={6} className="mt-8 flex-row justify-center gap-1">
        <Text className="text-muted">Already have an account?</Text>
        <Link href="/login" replace>
          <Text className="font-body-semibold text-rose-600">Sign in</Text>
        </Link>
      </Reveal>
    </AuthLayout>
  );
}
