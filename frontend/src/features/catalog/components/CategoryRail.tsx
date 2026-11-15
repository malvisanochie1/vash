import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { PressableScale, Text } from '@/components/ui';
import { ProductArt } from '../art/ProductArt';
import { shadow } from '@/theme';
import { useCategories, useProducts } from '../use-catalog';

/** "Shop by step" circles. */
export function CategoryRail() {
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pr-4">
      {categories.map((category, index) => (
        <Animated.View key={category.id} entering={FadeInRight.delay(index * 80).springify()}>
          <PressableScale
            className="items-center gap-2"
            onPress={() => router.push({ pathname: '/(tabs)/shop', params: { category: category.id } })}
          >
            <View className="h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-blush-100" style={shadow.card}>
              {(() => {
                const art = products.find((p) => p.id === category.productId)?.art;
                return art ? <ProductArt art={art} size={60} backdrop="none" /> : null;
              })()}
            </View>
            <Text className="font-body-medium text-xs">{category.name}</Text>
          </PressableScale>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
