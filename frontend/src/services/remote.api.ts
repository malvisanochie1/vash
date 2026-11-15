import { http } from '@/lib/http';
import type { AuthSession, Category, Order, Product, PromoResult } from '@/types/domain';
import type { Api } from './api.types';

export const remoteApi: Api = {
  auth: {
    login: (email, password) => http<AuthSession>('/auth/login', { method: 'POST', body: { email, password } }),
    register: (name, email, password) =>
      http<AuthSession>('/auth/register', { method: 'POST', body: { name, email, password } }),
  },
  catalog: {
    products: (query) => http<Product[]>('/products', { query: { ...query } }),
    product: (id) => http<Product>(`/products/${id}`),
    categories: () => http<Category[]>('/categories'),
  },
  promotions: {
    validate: (code, subtotal) =>
      http<PromoResult>('/promotions/validate', { method: 'POST', body: { code, subtotal } }),
  },
  orders: {
    create: (input) => http<Order>('/orders', { method: 'POST', body: input }),
    list: () => http<Order[]>('/orders'),
    get: (id) => http<Order>(`/orders/${id}`),
  },
};
