import { MemoryCollection } from '../../shared/memory-store.js';
import type { Order } from './order.types.js';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | undefined>;
  listByUser(userId: string): Promise<Order[]>;
}

export const createMemoryOrderRepository = (): OrderRepository => {
  const orders = new MemoryCollection<Order>();
  return {
    save: async (order) => orders.save(order),
    findById: async (id) => orders.get(id) ?? orders.find((o) => o.reference === id),
    listByUser: async (userId) =>
      orders.filter((o) => o.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  };
};
