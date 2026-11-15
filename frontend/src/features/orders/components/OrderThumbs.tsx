import { View } from 'react-native';
import { ProductVisual } from '@/features/catalog/art/ProductVisual';
import type { OrderLine } from '@/types/domain';

/** Overlapping product thumbnails for an order. */
export function OrderThumbs({ lines, size = 44 }: { lines: OrderLine[]; size?: number }) {
  return (
    <View className="flex-row">
      {lines.slice(0, 3).map((line, i) => (
        <View
          key={line.variantId}
          className="overflow-hidden rounded-2xl border-2 border-white bg-blush-100"
          style={{ marginLeft: i ? -size * 0.4 : 0, zIndex: 3 - i }}
        >
          <ProductVisual product={{ images: line.image ? [line.image] : [], art: line.art }} size={size} />
        </View>
      ))}
    </View>
  );
}
