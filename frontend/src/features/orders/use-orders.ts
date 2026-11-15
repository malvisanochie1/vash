import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services';
import type { CreateOrderInput } from '@/types/domain';

export const orderKeys = {
  all: ['orders'] as const,
  detail: (id: string) => ['orders', id] as const,
};

export const useOrders = () => useQuery({ queryKey: orderKeys.all, queryFn: () => api.orders.list() });

/** Polls so the tracking screen reflects status changes live. */
export const useOrder = (id: string, { live = false } = {}) =>
  useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => api.orders.get(id),
    refetchInterval: live ? 15_000 : false,
  });

export const useCreateOrder = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateOrderInput) => api.orders.create(input),
    onSuccess: (order) => {
      client.setQueryData(orderKeys.detail(order.id), order);
      void client.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
};
