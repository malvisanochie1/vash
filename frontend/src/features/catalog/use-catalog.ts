import { useQuery } from '@tanstack/react-query';
import { api, type ProductQuery } from '@/services';

export const catalogKeys = {
  products: (query?: ProductQuery) => ['products', query ?? {}] as const,
  product: (id: string) => ['product', id] as const,
  categories: ['categories'] as const,
};

export const useProducts = (query?: ProductQuery) =>
  useQuery({ queryKey: catalogKeys.products(query), queryFn: () => api.catalog.products(query) });

export const useProduct = (id: string) =>
  useQuery({ queryKey: catalogKeys.product(id), queryFn: () => api.catalog.product(id) });

export const useCategories = () =>
  useQuery({ queryKey: catalogKeys.categories, queryFn: () => api.catalog.categories(), staleTime: Infinity });
