import { useMemo } from 'react';
import { useProducts } from '@/features/catalog/use-catalog';
import type { Product, ProductVariant } from '@/types/domain';
import { useCartStore, type CartItem } from './cart.store';

export interface CartLine extends CartItem {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
}

/** Joins persisted cart items with live catalogue data (prices, names). */
export const useCartLines = () => {
  const items = useCartStore((s) => s.items);
  const { data: products = [] } = useProducts();

  return useMemo(() => {
    const lines: CartLine[] = items.flatMap((item) => {
      const product = products.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      return product && variant ? [{ ...item, product, variant, lineTotal: variant.price * item.quantity }] : [];
    });
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const savings = lines.reduce(
      (sum, l) => sum + ((l.variant.compareAtPrice ?? l.variant.price) - l.variant.price) * l.quantity,
      0,
    );
    return { lines, subtotal, savings };
  }, [items, products]);
};
