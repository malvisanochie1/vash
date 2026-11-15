import { Heart } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { palette } from '@/theme';
import { useFavoritesStore, useIsFavorite } from '../favorites.store';

const LOVES = ['💕', '💗', '💖', '♥', '💞', '💗'];

/** One little heart floating up and away. */
function Love({ index }: { index: number }) {
  const t = useSharedValue(0);
  const angle = -Math.PI / 2 + (index - (LOVES.length - 1) / 2) * 0.42;
  const distance = 34 + (index % 3) * 10;

  // Each burst remounts these (new key), so this runs once per burst.
  useEffect(() => {
    t.value = withDelay(index * 35, withTiming(1, { duration: 820, easing: Easing.out(Easing.cubic) }));
  }, [index, t]);

  const style = useAnimatedStyle(() => ({
    opacity: t.value < 0.7 ? 1 : (1 - t.value) / 0.3,
    transform: [
      { translateX: Math.cos(angle) * distance * t.value },
      { translateY: Math.sin(angle) * distance * t.value - 8 * t.value },
      { scale: 0.4 + t.value * 0.8 },
      { rotate: `${(index % 2 ? 1 : -1) * 18 * t.value}deg` },
    ],
  }));

  return (
    <Animated.View pointerEvents="none" style={[{ position: 'absolute' }, style]}>
      <Text style={{ fontSize: 13, color: palette.rose[500] }}>{LOVES[index]}</Text>
    </Animated.View>
  );
}

/** Heart that pops and releases a little cloud of love when you save a product. */
export function HeartButton({ productId, size = 34 }: { productId: string; size?: number }) {
  const active = useIsFavorite(productId);
  const toggle = useFavoritesStore((s) => s.toggle);
  const [burst, setBurst] = useState(0);
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const press = () => {
    scale.value = withSequence(withTiming(0.7, { duration: 90 }), withSpring(1, { damping: 5, stiffness: 320 }));
    if (!active) setBurst((b) => b + 1);
    toggle(productId);
  };

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {burst > 0 && LOVES.map((_, i) => <Love key={`${burst}-${i}`} index={i} />)}
      <Pressable
        onPress={press}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel={active ? 'Remove from favourites' : 'Save to favourites'}
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
    </View>
  );
}
