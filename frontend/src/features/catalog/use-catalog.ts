import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Product } from '@/types/domain';
import { api, type ProductQuery } from '@/services';

export const catalogKeys = {
  products: (query?: ProductQuery) => ['products', query ?? {}] as const,
  product: (id: string) => ['product', id] as const,
  categories: ['categories'] as const,
};

export const useProducts = (query?: ProductQuery) =>
  useQuery({ queryKey: catalogKeys.products(query), queryFn: () => api.catalog.products(query) });

export const useProduct = (id: string) => {
  const client = useQueryClient();
  return useQuery({
    queryKey: catalogKeys.product(id),
    queryFn: () => api.catalog.product(id),
    // Open instantly with what the list already loaded; no spinner between screens.
    placeholderData: () =>
      client
        .getQueriesData<Product[]>({ queryKey: ['products'] })
        .flatMap(([, list]) => list ?? [])
        .find((p) => p.id === id),
  });
};

export const useCategories = () =>
  useQuery({ queryKey: catalogKeys.categories, queryFn: () => api.catalog.categories(), staleTime: Infinity });
