import { palette } from './tokens';

export { palette };

export const gradients = {
  primary: [palette.rose[400], palette.rose[600]] as const,
  soft: [palette.blush[50], palette.blush[200]] as const,
  promo: [palette.rose[300], palette.rose[500]] as const,
  screen: [palette.white, palette.blush[100]] as const,
};

/** Shared motion presets so every screen moves with the same rhythm. */
export const motion = {
  spring: { damping: 18, stiffness: 180, mass: 0.9 },
  springSoft: { damping: 22, stiffness: 120 },
  springBouncy: { damping: 9, stiffness: 220 },
  duration: { fast: 180, base: 320, slow: 560 },
  stagger: 70,
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
