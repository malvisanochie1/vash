import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useAppear, type AppearOptions } from './use-appear';

interface Props extends AppearOptions {
  children: ReactNode;
  /** Layout classes for the content (applied to a plain View, so NativeWind always styles it). */
  className?: string;
  /** Outer box style — use for flex/size/position the wrapper itself needs. */
  style?: StyleProp<ViewStyle>;
  /** Style for the inner content box (e.g. a card shadow that must follow its rounded corners). */
  contentStyle?: StyleProp<ViewStyle>;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
}

/**
 * Animates its content in. The animated wrapper only ever receives `style`;
 * Tailwind classes go on an inner plain View. This split keeps styling
 * reliable on Android, iOS and web alike.
 */
export function Appear({ children, className, style, contentStyle, pointerEvents, ...options }: Props) {
  const animated = useAppear(options);
  return (
    <Animated.View style={[style, animated]} pointerEvents={pointerEvents}>
      {className || contentStyle ? (
        <View className={className} style={contentStyle}>
          {children}
        </View>
      ) : (
        children
      )}
    </Animated.View>
  );
}
