import { Image } from 'expo-image';
import { View } from 'react-native';
import type { Product } from '@/types/domain';
import { ProductArt } from './ProductArt';

interface Props {
  product: Pick<Product, 'images' | 'art'>;
  /** Pixel size; omit to fill the parent's width as a square. */
  size?: number;
  rounded?: number;
}

/** Shows the product photo when one exists, otherwise its illustrated packshot. */
export function ProductVisual({ product, size, rounded = 0 }: Props) {
  const box = size ? { width: size, height: size } : { width: '100%' as const, aspectRatio: 1 };
  const photo = product.images[0];
  if (photo) {
    return <Image source={{ uri: photo }} style={[box, { borderRadius: rounded }]} contentFit="cover" transition={250} />;
  }
  return (
    <View style={[box, { padding: '3%' }]}>
      <ProductArt art={product.art} />
    </View>
  );
}
