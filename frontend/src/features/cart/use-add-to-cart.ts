import { createElement, type ComponentRef, type RefObject } from 'react';
import type { View } from 'react-native';
import { ProductVisual } from '@/features/catalog/art/ProductVisual';
import type { Product, ProductVariant } from '@/types/domain';
import { useCartStore } from './cart.store';
import { useFlyToBag } from './fly/FlyToBagProvider';

type ViewRef = RefObject<ComponentRef<typeof View> | null>;

interface AddOptions {
  variant?: ProductVariant;
  quantity?: number;
  /** The product's image frame — the photo lifts out of it and flies to the bag. */
  imageFrame: ViewRef;
  /** Bag to land in; defaults to the floating bag. */
  target?: ViewRef;
}

/** Sends the product's photo into the bag; the cart updates as it lands. */
export const useAddToCart = () => {
  const add = useCartStore((s) => s.add);
  const { launch } = useFlyToBag();

  return (product: Product, { variant = product.variants[0]!, quantity = 1, imageFrame, target }: AddOptions) => {
    const commit = () => add({ productId: product.id, variantId: variant.id, quantity });
    if (!imageFrame.current) return commit();
    imageFrame.current.measureInWindow((x, y, width, height) => {
      // Fly a square around the product, centred in its frame (galleries are wider than tall).
      const side = Math.min(width, height) * (width === height ? 1 : 0.8);
      launch({
        from: { x: x + (width - side) / 2, y: y + (height - side) / 2, width: side, height: side },
        target,
        productId: product.id,
        visual: createElement(ProductVisual, { product }),
        onLand: commit,
      });
    });
  };
};
