import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import Animated from 'react-native-reanimated';

/**
 * Teach NativeWind which third-party components accept `className`.
 * Imported once from the root layout, before any screen renders.
 */
const withClassName = { className: 'style' } as const;

cssInterop(Animated.View, withClassName);
cssInterop(Animated.Text, withClassName);
cssInterop(Animated.ScrollView, { className: 'style', contentContainerClassName: 'contentContainerStyle' });
cssInterop(LinearGradient, withClassName);
cssInterop(Image, withClassName);

/** Register a component created with Animated.createAnimatedComponent. */
export const styled = <T,>(component: T): T => {
  cssInterop(component as never, withClassName);
  return component;
};
