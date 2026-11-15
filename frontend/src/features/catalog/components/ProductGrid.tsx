import { View } from 'react-native';
import { Skeleton } from '@/components/ui';
import { useResponsive } from '@/hooks/use-responsive';
import type { Product } from '@/types/domain';
import { ProductCard } from './ProductCard';

const GAP = 14;

/** Responsive grid: 2 columns on phones, 3 on tablets, 4 on desktop. */
export function ProductGrid({ products, loading }: { products: Product[]; loading?: boolean }) {
  const { contentWidth, gutter, gridColumns } = useResponsive();
  const itemWidth = (contentWidth - gutter * 2 - GAP * (gridColumns - 1)) / gridColumns;

  if (loading) {
    return (
      <View className="flex-row flex-wrap" style={{ gap: GAP }}>
        {Array.from({ length: gridColumns * 2 }, (_, i) => (
          <Skeleton key={i} className="rounded-[28px]" style={{ width: itemWidth, height: itemWidth * 1.65 }} />
        ))}
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap" style={{ gap: GAP }}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} width={itemWidth} index={index} />
      ))}
    </View>
  );
}
