import { Fingerprint, Lock } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Appear } from '@/components/motion/Appear';
import { Button, Input, Text } from '@/components/ui';
import { api } from '@/services';
import { palette } from '@/theme';
import { useAuthStore } from '../auth.store';
import { setUpFingerprintLogin } from '../fingerprint-login';

interface Props {
  visible: boolean;
  email: string;
  /** Known right after a password sign-in; otherwise the sheet asks for it. */
  password?: string;
  onDone: (enabled: boolean) => void;
}

/** Switches on fingerprint sign-in for this account, confirmed with the user's fingerprint. */
export function FingerprintSetupSheet({ visible, email, password: knownPassword, onDone }: Props) {
  const setFingerprintEmail = useAuthStore((s) => s.setFingerprintEmail);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  const turnOn = async () => {
    setBusy(true);
    setError(undefined);
    try {
      const secret = knownPassword ?? password;
      if (!knownPassword) await api.auth.login(email, secret); // confirm it's really them
      await setUpFingerprintLogin({ email, password: secret });
      setFingerprintEmail(email);
      onDone(true);
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : 'Fingerprint was not confirmed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={() => onDone(false)}>
      <Pressable className="flex-1 justify-end bg-plum-900/40" onPress={() => onDone(false)}>
        <Pressable onPress={() => undefined}>
          <Appear preset="up" distance={40} duration={520} className="rounded-t-[36px] bg-white px-6 pb-10 pt-7">
            <View className="items-center">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-blush-100">
                <Fingerprint size={40} color={palette.rose[500]} strokeWidth={1.6} />
              </View>
              <Text variant="title" className="mt-4 text-center">
                Sign in with your fingerprint
              </Text>
              <Text className="mt-1 text-center text-muted">
                Next time, just touch the fingerprint icon in the password box — no typing needed.
              </Text>
            </View>
            {!knownPassword && (
              <View className="mt-6">
                <Input icon={Lock} placeholder="Confirm your password" secure value={password} onChangeText={setPassword} />
              </View>
            )}
            {error && <Text className="mt-3 text-center text-xs text-rose-600">{error}</Text>}
            <View className="mt-6 gap-1">
              <Button title="Turn on fingerprint" icon={Fingerprint} loading={busy} disabled={!knownPassword && !password} onPress={turnOn} />
              <Button title="Not now" variant="ghost" size="md" onPress={() => onDone(false)} />
            </View>
          </Appear>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
