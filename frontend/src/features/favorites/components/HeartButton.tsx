import { Heart } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { PressableScale } from '@/components/ui';
import { palette } from '@/theme';
import { useFavoritesStore, useIsFavorite } from '../favorites.store';

/** Heart that pops with a little overshoot when you save a product. */
export function HeartButton({ productId, size = 34 }: { productId: string; size?: number }) {
  const active = useIsFavorite(productId);
  const toggle = useFavoritesStore((s) => s.toggle);
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <PressableScale
      scaleTo={0.85}
      accessibilityLabel={active ? 'Remove from favourites' : 'Save to favourites'}
      onPress={() => {
        scale.value = withSequence(withSpring(1.45, { damping: 6, stiffness: 300 }), withSpring(1));
        toggle(productId);
      }}
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
    </PressableScale>
  );
}
