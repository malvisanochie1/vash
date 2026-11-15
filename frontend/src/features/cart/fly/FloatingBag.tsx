import { router, usePathname } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/ui';
import { gradients, palette, shadow } from '@/theme';
import { selectCartCount, useCartStore } from '../cart.store';
import { useBagFx } from './bag-fx.store';
import { useFlyToBag } from './FlyToBagProvider';

const LINGER_MS = 2400;
const SIZE = 58;
/** Height of the floating tab bar plus breathing room. */
const TAB_BAR_CLEARANCE = 92;

/**
 * Bag that floats above the tab bar once you scroll (or right after adding),
 * so there is always somewhere to throw products into.
 */
export function FloatingBag() {
  const { floatingTarget } = useFlyToBag();
  const insets = useSafeAreaInsets();
  const count = useCartStore(selectCartCount);
  const { scrolled, lastLandAt, pulse } = useBagFx();
  const [lingering, setLingering] = useState(false);
  const firstPulse = useRef(pulse);

  useEffect(() => {
    if (!lastLandAt) return;
    setLingering(true);
    const timer = setTimeout(() => setLingering(false), Math.max(0, lastLandAt + LINGER_MS - Date.now()));
    return () => clearTimeout(timer);
  }, [lastLandAt]);

  // Pointless on the bag itself or the profile page.
  const pathname = usePathname();
  const hiddenHere = pathname.endsWith('/bag') || pathname.endsWith('/profile');
  const visible = !hiddenHere && (scrolled || lingering);
  const show = useSharedValue(0);
  const bump = useSharedValue(1);

  useEffect(() => {
    show.value = visible ? withSpring(1, { damping: 14, stiffness: 170 }) : withTiming(0, { duration: 200 });
  }, [show, visible]);

  useEffect(() => {
    if (pulse === firstPulse.current) return;
    bump.value = withSequence(withTiming(1.28, { duration: 120 }), withSpring(1, { damping: 6, stiffness: 260 }));
  }, [bump, pulse]);

  const style = useAnimatedStyle(() => ({
    opacity: show.value,
    transform: [{ translateY: (1 - show.value) * 40 }, { scale: (0.6 + show.value * 0.4) * bump.value }],
  }));

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[{ position: 'absolute', right: '5%', bottom: Math.max(insets.bottom, 12) + TAB_BAR_CLEARANCE }, style]}
    >
      <Pressable onPress={() => router.push('/(tabs)/bag')} accessibilityLabel="Open bag">
        <View ref={floatingTarget} collapsable={false} style={[{ width: SIZE, height: SIZE, borderRadius: SIZE / 2 }, shadow.button]}>
          <LinearGradient colors={gradients.primary} style={{ flex: 1, borderRadius: SIZE / 2, alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={24} color={palette.white} />
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
