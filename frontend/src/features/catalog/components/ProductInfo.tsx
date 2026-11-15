import { Check, Leaf } from 'lucide-react-native';
import { View } from 'react-native';
import { Reveal } from '@/components/motion/Reveal';
import { Badge, Chip, Price, Rating, Text } from '@/components/ui';
import { palette } from '@/theme';
import type { Product, ProductVariant } from '@/types/domain';

interface Props {
  product: Product;
  variant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

/** Everything about the product below the gallery. */
export function ProductInfo({ product, variant, onSelectVariant }: Props) {
  return (
    <View className="gap-6">
      <Reveal index={0}>
        <View className="flex-row flex-wrap gap-1.5">
          {product.badges.map((badge) => (
            <Badge key={badge} label={badge} />
          ))}
        </View>
        <Text variant="title" className="mt-3">
          {product.name}
        </Text>
        <Text className="font-display-italic text-[15px] text-rose-500">“{product.nickname}”</Text>
        <View className="mt-2 flex-row items-center gap-3">
          <Rating value={product.rating} count={product.reviewCount} />
          <View className="flex-row items-center gap-1">
            <View className="h-1.5 w-1.5 rounded-full bg-success" />
            <Text className="text-xs text-success">In stock</Text>
          </View>
        </View>
        <Price price={variant.price} compareAt={variant.compareAtPrice} size="lg" className="mt-3" />
      </Reveal>

      <Reveal index={1}>
        <View className="mb-3 flex-row items-center justify-between">
          <Text variant="subheading">{product.optionName}</Text>
          <Text variant="caption">{product.variants.length} options</Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {product.variants.map((v) => (
            <Chip key={v.id} label={v.label} selected={v.id === variant.id} onPress={() => onSelectVariant(v)} />
          ))}
        </View>
      </Reveal>

      <Reveal index={2}>
        <Text variant="subheading" className="mb-3">
          Why you'll love it
        </Text>
        <View className="gap-2.5">
          {product.benefits.map((benefit) => (
            <View key={benefit} className="flex-row items-center gap-3">
              <View className="h-6 w-6 items-center justify-center rounded-full bg-blush-200">
                <Check size={13} color={palette.rose[600]} strokeWidth={3} />
              </View>
              <Text>{benefit}</Text>
            </View>
          ))}
        </View>
        <Text className="mt-4 text-muted">{product.description}</Text>
      </Reveal>

      <Reveal index={3}>
        <Text variant="subheading" className="mb-3">
          Key ingredients
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {product.ingredients.map((ingredient) => (
            <View key={ingredient} className="flex-row items-center gap-1.5 rounded-full bg-white px-3 py-2">
              <Leaf size={13} color={palette.success} />
              <Text className="text-xs">{ingredient}</Text>
            </View>
          ))}
        </View>
      </Reveal>

      <Reveal index={4} className="rounded-3xl bg-blush-100 p-4">
        <Text variant="overline">How to use</Text>
        <Text className="mt-2">{product.howToUse}</Text>
      </Reveal>
    </View>
  );
}
