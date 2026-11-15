import { Image } from 'expo-image';
import { View } from 'react-native';
import { resolveImage } from '@/lib/product-images';
import type { Product } from '@/types/domain';
import { ProductArt } from './ProductArt';

interface Props {
  product: Pick<Product, 'images' | 'art'>;
  /** Pixel size; omit to fill the parent's width as a square. */
  size?: number;
  /** Which photo to show (0 = main packshot). */
  index?: number;
}

/**
 * The product's photo (a transparent cut-out) when one exists, otherwise its
 * illustrated packshot — so new products can ship before photography does.
 */
export function ProductVisual({ product, size, index = 0 }: Props) {
  const box = size ? { width: size, height: size } : { width: '100%' as const, aspectRatio: 1 };
  const source = resolveImage(product.images[index]);
  if (source) {
    return <Image source={source} style={box} contentFit="contain" transition={200} cachePolicy="memory-disk" />;
  }
  return (
    <View style={[box, { padding: '3%' }]}>
      <ProductArt art={product.art} />
    </View>
  );
}
