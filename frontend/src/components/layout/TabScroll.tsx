import type { ReactNode } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { Container } from './Container';

/** Scroll area for tab screens: centred content with room for the floating tab bar. */
export function TabScroll({ children, ...rest }: ScrollViewProps & { children: ReactNode }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }} {...rest}>
      <Container>{children}</Container>
    </ScrollView>
  );
}
