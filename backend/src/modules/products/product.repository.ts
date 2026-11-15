import { MemoryCollection } from '../../shared/memory-store.js';
import { categorySeed, productSeed } from './product.seed.js';
import type { Category, Product } from './product.types.js';

export interface ProductRepository {
  list(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  categories(): Promise<Category[]>;
}

export const createMemoryProductRepository = (): ProductRepository => {
  const products = new MemoryCollection(productSeed);
  return {
    list: async () => products.all(),
    findById: async (id) => products.get(id) ?? products.find((p) => p.slug === id),
    categories: async () => categorySeed,
  };
};
