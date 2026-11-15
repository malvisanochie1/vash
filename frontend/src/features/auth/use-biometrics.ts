import { useEffect, useState } from 'react';
import { fingerprintSupported } from './fingerprint-login';

/** Whether this phone has a fingerprint (or face) registered and ready to use. */
export function useBiometricAvailability() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    void fingerprintSupported().then(setAvailable);
  }, []);
  return available;
}
