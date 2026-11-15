import { useQuery } from '@tanstack/react-query';
import { api } from '@/services';
import { useCartStore } from './cart.store';

/** Re-validates the applied promo whenever the subtotal changes. */
export const usePromoDiscount = (subtotal: number) => {
  const promo = useCartStore((s) => s.promo);
  const query = useQuery({
    queryKey: ['promo', promo?.code, subtotal],
    queryFn: () => api.promotions.validate(promo!.code, subtotal),
    enabled: Boolean(promo && subtotal > 0),
    retry: false,
  });
  return { promo, discount: query.data?.discount ?? 0, error: query.error?.message };
};
