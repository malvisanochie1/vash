import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useResponsive } from '@/hooks/use-responsive';
import { cn } from '@/lib/cn';

interface Props extends ViewProps {
  children: ReactNode;
  /** Narrow layouts (auth, checkout) read better at form width on big screens. */
  narrow?: boolean;
  className?: string;
}

/** Centres content and caps its width so tablets and desktops stay elegant. */
export function Container({ children, narrow, className, style, ...rest }: Props) {
  const { contentWidth, gutter } = useResponsive();
  return (
    <View
      className={cn('w-full self-center', className)}
      style={[{ maxWidth: narrow ? Math.min(contentWidth, 560) : contentWidth, paddingHorizontal: gutter }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}
