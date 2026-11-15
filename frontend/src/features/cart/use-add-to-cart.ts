import { createElement, type ComponentRef, type RefObject } from 'react';
import type { View } from 'react-native';
import { ProductVisual } from '@/features/catalog/art/ProductVisual';
import type { Product, ProductVariant } from '@/types/domain';
import { useCartStore } from './cart.store';
import { useFlyToBag, type Point } from './fly/FlyToBagProvider';

type ViewRef = RefObject<ComponentRef<typeof View> | null>;

interface AddOptions {
  variant?: ProductVariant;
  quantity?: number;
  /** The tapped element — the product flies from its centre. */
  origin: ViewRef | Point;
  /** Bag to land in; defaults to the floating bag. */
  target?: ViewRef;
}

/** Throws the product into the bag; the cart updates as it lands. */
export const useAddToCart = () => {
  const add = useCartStore((s) => s.add);
  const { launch } = useFlyToBag();

  return (product: Product, { variant = product.variants[0]!, quantity = 1, origin, target }: AddOptions) => {
    const commit = () => add({ productId: product.id, variantId: variant.id, quantity });
    const fly = (from: Point) =>
      launch({ from, target, visual: createElement(ProductVisual, { product, size: 56 }), onLand: commit });

    if ('x' in origin) return fly(origin);
    if (!origin.current) return commit();
    origin.current.measureInWindow((x, y, w, h) => fly({ x: x + w / 2, y: y + h / 2 }));
  };
};
