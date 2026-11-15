import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Badge, PressableScale, Price, Rating, Text } from '@/components/ui';
import { useAddToCart } from '@/features/cart/use-add-to-cart';
import { HeartButton } from '@/features/favorites/components/HeartButton';
import { percentOff } from '@/lib/format';
import { ProductVisual } from '../art/ProductVisual';
import { palette, shadow } from '@/theme';
import type { Product } from '@/types/domain';

interface Props {
  product: Product;
  width: number;
  index?: number;
}

export function ProductCard({ product, width, index = 0 }: Props) {
  const addToCart = useAddToCart();
  const variant = product.variants[0]!;
  const off = percentOff(variant.price, variant.compareAtPrice);

  return (
    <Animated.View entering={FadeInDown.delay(80 + index * 70).springify().damping(16)} style={{ width }}>
      <PressableScale scaleTo={0.97} haptic={false} onPress={() => router.push(`/product/${product.id}`)}>
        <View className="overflow-hidden rounded-[28px] bg-white p-2" style={shadow.card}>
          <View className="items-center justify-center overflow-hidden rounded-3xl bg-blush-100" style={{ height: width - 16 }}>
            <ProductVisual product={product} size={width - 16} />
            <View className="absolute left-2 top-2">
              {off > 0 && <Badge label={`-${off}%`} tone="solid" />}
            </View>
            <View className="absolute right-2 top-2">
              <HeartButton productId={product.id} size={32} />
            </View>
            <View className="absolute bottom-2 left-2 rounded-full bg-plum-800/80 px-2 py-0.5">
              <Text className="font-body-medium text-[10px] text-white">{variant.label}</Text>
            </View>
          </View>
          <View className="px-1.5 pb-1.5 pt-2.5">
            <Text numberOfLines={1} className="font-body-semibold text-[13px] text-ink">
              {product.name}
            </Text>
            <Text numberOfLines={1} className="font-display-italic text-xs text-rose-500">
              {product.nickname}
            </Text>
            <View className="mt-1.5 flex-row items-center justify-between">
              <View>
                <Price price={variant.price} compareAt={variant.compareAtPrice} />
                <Rating value={product.rating} />
              </View>
              <PressableScale
                scaleTo={0.85}
                accessibilityLabel={`Add ${product.name} to bag`}
                onPress={() => addToCart(product)}
                className="h-9 w-9 items-center justify-center rounded-full bg-rose-500"
              >
                <Plus size={18} color={palette.white} strokeWidth={2.6} />
              </PressableScale>
            </View>
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
}
