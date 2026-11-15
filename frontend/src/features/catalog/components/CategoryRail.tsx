import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Appear } from '@/components/motion/Appear';
import { PressableScale, Text } from '@/components/ui';
import { ProductVisual } from '../art/ProductVisual';
import { shadow } from '@/theme';
import { useCategories, useProducts } from '../use-catalog';

/** "Shop by step" circles. */
export function CategoryRail() {
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pr-4">
      {categories.map((category, index) => (
        <Appear key={category.id} preset="left" delay={index * 60}>
          <PressableScale
            className="items-center gap-2"
            onPress={() => router.push({ pathname: '/(tabs)/shop', params: { category: category.id } })}
          >
            <View className="h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-blush-100" style={shadow.card}>
              {(() => {
                const product = products.find((p) => p.id === category.productId);
                return product ? <ProductVisual product={product} size={58} /> : null;
              })()}
            </View>
            <Text className="font-body-medium text-xs">{category.name}</Text>
          </PressableScale>
        </Appear>
      ))}
    </ScrollView>
  );
}
