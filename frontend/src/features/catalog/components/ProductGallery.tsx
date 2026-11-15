import { Image } from 'expo-image';
import type { Product } from '@/types/domain';
import { ProductArt } from '../art/ProductArt';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { PagerDots } from '@/features/onboarding/PagerDots';

interface Props {
  product: Pick<Product, 'images' | 'art'>;
  width: number;
  height: number;
  /** Page scroll offset — drives the stretchy/parallax header. */
  scrollY?: SharedValue<number>;
}

/** Swipeable product images with stretch-on-pull and parallax-on-scroll. */
export function ProductGallery({ product, width, height, scrollY }: Props) {
  const { images } = product;
  const pages = images.length ? images : ['art'];
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  const parallax = useAnimatedStyle(() => {
    const y = scrollY?.value ?? 0;
    return {
      transform: [
        { translateY: interpolate(y, [-height, 0, height], [-height / 2, 0, height * 0.45], Extrapolation.CLAMP) },
        { scale: interpolate(y, [-height, 0], [2, 1], Extrapolation.CLAMP) },
      ],
    };
  });

  return (
    <Animated.View style={[{ width, height }, parallax]} className="bg-blush-100">
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {pages.map((ref) => (
          <View key={ref} style={{ width, height }} className="items-center justify-center">
            {ref === 'art' ? (
              <ProductArt art={product.art} size={Math.min(width, height) * 0.86} />
            ) : (
              <Image source={{ uri: ref }} style={{ width, height }} contentFit="cover" transition={250} />
            )}
          </View>
        ))}
      </Animated.ScrollView>
      {pages.length > 1 && (
        <View className="absolute inset-x-0 bottom-12">
          <PagerDots count={pages.length} width={width} scrollX={scrollX} />
        </View>
      )}
    </Animated.View>
  );
}
