import { useLocalSearchParams } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useDeferredValue, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { EmptyState } from '@/components/layout/EmptyState';
import { Screen } from '@/components/layout/Screen';
import { Reveal } from '@/components/motion/Reveal';
import { Chip, Input, Skeleton, Text } from '@/components/ui';
import { ProductCard } from '@/features/catalog/components/ProductCard';
import { useCategories, useProducts } from '@/features/catalog/use-catalog';
import { brand } from '@/config/brand';
import { useResponsive } from '@/hooks/use-responsive';
import type { ProductCategory } from '@/types/domain';

const GAP_PERCENT = 3.5;

/** Full catalogue in a virtualised grid: only what's on screen is rendered. */
export default function Shop() {
  const params = useLocalSearchParams<{ category?: ProductCategory; focus?: string }>();
  const [category, setCategory] = useState<ProductCategory | undefined>(params.category);
  const [term, setTerm] = useState('');
  const q = useDeferredValue(term.trim());
  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading } = useProducts({ category, q: q || undefined });
  const { gridColumns } = useResponsive();

  const cardWidth = `${(100 - GAP_PERCENT * (gridColumns - 1)) / gridColumns}%` as const;

  const header = (
    <View className="pb-5">
      <Reveal className="pt-3">
        <Text variant="title" style={{ marginRight: 64 }}>
          Shop {brand.name}
        </Text>
        <Text variant="caption">Relaxers, treatments, regrowth & daily care</Text>
      </Reveal>
      <Reveal index={1} className="mt-4">
        <Input icon={Search} placeholder="Search products" value={term} onChangeText={setTerm} autoFocus={params.focus === '1'} />
      </Reveal>
      <Reveal index={2} className="mt-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          <Chip label="All" selected={!category} onPress={() => setCategory(undefined)} />
          {categories.map((c) => (
            <Chip key={c.id} label={c.name} selected={category === c.id} onPress={() => setCategory(c.id)} />
          ))}
        </ScrollView>
      </Reveal>
    </View>
  );

  return (
    <Screen>
      <FlatList
        key={gridColumns}
        data={isLoading ? [] : products}
        keyExtractor={(p) => p.id}
        numColumns={gridColumns}
        renderItem={({ item, index }) => (
          // Percentage margins keep the gutter proportional on every screen width.
          <View style={{ width: cardWidth, marginRight: index % gridColumns === gridColumns - 1 ? 0 : `${GAP_PERCENT}%` }}>
            <ProductCard product={item} width="100%" index={index} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={header}
        ListEmptyComponent={
          isLoading ? (
            <View className="flex-row justify-between">
              {Array.from({ length: gridColumns }, (_, i) => (
                <Skeleton key={i} className="rounded-[28px]" style={{ width: cardWidth, aspectRatio: 0.62 }} />
              ))}
            </View>
          ) : (
            <EmptyState title="Nothing found" body="Try another search or category." />
          )
        }
        contentContainerStyle={{ paddingHorizontal: '5%', paddingBottom: 130, width: '100%', maxWidth: 1180, alignSelf: 'center' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
      />
    </Screen>
  );
}
