import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/cn';

interface Props extends ViewProps {
  children: ReactNode;
  /** Narrow layouts (auth, checkout) read better at form width on big screens. */
  narrow?: boolean;
  className?: string;
}

/**
 * Centres content with fluid side gutters (a percentage of the screen) and a
 * comfortable max width, so layouts breathe on phones and stay elegant on
 * tablets and desktops.
 */
export function Container({ children, narrow, className, style, ...rest }: Props) {
  return (
    <View
      className={cn('w-full self-center', className)}
      style={[{ maxWidth: narrow ? 560 : 1180, paddingHorizontal: '5%' }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}
