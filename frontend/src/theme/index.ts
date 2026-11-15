import { Easing } from 'react-native-reanimated';
import { palette } from './tokens';

export { palette };

export const gradients = {
  primary: [palette.rose[400], palette.rose[600]] as const,
  soft: [palette.blush[50], palette.blush[200]] as const,
  promo: [palette.rose[300], palette.rose[500]] as const,
  screen: [palette.white, palette.blush[100]] as const,
};

/**
 * Shared motion language: calm and unhurried. Everything eases in and out on
 * the same few curves — no bouncy springs — so the app feels soft and smooth.
 */
export const motion = {
  /** Calm settle used for drags and gestures. */
  spring: { damping: 26, stiffness: 140, mass: 1 },
  duration: { fast: 200, base: 360, slow: 560 },
  stagger: 80,
} as const;

export const shadow = {
  card: {
    shadowColor: palette.rose[700],
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  button: {
    shadowColor: palette.rose[500],
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
} as const;

/** Gentle ease-out: quick to respond, long soft landing. */
export const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1);
/** Symmetric ease-in-out for things travelling from A to B. */
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
