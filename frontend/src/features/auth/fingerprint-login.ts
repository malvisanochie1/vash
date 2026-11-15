import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Fingerprint sign-in. Credentials are kept in the Android Keystore and can
 * only be read after the phone confirms the user's fingerprint — nothing is
 * readable by the app (or anyone else) without it.
 */
const KEY = 'vash.fingerprint.credentials';

interface Credentials {
  email: string;
  password: string;
}

export const fingerprintSupported = async () => {
  if (Platform.OS === 'web') return false;
  const [hardware, enrolled] = await Promise.all([LocalAuthentication.hasHardwareAsync(), LocalAuthentication.isEnrolledAsync()]);
  return hardware && enrolled;
};

/** Saves the account behind the fingerprint. The phone asks for the fingerprint to confirm. */
export async function setUpFingerprintLogin(credentials: Credentials) {
  await SecureStore.setItemAsync(KEY, JSON.stringify(credentials), {
    requireAuthentication: true,
    authenticationPrompt: 'Confirm your fingerprint to turn on fingerprint sign-in',
  });
}

/** Reads the saved account; the phone asks for the fingerprint first. Null if cancelled. */
export async function readFingerprintLogin(): Promise<Credentials | null> {
  try {
    const raw = await SecureStore.getItemAsync(KEY, {
      requireAuthentication: true,
      authenticationPrompt: 'Sign in to Vash',
    });
    return raw ? (JSON.parse(raw) as Credentials) : null;
  } catch {
    return null;
  }
}

export async function removeFingerprintLogin() {
  await SecureStore.deleteItemAsync(KEY);
}
