import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ShoppingBag } from 'lucide-react-native';
import { useRef, useState, type ComponentRef } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from '@/components/layout/Container';
import { EmptyState } from '@/components/layout/EmptyState';
import { Screen } from '@/components/layout/Screen';
import { Button, IconButton, Text, toast } from '@/components/ui';
import { selectCartCount, useCartStore } from '@/features/cart/cart.store';
import { useFlyToBag, type Point } from '@/features/cart/components/FlyToBag';
import { AddToBagBar } from '@/features/catalog/components/AddToBagBar';
import { ProductGallery } from '@/features/catalog/components/ProductGallery';
import { ProductInfo } from '@/features/catalog/components/ProductInfo';
import { RoutineRail } from '@/features/catalog/components/RoutineRail';
import { useProduct, useProducts } from '@/features/catalog/use-catalog';
import { HeartButton } from '@/features/favorites/components/HeartButton';
import { useResponsive } from '@/hooks/use-responsive';
import { ProductVisual } from '@/features/catalog/art/ProductVisual';
import { palette } from '@/theme';
import type { ProductVariant } from '@/types/domain';

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);
  const { data: all = [] } = useProducts();
  const { width, height, isTablet, contentWidth } = useResponsive();
  const insets = useSafeAreaInsets();

  const [variantId, setVariantId] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const cartCount = useCartStore(selectCartCount);
  const add = useCartStore((s) => s.add);
  const bagRef = useRef<ComponentRef<typeof View>>(null);
  const scrollY = useSharedValue(0);
  const { overlay, launch } = useFlyToBag();

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const galleryHeight = isTablet ? Math.min(height * 0.8, 640) : Math.min(height * 0.48, 460);
  const headerFill = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [galleryHeight * 0.5, galleryHeight * 0.8], [0, 1], Extrapolation.CLAMP),
  }));

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator className="flex-1" color={palette.rose[500]} />
      </Screen>
    );
  }
  if (!product) {
    return (
      <Screen>
        <EmptyState title="Product not found" body="It may have sold out." action={<Button title="Back to shop" onPress={() => router.replace('/(tabs)/shop')} />} />
      </Screen>
    );
  }

  const variant: ProductVariant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;
  const routine = all.filter((p) => p.id !== product.id);

  const addToBag = (origin: Point) => {
    bagRef.current?.measureInWindow((x, y, w, h) => {
      launch({ from: origin, to: { x: x + w / 2, y: y + h / 2 }, visual: <ProductVisual product={product} size={58} /> });
    });
    // Commit after the flight lands so the badge bounce lines up with the drop.
    setTimeout(() => {
      add({ productId: product.id, variantId: variant.id, quantity });
      toast.show({
        title: 'Added to bag',
        message: `${product.name} · ${variant.label} × ${quantity}`,
        visual: <ProductVisual product={product} size={44} />,
        action: { label: 'View', onPress: () => router.push('/(tabs)/bag') },
      });
    }, 760);
  };

  const topBar = (
    <View className="absolute inset-x-0 top-0 z-10" style={{ paddingTop: insets.top }}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.96)', borderBottomWidth: 1, borderColor: palette.line }, headerFill]} />
      <Container className="flex-row items-center justify-between py-2">
        <IconButton icon={ChevronLeft} accessibilityLabel="Go back" onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)'))} />
        <Animated.View style={[{ flex: 1, paddingHorizontal: 12 }, headerFill]}>
          <Text numberOfLines={1} className="text-center font-body-semibold">
            {product.name}
          </Text>
        </Animated.View>
        <View className="flex-row gap-2">
          <HeartButton productId={product.id} size={44} />
          <IconButton ref={bagRef} icon={ShoppingBag} badge={cartCount} accessibilityLabel="Open bag" onPress={() => router.push('/(tabs)/bag')} />
        </View>
      </Container>
    </View>
  );

  const bottomBar = (
    <View className="absolute inset-x-0 bottom-0" style={{ paddingBottom: Math.max(insets.bottom, 14) }}>
      <Container narrow={isTablet}>
        <AddToBagBar unitPrice={variant.price} quantity={quantity} onQuantityChange={setQuantity} onAdd={addToBag} />
      </Container>
    </View>
  );

  const info = (
    <ProductInfo
      product={product}
      variant={variant}
      onSelectVariant={(v) => {
        setVariantId(v.id);
      }}
    />
  );

  if (isTablet) {
    const galleryWidth = Math.min(contentWidth * 0.5, 560);
    return (
      <Screen edges={[]}>
        {topBar}
        <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16} contentContainerStyle={{ paddingTop: insets.top + 72, paddingBottom: 140 }}>
          <Container className="flex-row gap-10">
            <View className="overflow-hidden rounded-[40px]" style={{ width: galleryWidth, height: galleryHeight }}>
              <ProductGallery product={product} width={galleryWidth} height={galleryHeight} />
            </View>
            <View className="flex-1 pt-2">{info}</View>
          </Container>
          <Container className="mt-10">
            <RoutineRail products={routine} />
          </Container>
        </Animated.ScrollView>
        {bottomBar}
        {overlay}
      </Screen>
    );
  }

  return (
    <Screen edges={[]}>
      {topBar}
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        <ProductGallery product={product} width={width} height={galleryHeight + insets.top} scrollY={scrollY} />
        <View className="-mt-8 rounded-t-[36px] bg-blush-50 pt-7">
          <Container>
            {info}
            <View className="mt-8">
              <RoutineRail products={routine} />
            </View>
          </Container>
        </View>
      </Animated.ScrollView>
      {bottomBar}
      {overlay}
    </Screen>
  );
}
