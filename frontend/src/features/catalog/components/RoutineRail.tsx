import { ScrollView } from 'react-native';
import type { Product } from '@/types/domain';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

/** "Complete the routine" cross-sell rail. */
export function RoutineRail({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <>
      <SectionHeader title="Complete the routine" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3.5 pb-4 pr-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} width={168} index={i} />
        ))}
      </ScrollView>
    </>
  );
}
