import { View } from 'react-native';
import { Skeleton } from '@/components/ui';
import { useResponsive } from '@/hooks/use-responsive';
import type { Product } from '@/types/domain';
import { ProductCard } from './ProductCard';

/** Horizontal gap between cards, as a share of the row width. */
const GAP_PERCENT = 3.5;

/**
 * Fluid grid: card widths are percentages of the row, so it fills any screen.
 * Columns step up with the viewport — 2 on phones, 3 on tablets, 4 on desktop.
 */
export function ProductGrid({ products, loading }: { products: Product[]; loading?: boolean }) {
  const { gridColumns } = useResponsive();
  const width = `${(100 - GAP_PERCENT * (gridColumns - 1)) / gridColumns}%` as const;

  return (
    <View className="flex-row flex-wrap justify-between" style={{ rowGap: 16 }}>
      {loading
        ? Array.from({ length: gridColumns * 2 }, (_, i) => (
            <Skeleton key={i} className="rounded-[28px]" style={{ width, aspectRatio: 0.62 }} />
          ))
        : products.map((product, index) => <ProductCard key={product.id} product={product} width={width} index={index} />)}
      {/* Spacers keep the last row aligned left when it isn't full. */}
      {!loading &&
        Array.from({ length: (gridColumns - (products.length % gridColumns)) % gridColumns }, (_, i) => (
          <View key={`spacer-${i}`} style={{ width }} />
        ))}
    </View>
  );
}
