import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { motion } from '@/theme';
import { Appear } from './Appear';

interface Props {
  children: ReactNode;
  /** Position in a staggered sequence. */
  index?: number;
  className?: string;
  /** Applied to the content box, together with `className` (shadows follow its rounded corners). */
  style?: StyleProp<ViewStyle>;
}

const MAX_STAGGER_STEPS = 8;

/** Content rises softly into place; pass `index` to stagger siblings. */
export function Reveal({ children, index = 0, className, style }: Props) {
  return (
    <Appear delay={Math.min(index, MAX_STAGGER_STEPS) * motion.stagger} className={className} contentStyle={style}>
      {children}
    </Appear>
  );
}
