import { Image } from 'expo-image';
import { View } from 'react-native';
import type { Product } from '@/types/domain';
import { ProductArt } from './ProductArt';

interface Props {
  product: Pick<Product, 'images' | 'art'>;
  size: number;
  /** Fills a square slot: photos cover, illustrations centre. */
  rounded?: number;
}

/** Shows the product photo when one exists, otherwise its illustrated packshot. */
export function ProductVisual({ product, size, rounded = 0 }: Props) {
  const photo = product.images[0];
  if (photo) {
    return <Image source={{ uri: photo }} style={{ width: size, height: size, borderRadius: rounded }} contentFit="cover" transition={250} />;
  }
  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <ProductArt art={product.art} size={size * 0.94} />
    </View>
  );
}
