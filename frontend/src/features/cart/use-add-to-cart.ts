import { router } from 'expo-router';
import { toast } from '@/components/ui';
import { createElement } from 'react';
import { ProductVisual } from '@/features/catalog/art/ProductVisual';
import type { Product, ProductVariant } from '@/types/domain';
import { useCartStore } from './cart.store';

export const useAddToCart = () => {
  const add = useCartStore((s) => s.add);
  return (product: Product, variant: ProductVariant = product.variants[0]!, quantity = 1) => {
    add({ productId: product.id, variantId: variant.id, quantity });
    toast.show({
      title: 'Added to bag',
      message: `${product.name} · ${variant.label}`,
      visual: createElement(ProductVisual, { product, size: 44 }),
      action: { label: 'View', onPress: () => router.push('/(tabs)/bag') },
    });
  };
};
