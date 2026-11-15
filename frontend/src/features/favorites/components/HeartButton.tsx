import { Heart } from 'lucide-react-native';
import { useRef, type ComponentRef } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { palette } from '@/theme';
import { useFavoritesStore, useIsFavorite } from '../favorites.store';
import { useLovePop } from '../love/LovePopProvider';

const EASE = Easing.bezier(0.33, 0, 0.2, 1);

/** Heart that, when you love a product, pops a big heart up on screen. */
export function HeartButton({ productId, size = 34 }: { productId: string; size?: number }) {
  const active = useIsFavorite(productId);
  const toggle = useFavoritesStore((s) => s.toggle);
  const pop = useLovePop();
  const ref = useRef<ComponentRef<typeof View>>(null);
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const press = () => {
    scale.value = withSequence(withTiming(0.75, { duration: 120, easing: EASE }), withTiming(1, { duration: 380, easing: EASE }));
    if (!active) {
      const { width, height } = Dimensions.get('window');
      const centre = { x: width / 2, y: height * 0.45 };
      // Pop from the heart itself; fall back to the middle of the screen if it can't be measured.
      if (!ref.current) pop(centre);
      else ref.current.measureInWindow((x, y, w, h) => pop(w ? { x: x + w / 2, y: y + h / 2 } : centre));
    }
    toggle(productId);
  };

  return (
    <Pressable
      ref={ref}
      collapsable={false}
      onPress={press}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className="items-center justify-center rounded-full bg-white/90"
      style={{ width: size, height: size }}
    >
      <Animated.View style={style}>
        <Heart
          size={size * 0.47}
          color={active ? palette.rose[500] : palette.ink}
          fill={active ? palette.rose[500] : 'transparent'}
          strokeWidth={2}
        />
      </Animated.View>
    </Pressable>
  );
}
