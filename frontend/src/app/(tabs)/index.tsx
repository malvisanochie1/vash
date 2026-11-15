import { router } from 'expo-router';
import { Heart, Search } from 'lucide-react-native';
import { View } from 'react-native';
import { Appear } from '@/components/motion/Appear';
import { Screen } from '@/components/layout/Screen';
import { TabScroll } from '@/components/layout/TabScroll';
import { Reveal } from '@/components/motion/Reveal';
import { IconButton, PressableScale, Text } from '@/components/ui';
import { useAuthStore } from '@/features/auth/auth.store';
import { useFavoritesStore } from '@/features/favorites/favorites.store';
import { CategoryRail } from '@/features/catalog/components/CategoryRail';
import { ProductGrid } from '@/features/catalog/components/ProductGrid';
import { PromoBanner } from '@/features/catalog/components/PromoBanner';
import { SectionHeader } from '@/features/catalog/components/SectionHeader';
import { useProducts } from '@/features/catalog/use-catalog';
import { firstName } from '@/lib/format';
import { palette, shadow } from '@/theme';

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const wishlistCount = useFavoritesStore((st) => st.ids.length);
  const { data: products = [], isLoading } = useProducts();
  // Home stays light: a curated handful; the full catalogue lives in Shop.
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const fresh = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <Screen>
      <TabScroll>
        <Appear preset="down" className="flex-row items-center gap-3 pt-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-blush-200">
            <Text className="font-display-bold text-lg text-rose-600">{firstName(user?.name).charAt(0)}</Text>
          </View>
          <View className="flex-1">
            <Text variant="caption">Hi {firstName(user?.name)} 💕</Text>
            <Text variant="heading" numberOfLines={1}>
              Ready to glow?
            </Text>
          </View>
          {/* The floating bag sits to the right of this row; the wishlist lives beside it. */}
          <View style={{ marginRight: 60 }}>
            <IconButton icon={Heart} badge={wishlistCount} accessibilityLabel="Open wishlist" onPress={() => router.push('/(tabs)/favorites')} />
          </View>
        </Appear>

        <Reveal index={1} className="mt-5">
          <PressableScale
            scaleTo={0.98}
            onPress={() => router.push({ pathname: '/(tabs)/shop', params: { focus: '1' } })}
            className="h-13 flex-row items-center gap-3 rounded-full bg-white px-5 py-3.5"
            style={shadow.card}
          >
            <Search size={18} color={palette.muted} />
            <Text className="text-muted">Search shampoo, conditioner, kits…</Text>
          </PressableScale>
        </Reveal>

        <Reveal index={2} className="mt-5">
          <PromoBanner />
        </Reveal>

        <Reveal index={3} className="mt-7">
          <SectionHeader title="Shop by step" />
          <CategoryRail />
        </Reveal>

        <Reveal index={4} className="mt-7">
          <SectionHeader title="Black Friday picks" action="See all" onAction={() => router.push('/(tabs)/shop')} />
          <ProductGrid products={featured} loading={isLoading} />
        </Reveal>

        {fresh.length > 0 && (
          <Reveal index={5} className="mt-7">
            <SectionHeader title="New arrivals" />
            <ProductGrid products={fresh} />
          </Reveal>
        )}
      </TabScroll>
    </Screen>
  );
}
