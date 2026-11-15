import { useLocalSearchParams } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useDeferredValue, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { TabScroll } from '@/components/layout/TabScroll';
import { Reveal } from '@/components/motion/Reveal';
import { Chip, Input, Text } from '@/components/ui';
import { EmptyState } from '@/components/layout/EmptyState';
import { ProductGrid } from '@/features/catalog/components/ProductGrid';
import { useCategories, useProducts } from '@/features/catalog/use-catalog';
import type { ProductCategory } from '@/types/domain';

export default function Shop() {
  const params = useLocalSearchParams<{ category?: ProductCategory; focus?: string }>();
  const [category, setCategory] = useState<ProductCategory | undefined>(params.category);
  const [term, setTerm] = useState('');
  const q = useDeferredValue(term.trim());
  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading } = useProducts({ category, q: q || undefined });

  return (
    <Screen>
      <TabScroll keyboardShouldPersistTaps="handled">
        <Reveal className="pt-3">
          <Text variant="title">Shop Velora</Text>
          <Text variant="caption">Everything for a better wash day</Text>
        </Reveal>
        <Reveal index={1} className="mt-4">
          <Input icon={Search} placeholder="Search products" value={term} onChangeText={setTerm} autoFocus={params.focus === '1'} />
        </Reveal>
        <Reveal index={2} className="mt-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            <Chip label="All" selected={!category} onPress={() => setCategory(undefined)} />
            {categories.map((c) => (
              <Chip key={c.id} label={c.name} selected={category === c.id} onPress={() => setCategory(c.id)} />
            ))}
          </ScrollView>
        </Reveal>
        <View className="mt-5">
          {!isLoading && products.length === 0 ? (
            <EmptyState title="Nothing found" body="Try another search or category." />
          ) : (
            <ProductGrid key={`${category}-${q}`} products={products} loading={isLoading} />
          )}
        </View>
      </TabScroll>
    </Screen>
  );
}
