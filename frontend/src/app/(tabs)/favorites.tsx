import { router } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { TabScroll } from '@/components/layout/TabScroll';
import { EmptyState } from '@/components/layout/EmptyState';
import { Reveal } from '@/components/motion/Reveal';
import { Button, Text } from '@/components/ui';
import { ProductGrid } from '@/features/catalog/components/ProductGrid';
import { useProducts } from '@/features/catalog/use-catalog';
import { useFavoritesStore } from '@/features/favorites/favorites.store';

export default function Favorites() {
  const ids = useFavoritesStore((s) => s.ids);
  const { data: products = [] } = useProducts();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <Screen>
      <TabScroll>
        <Reveal className="mb-5 pt-3">
          <Text variant="title">Saved</Text>
          <Text variant="caption">{saved.length} favourite{saved.length === 1 ? '' : 's'}</Text>
        </Reveal>
        {saved.length ? (
          <ProductGrid products={saved} />
        ) : (
          <EmptyState
            title="No favourites yet"
            body="Tap the heart on any product to keep it here."
            action={<Button title="Explore products" onPress={() => router.push('/(tabs)/shop')} />}
          />
        )}
      </TabScroll>
    </Screen>
  );
}
