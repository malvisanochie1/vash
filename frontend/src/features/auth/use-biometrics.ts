import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

/** Whether this device can unlock with a fingerprint (or face) right now. */
export function useBiometricAvailability() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'web') return;
    void (async () => {
      const [hardware, enrolled] = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
      ]);
      setAvailable(hardware && enrolled);
    })();
  }, []);
  return available;
}

export async function authenticateWithBiometrics(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Unlock Vash',
    cancelLabel: 'Use password',
    disableDeviceFallback: true,
  });
  return result.success;
}
