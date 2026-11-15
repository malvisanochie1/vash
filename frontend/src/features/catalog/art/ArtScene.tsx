import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { productSeed } from '@/data/catalog';
import { ProductArt } from './ProductArt';

function Floating({ children, delay, offset }: { children: React.ReactNode; delay: number; offset: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withDelay(delay, withRepeat(withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.sin) }), -1, true));
  }, [delay, t]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: -offset * t.value }] }));
  // Rasterise the static SVG once so floating only moves a cached bitmap.
  return (
    <Animated.View style={style} renderToHardwareTextureAndroid shouldRasterizeIOS>
      {children}
    </Animated.View>
  );
}

/**
 * Marketing composition: a few packshots grouped on a shelf, gently floating.
 * The centre product is drawn larger; neighbours sit behind it.
 */
export function ArtScene({ productIds, size }: { productIds: string[]; size: number }) {
  const arts = productIds.map((id) => productSeed.find((p) => p.id === id)?.art).filter(Boolean) as NonNullable<
    (typeof productSeed)[number]['art']
  >[];
  const [first, center, last] = arts.length === 1 ? [undefined, arts[0], undefined] : arts;

  return (
    <View style={{ width: size, height: size * 0.82 }} className="items-center justify-end">
      <View className="absolute bottom-[6%] h-[7%] w-[86%] rounded-full bg-white/70" />
      <View className="flex-row items-end">
        {first && (
          <View style={{ marginRight: -size * 0.16 }}>
            <Floating delay={300} offset={5}>
              <ProductArt art={first} size={size * 0.5} backdrop="none" />
            </Floating>
          </View>
        )}
        {center && (
          <View style={{ zIndex: 2 }}>
            <Floating delay={0} offset={8}>
              <ProductArt art={center} size={size * 0.62} backdrop="none" />
            </Floating>
          </View>
        )}
        {last && (
          <View style={{ marginLeft: -size * 0.16 }}>
            <Floating delay={600} offset={6}>
              <ProductArt art={last} size={size * 0.5} backdrop="none" />
            </Floating>
          </View>
        )}
      </View>
    </View>
  );
}
