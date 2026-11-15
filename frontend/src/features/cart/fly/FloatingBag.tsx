import { LinearGradient } from 'expo-linear-gradient';
import { router, usePathname } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui';
import { gradients, palette, shadow } from '@/theme';
import { selectCartCount, useCartStore } from '../cart.store';
import { useBagFx } from './bag-fx.store';
import { useFlyToBag } from './FlyToBagProvider';

const SIZE = 52;
const EASE = Easing.bezier(0.33, 0, 0.2, 1);

/**
 * The shopping bag floats at the top right of the shopping screens, so every
 * product you add can be watched travelling into it.
 */
export function FloatingBag() {
  const { floatingTarget } = useFlyToBag();
  const insets = useSafeAreaInsets();
  const count = useCartStore(selectCartCount);
  const pulse = useBagFx((s) => s.pulse);
  const firstPulse = useRef(pulse);
  const pathname = usePathname();
  const visible = !(pathname.endsWith('/bag') || pathname.endsWith('/profile'));

  const show = useSharedValue(visible ? 1 : 0);
  const bump = useSharedValue(1);

  useEffect(() => {
    show.value = withTiming(visible ? 1 : 0, { duration: 320, easing: EASE });
  }, [show, visible]);

  useEffect(() => {
    if (pulse === firstPulse.current) return;
    // A soft "gulp" as the product lands: swell, then settle.
    bump.value = withSequence(withTiming(1.18, { duration: 180, easing: EASE }), withTiming(1, { duration: 420, easing: EASE }));
  }, [bump, pulse]);

  const style = useAnimatedStyle(() => ({
    opacity: show.value,
    transform: [{ scale: (0.85 + show.value * 0.15) * bump.value }],
  }));

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[{ position: 'absolute', right: '5%', top: insets.top + 12 }, style]}
    >
      <Pressable onPress={() => router.push('/(tabs)/bag')} accessibilityLabel="Open bag" hitSlop={6}>
        <View ref={floatingTarget} collapsable={false} style={[{ width: SIZE, height: SIZE, borderRadius: SIZE / 2 }, shadow.button]}>
          <LinearGradient colors={gradients.primary} style={{ flex: 1, borderRadius: SIZE / 2, alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={22} color={palette.white} />
          </LinearGradient>
          {count > 0 && (
            <View className="absolute -right-1 -top-1 h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-plum-800 px-1">
              <Text className="font-body-semibold text-[11px] text-white">{count}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}
