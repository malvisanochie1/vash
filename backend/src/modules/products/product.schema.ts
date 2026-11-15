import { z } from 'zod';
import { PRODUCT_CATEGORIES } from './product.types.js';

export const ListProductsQuery = z.object({
  category: z.enum(PRODUCT_CATEGORIES).optional(),
  q: z.string().trim().max(80).optional(),
  featured: z.coerce.boolean().optional(),
});
export type ListProductsQuery = z.infer<typeof ListProductsQuery>;
