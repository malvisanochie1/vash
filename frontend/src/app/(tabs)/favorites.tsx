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
          <Text variant="title">My Wishlist</Text>
          <Text variant="caption">
            {saved.length} saved product{saved.length === 1 ? '' : 's'}
          </Text>
        </Reveal>
        {saved.length ? (
          <ProductGrid products={saved} />
        ) : (
          <EmptyState
            title="Your wishlist is empty"
            body="Tap the heart on any product and it will wait for you here."
            action={<Button title="Explore products" onPress={() => router.push('/(tabs)/shop')} />}
          />
        )}
      </TabScroll>
    </Screen>
  );
}
