import { LinearGradient } from 'expo-linear-gradient';
import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { cn } from '@/lib/cn';
import { gradients, palette, shadow } from '@/theme';
import { PressableScale } from './PressableScale';
import { Text } from './Text';

type Variant = 'primary' | 'dark' | 'outline' | 'ghost';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: LucideIcon;
  trailingIcon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  size?: 'md' | 'lg';
  className?: string;
  children?: ReactNode;
}

const textColor: Record<Variant, string> = {
  primary: palette.white,
  dark: palette.white,
  outline: palette.ink,
  ghost: palette.rose[600],
};

/** Lets the press pop play before navigating away. */
const PRESS_DELAY_MS = 140;

export function Button({
  title,
  onPress,
  variant = 'primary',
  icon: Icon,
  trailingIcon: Trailing,
  loading,
  disabled,
  size = 'lg',
  className,
}: Props) {
  const height = size === 'lg' ? 'h-14' : 'h-11';
  const color = textColor[variant];
  const inactive = disabled || loading;

  const content = (
    <View className={cn('flex-row items-center justify-center gap-2 px-6', height)}>
      {loading ? <ActivityIndicator color={color} /> : Icon && <Icon size={18} color={color} strokeWidth={2.2} />}
      <Text className="font-body-semibold text-[15px]" style={{ color }}>
        {title}
      </Text>
      {!loading && Trailing && <Trailing size={18} color={color} strokeWidth={2.2} />}
    </View>
  );

  return (
    <PressableScale
      scaleTo={0.9}
      onPress={onPress && (() => setTimeout(onPress, PRESS_DELAY_MS))}
      disabled={inactive}
      accessibilityState={{ disabled: inactive, busy: loading }}
      className={cn('overflow-hidden rounded-full', disabled && 'opacity-50', className)}
      style={variant === 'primary' && !disabled ? shadow.button : undefined}
    >
      {variant === 'primary' ? (
        <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 999 }}>
          {content}
        </LinearGradient>
      ) : (
        <View
          className={cn(
            'rounded-full',
            variant === 'dark' && 'bg-plum-800',
            variant === 'outline' && 'border border-line bg-white',
          )}
        >
          {content}
        </View>
      )}
    </PressableScale>
  );
}
