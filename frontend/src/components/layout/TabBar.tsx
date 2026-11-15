import { LinearGradient } from 'expo-linear-gradient';
import type { BottomTabBarProps } from 'expo-router/tabs';
import { Heart, Home, LayoutGrid, ShoppingBag, User, type LucideIcon } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui';
import { selectCartCount, useCartStore } from '@/features/cart/cart.store';
import { cn } from '@/lib/cn';
import { gradients, palette, shadow } from '@/theme';

const TABS: Record<string, { label: string; icon: LucideIcon }> = {
  index: { label: 'Home', icon: Home },
  shop: { label: 'Shop', icon: LayoutGrid },
  favorites: { label: 'Wishlist', icon: Heart },
  bag: { label: 'Bag', icon: ShoppingBag },
  profile: { label: 'Me', icon: User },
};

const PAD = 6;
/** Remembered across remounts so the pill always glides from where it was. */
let lastPillIndex = 0;
/** Calm in-out curve shared by the tab pill. */
const GLIDE = Easing.bezier(0.65, 0, 0.35, 1);

/**
 * Floating tab bar. Tabs share the width equally (flex), and a gradient pill
 * glides under the active tab — one transform, so it stays silky on any device.
 */
export function TabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const cartCount = useCartStore(selectCartCount);
  const [barWidth, setBarWidth] = useState(0);
  const routes = state.routes.filter((r) => TABS[r.name]);
  const segment = barWidth ? (barWidth - PAD * 2) / routes.length : 0;
  const activeIndex = routes.findIndex((r) => r.key === state.routes[state.index]?.key);

  const x = useSharedValue(0);
  const stretch = useSharedValue(0);
  const placed = useRef(false);
  useEffect(() => {
    if (!segment) return;
    const target = activeIndex * segment;
    if (!placed.current) {
      // First layout (or a remount): start from the last tab we showed, so the pill still glides.
      x.value = lastPillIndex * segment;
      placed.current = true;
    }
    lastPillIndex = activeIndex;
    // The pill glides calmly to the new tab, stretching a little mid-way like a soft droplet.
    const distance = Math.abs(target - x.value) / segment;
    const duration = 520 + Math.min(distance, 4) * 80;
    x.value = withTiming(target, { duration, easing: GLIDE });
    stretch.value = withSequence(
      withTiming(Math.min(distance, 2) * 0.22, { duration: duration * 0.45, easing: GLIDE }),
      withTiming(0, { duration: duration * 0.55, easing: GLIDE }),
    );
  }, [activeIndex, segment, stretch, x]);
  const pill = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }, { scaleX: 1 + stretch.value }] }));

  return (
    <View pointerEvents="box-none" className="absolute inset-x-0 bottom-0 items-center" style={{ paddingBottom: Math.max(insets.bottom, 12), paddingHorizontal: '5%' }}>
      <View
        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
        className="w-full flex-row rounded-[28px] bg-white"
        style={[{ maxWidth: 460, padding: PAD }, shadow.card]}
      >
        {segment > 0 && (
          <Animated.View pointerEvents="none" style={[{ position: 'absolute', top: PAD, bottom: PAD, left: PAD, width: segment }, pill]}>
            <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, borderRadius: 22 }} />
          </Animated.View>
        )}
        {routes.map((route) => {
          const tab = TABS[route.name]!;
          const focused = route.key === state.routes[state.index]?.key;
          const Icon = tab.icon;
          const showBadge = route.name === 'bag' && cartCount > 0;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: focused }}
              onPress={() => !focused && navigateToTab(route.key)}
              className="flex-1 items-center justify-center py-2"
            >
              <Icon size={20} color={focused ? palette.white : palette.muted} strokeWidth={2.1} />
              <Text className={cn('mt-0.5 font-body-medium text-[10px]', focused ? 'text-white' : 'text-muted')}>{tab.label}</Text>
              {showBadge && (
                <View className="absolute right-[22%] top-1 h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1">
                  <Text className="font-body-semibold text-[9px] text-white">{cartCount}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
