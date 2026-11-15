import { useFocusEffect } from 'expo-router';
import { useCallback, type ReactNode } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { trackScrollForBag, useBagFx } from '@/features/cart/fly/bag-fx.store';
import { Container } from './Container';

interface Props extends ScrollViewProps {
  children: ReactNode;
  /** Show the floating bag once the user scrolls (shopping screens). */
  floatingBag?: boolean;
}

/** Scroll area for tab screens: centred content with room for the floating tab bar. */
export function TabScroll({ children, floatingBag = true, onScroll, ...rest }: Props) {
  useFloatingBagReset();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 130 }}
      scrollEventThrottle={32}
      onScroll={(e) => {
        if (floatingBag) trackScrollForBag(e.nativeEvent.contentOffset.y);
        onScroll?.(e);
      }}
      {...rest}
    >
      <Container>{children}</Container>
    </ScrollView>
  );
}

/** Hide the floating bag when leaving a screen; the next screen decides for itself. */
export function useFloatingBagReset() {
  useFocusEffect(
    useCallback(() => () => useBagFx.getState().setScrolled(false), []),
  );
}
