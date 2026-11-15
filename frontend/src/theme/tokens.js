/**
 * Design tokens — single source of truth shared by Tailwind (build time)
 * and TypeScript code (runtime: gradients, SVG, animations).
 * Palette: hot rose pink, soft blush pink and white.
 */
const palette = {
  white: '#FFFFFF',
  blush: {
    50: '#FFF8FB',
    100: '#FDEFF5',
    200: '#FADDE9',
    300: '#F6C6D9',
    400: '#F1A8C5',
  },
  rose: {
    300: '#F48DBD',
    400: '#EC4F98',
    500: '#E0217A',
    600: '#C4146A',
    700: '#9D0F55',
  },
  plum: {
    600: '#6B2348',
    700: '#4E1734',
    800: '#3A1027',
    900: '#280A1B',
  },
  ink: '#2A1420',
  muted: '#8F7482',
  line: '#F2DDE7',
  success: '#2F9E6B',
  gold: '#F2A93B',
};

const fontFamily = {
  display: ['PlayfairDisplay_600SemiBold'],
  'display-bold': ['PlayfairDisplay_700Bold'],
  'display-italic': ['PlayfairDisplay_500Medium_Italic'],
  body: ['Poppins_400Regular'],
  'body-medium': ['Poppins_500Medium'],
  'body-semibold': ['Poppins_600SemiBold'],
};

module.exports = { palette, fontFamily };
