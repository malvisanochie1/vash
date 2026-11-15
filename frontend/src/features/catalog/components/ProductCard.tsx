import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { memo, useEffect, useRef, type ComponentRef } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useBagFx } from '@/features/cart/fly/bag-fx.store';
import { View, type DimensionValue } from 'react-native';
import { Appear } from '@/components/motion/Appear';
import { Badge, PressableScale, Price, Rating, Text } from '@/components/ui';
import { useAddToCart } from '@/features/cart/use-add-to-cart';
import { HeartButton } from '@/features/favorites/components/HeartButton';
import { percentOff } from '@/lib/format';
import { palette, shadow } from '@/theme';
import type { Product } from '@/types/domain';
import { ProductVisual } from '../art/ProductVisual';

interface Props {
  product: Product;
  /** Card width — a percentage inside grids, or pixels inside rails. */
  width: DimensionValue;
  index?: number;
}

export const ProductCard = memo(function ProductCard({ product, width, index = 0 }: Props) {
  const addToCart = useAddToCart();
  const imageRef = useRef<ComponentRef<typeof View>>(null);
  const inFlight = useBagFx((s) => s.flyingProductId === product.id);
  const frameOpacity = useSharedValue(1);
  useEffect(() => {
    // While the photo is in the air, its frame looks empty — it really left.
    frameOpacity.value = withTiming(inFlight ? 0.2 : 1, { duration: inFlight ? 220 : 520 });
  }, [frameOpacity, inFlight]);
  const frameStyle = useAnimatedStyle(() => ({ opacity: frameOpacity.value }));
  const variant = product.variants[0]!;
  const off = percentOff(variant.price, variant.compareAtPrice);

  return (
    <Appear delay={Math.min(index, 7) * 60} style={{ width }}>
      <PressableScale scaleTo={0.97} onPress={() => router.push(`/product/${product.id}`)}>
        <View className="rounded-[28px] bg-white p-2" style={shadow.card}>
          <View ref={imageRef} collapsable={false} className="overflow-hidden rounded-3xl bg-blush-100">
            <Animated.View style={frameStyle}>
              <ProductVisual product={product} />
            </Animated.View>
            <View className="absolute left-2 top-2">{off > 0 && <Badge label={`-${off}%`} tone="solid" />}</View>
            <View className="absolute bottom-2 left-2 rounded-full bg-plum-800/80 px-2 py-0.5">
              <Text className="font-body-medium text-[10px] text-white">{variant.label}</Text>
            </View>
          </View>
          {/* Outside the clipped image so the love burst can float freely. */}
          <View className="absolute right-3.5 top-3.5">
            <HeartButton productId={product.id} size={32} />
          </View>
          <View className="px-1.5 pb-1.5 pt-2.5">
            <Text numberOfLines={1} className="font-body-semibold text-[13px] text-ink">
              {product.name}
            </Text>
            <Text numberOfLines={1} className="font-display-italic text-xs text-rose-500">
              {product.nickname}
            </Text>
            <View className="mt-1.5 flex-row items-center justify-between">
              <View className="flex-1">
                <Price price={variant.price} compareAt={variant.compareAtPrice} />
                <Rating value={product.rating} />
              </View>
              <PressableScale
                scaleTo={0.8}
                accessibilityLabel={`Add ${product.name} to bag`}
                onPress={() => addToCart(product, { imageFrame: imageRef })}
              >
                <View className="h-9 w-9 items-center justify-center rounded-full bg-rose-500">
                  <Plus size={18} color={palette.white} strokeWidth={2.6} />
                </View>
              </PressableScale>
            </View>
          </View>
        </View>
      </PressableScale>
    </Appear>
  );
});
