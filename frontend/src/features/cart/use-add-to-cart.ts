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
  /** The Add button that was tapped — the product flies out of it into the bag. */
  origin: ViewRef;
  /** Bag to land in; defaults to the floating bag. */
  target?: ViewRef;
}

/** Sends a small picture of the product into the bag; the cart updates as it lands. */
export const useAddToCart = () => {
  const add = useCartStore((s) => s.add);
  const { launch } = useFlyToBag();

  return (product: Product, { variant = product.variants[0]!, quantity = 1, origin, target }: AddOptions) => {
    const commit = () => add({ productId: product.id, variantId: variant.id, quantity });
    if (!origin.current) return commit();
    origin.current.measureInWindow((x, y, width, height) => {
      if (!width) return commit();
      launch({
        from: { x: x + width / 2, y: y + height / 2 },
        target,
        visual: createElement(ProductVisual, { product }),
        onLand: commit,
      });
    });
  };
};
