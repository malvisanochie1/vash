import { router } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInDown, LinearTransition, SlideOutLeft } from 'react-native-reanimated';
import { PressableScale, Price, QuantityStepper, Text } from '@/components/ui';
import { ProductVisual } from '@/features/catalog/art/ProductVisual';
import { palette, shadow } from '@/theme';
import { useCartStore } from '../cart.store';
import type { CartLine } from '../use-cart-lines';

export function BagItem({ line, index }: { line: CartLine; index: number }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).springify()}
      exiting={SlideOutLeft.duration(260)}
      layout={LinearTransition.springify()}
    >
      <View className="flex-row gap-3 rounded-[28px] bg-white p-2.5" style={shadow.card}>
        <PressableScale haptic={false} onPress={() => router.push(`/product/${line.productId}`)}>
          <View className="overflow-hidden rounded-3xl bg-blush-100">
            <ProductVisual product={line.product} size={96} />
          </View>
        </PressableScale>
        <View className="flex-1 justify-between py-1">
          <View className="flex-row items-start justify-between gap-2">
            <View className="flex-1">
              <Text numberOfLines={1} className="font-body-semibold text-[14px]">
                {line.product.name}
              </Text>
              <Text variant="caption">
                {line.variant.label} · {line.product.nickname}
              </Text>
            </View>
            <PressableScale
              scaleTo={0.8}
              accessibilityLabel={`Remove ${line.product.name}`}
              onPress={() => remove(line.productId, line.variantId)}
              className="h-8 w-8 items-center justify-center rounded-full bg-blush-100"
            >
              <Trash2 size={14} color={palette.rose[600]} />
            </PressableScale>
          </View>
          <View className="flex-row items-center justify-between">
            <Price price={line.lineTotal} compareAt={line.variant.compareAtPrice ? line.variant.compareAtPrice * line.quantity : undefined} />
            <QuantityStepper compact value={line.quantity} onChange={(q) => setQuantity(line.productId, line.variantId, q)} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
