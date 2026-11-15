import type { BottomTabBarProps } from 'expo-router/tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Home, LayoutGrid, ShoppingBag, User, type LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PressableScale, Text } from '@/components/ui';
import { selectCartCount, useCartStore } from '@/features/cart/cart.store';
import { gradients, motion, palette, shadow } from '@/theme';

const TABS: Record<string, { label: string; icon: LucideIcon }> = {
  index: { label: 'Home', icon: Home },
  shop: { label: 'Shop', icon: LayoutGrid },
  favorites: { label: 'Saved', icon: Heart },
  bag: { label: 'Bag', icon: ShoppingBag },
  profile: { label: 'Me', icon: User },
};

/** Floating pill tab bar; the active tab grows into a gradient capsule. */
export function TabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const cartCount = useCartStore(selectCartCount);

  return (
    <View pointerEvents="box-none" className="absolute inset-x-0 bottom-0 items-center px-5" style={{ paddingBottom: Math.max(insets.bottom, 14) }}>
      <View className="w-full max-w-[440px] flex-row items-center justify-between rounded-full bg-white p-2" style={shadow.card}>
        {state.routes.map((route, index) => {
          const tab = TABS[route.name];
          if (!tab) return null;
          const focused = state.index === index;
          const Icon = tab.icon;
          const showBadge = route.name === 'bag' && cartCount > 0;

          return (
            <Animated.View key={route.key} layout={LinearTransition.springify().damping(motion.spring.damping)}>
              <PressableScale
                scaleTo={0.9}
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: focused }}
                onPress={() => {
                  if (!focused) navigateToTab(route.key);
                }}
                className="overflow-hidden rounded-full"
              >
                {focused ? (
                  <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="h-12 flex-row items-center gap-2 rounded-full px-4">
                    <Icon size={19} color={palette.white} strokeWidth={2.2} />
                    <Animated.View entering={FadeIn.duration(250)}>
                      <Text className="font-body-semibold text-[13px] text-white">{tab.label}</Text>
                    </Animated.View>
                  </LinearGradient>
                ) : (
                  <View className="h-12 w-12 items-center justify-center">
                    <Icon size={20} color={palette.muted} strokeWidth={2} />
                    {showBadge && (
                      <View className="absolute right-2 top-2 h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1">
                        <Text className="font-body-semibold text-[9px] text-white">{cartCount}</Text>
                      </View>
                    )}
                  </View>
                )}
              </PressableScale>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}
