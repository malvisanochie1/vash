import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { motion } from '@/theme';

interface Props extends ViewProps {
  children: ReactNode;
  /** Position in a staggered sequence. */
  index?: number;
  className?: string;
}

/** Content rises softly into place; pass `index` to stagger siblings. */
export function Reveal({ children, index = 0, ...rest }: Props) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * motion.stagger)
        .springify()
        .damping(motion.spring.damping)
        .stiffness(motion.spring.stiffness)}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}
