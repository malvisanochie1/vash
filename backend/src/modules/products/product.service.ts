import { NotFound } from '../../core/errors.js';
import type { ProductRepository } from './product.repository.js';
import type { ListProductsQuery } from './product.schema.js';
import type { Product, ProductVariant } from './product.types.js';

export const createProductService = (repo: ProductRepository) => ({
  async list(query: ListProductsQuery): Promise<Product[]> {
    const term = query.q?.toLowerCase();
    return (await repo.list()).filter(
      (p) =>
        (!query.category || p.category === query.category) &&
        (!query.featured || p.featured) &&
        (!term || `${p.name} ${p.nickname} ${p.tagline}`.toLowerCase().includes(term)),
    );
  },

  async get(id: string): Promise<Product> {
    const product = await repo.findById(id);
    if (!product) throw NotFound('Product');
    return product;
  },

  categories: () => repo.categories(),

  async resolveVariant(productId: string, variantId: string): Promise<{ product: Product; variant: ProductVariant }> {
    const product = await this.get(productId);
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) throw NotFound('Product variant');
    return { product, variant };
  },
});

export type ProductService = ReturnType<typeof createProductService>;
