import { Text as RNText, type TextProps } from 'react-native';
import { cn } from '@/lib/cn';

const variants = {
  hero: 'font-display text-[34px] leading-[42px] text-ink',
  title: 'font-display text-[26px] leading-[34px] text-ink',
  heading: 'font-display text-xl text-ink',
  subheading: 'font-body-semibold text-base text-ink',
  body: 'font-body text-[14px] leading-[22px] text-ink',
  caption: 'font-body text-xs text-muted',
  label: 'font-body-medium text-[13px] text-ink',
  overline: 'font-body-semibold text-[10px] uppercase tracking-[2px] text-rose-500',
} as const;

export type TextVariant = keyof typeof variants;

interface Props extends TextProps {
  variant?: TextVariant;
  className?: string;
}

export function Text({ variant = 'body', className, ...rest }: Props) {
  return <RNText className={cn(variants[variant], className)} {...rest} />;
}
