import { LinearGradient } from 'expo-linear-gradient';
import type { BottomTabBarProps } from 'expo-router/tabs';
import { Heart, Home, LayoutGrid, ShoppingBag, User, type LucideIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui';
import { selectCartCount, useCartStore } from '@/features/cart/cart.store';
import { cn } from '@/lib/cn';
import { gradients, palette, shadow } from '@/theme';

const TABS: Record<string, { label: string; icon: LucideIcon }> = {
  index: { label: 'Home', icon: Home },
  shop: { label: 'Shop', icon: LayoutGrid },
  favorites: { label: 'Saved', icon: Heart },
  bag: { label: 'Bag', icon: ShoppingBag },
  profile: { label: 'Me', icon: User },
};

const PAD = 6;

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
  useEffect(() => {
    if (segment) x.value = withSpring(activeIndex * segment, { damping: 20, stiffness: 220 });
  }, [activeIndex, segment, x]);
  const pill = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));

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
