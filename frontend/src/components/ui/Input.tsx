import type { LucideIcon } from 'lucide-react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState, type ComponentRef, type Ref } from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';
import Animated, { FadeInDown, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
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
  const progress = useDerivedValue(() => withTiming(focused ? 1 : 0, { duration: 220 }));

  const ringStyle = useAnimatedStyle(() => ({
    borderColor: error
      ? palette.rose[600]
      : interpolateColor(progress.value, [0, 1], [palette.line, palette.rose[400]]),
    shadowOpacity: progress.value * 0.18,
  }));

  return (
    <View>
      <Animated.View
        className="h-14 flex-row items-center gap-3 rounded-2xl border-[1.5px] bg-white px-4"
        style={[{ shadowColor: palette.rose[500], shadowRadius: 12, shadowOffset: { width: 0, height: 4 } }, ringStyle]}
      >
        {Icon && <Icon size={18} color={focused ? palette.rose[500] : palette.muted} />}
        <TextInput
          ref={ref}
          placeholderTextColor={palette.muted}
          secureTextEntry={secure && hidden}
          className="h-full flex-1 font-body text-[14px] text-ink"
          style={{ outlineStyle: 'none' } as object}
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
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={12} accessibilityLabel="Toggle password visibility">
            {hidden ? <Eye size={18} color={palette.muted} /> : <EyeOff size={18} color={palette.muted} />}
          </Pressable>
        )}
      </Animated.View>
      {error && (
        <Animated.View entering={FadeInDown.duration(200)}>
          <Text className="ml-2 mt-1.5 text-xs text-rose-600">{error}</Text>
        </Animated.View>
      )}
    </View>
  );
}
