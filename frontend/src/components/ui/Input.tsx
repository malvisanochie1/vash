import type { LucideIcon } from 'lucide-react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useEffect, useState, type ComponentRef, type Ref } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Appear } from '@/components/motion/Appear';
import { palette } from '@/theme';
import { Text } from './Text';

export type InputRef = ComponentRef<typeof TextInput>;

interface Props extends TextInputProps {
  ref?: Ref<InputRef>;
  icon?: LucideIcon;
  error?: string;
  secure?: boolean;
}

/** Text field with an animated focus ring and inline error. */
export function Input({ ref, icon: Icon, error, secure, onFocus, onBlur, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const focus = useSharedValue(0);

  useEffect(() => {
    focus.value = withTiming(focused ? 1 : 0, { duration: 200 });
  }, [focus, focused]);

  const ring = useAnimatedStyle(() => ({
    borderColor: error ? palette.rose[500] : interpolateColor(focus.value, [0, 1], [palette.line, palette.rose[400]]),
    borderWidth: 1.5 + focus.value * 0.5,
  }));

  return (
    <View>
      <View className="h-14 w-full flex-row items-center rounded-2xl bg-white px-4">
        <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.ring, ring]} />
        {Icon && (
          <View className="shrink-0">
            <Icon size={18} color={focused ? palette.rose[500] : palette.muted} />
          </View>
        )}
        <TextInput
          ref={ref}
          placeholderTextColor={palette.muted}
          secureTextEntry={secure && hidden}
          className="ml-3 h-full flex-1 font-body text-[15px] text-ink"
          style={styles.input}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {secure && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={12} accessibilityLabel="Toggle password visibility" className="ml-2 shrink-0">
            {hidden ? <Eye size={18} color={palette.muted} /> : <EyeOff size={18} color={palette.muted} />}
          </Pressable>
        )}
      </View>
      {error && (
        <Appear key={error} preset="down" distance={6} duration={240}>
          <Text className="ml-2 mt-1.5 text-xs text-rose-600">{error}</Text>
        </Appear>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: { borderRadius: 16 },
  // Web-only: hide the browser focus outline; the animated ring replaces it.
  input: { outlineStyle: 'none', paddingVertical: 0, minWidth: 0 } as object,
});
