import { Router } from 'express';
import { validate } from '../../core/middleware/validate.js';
import { ListProductsQuery } from './product.schema.js';
import type { ProductService } from './product.service.js';

export const productRoutes = (service: ProductService) =>
  Router()
    .get('/categories', async (_req, res) => {
      res.json({ data: await service.categories() });
    })
    .get('/products', validate(ListProductsQuery, 'query'), async (req, res) => {
      res.json({ data: await service.list(req.query as unknown as ListProductsQuery) });
    })
    .get('/products/:id', async (req, res) => {
      res.json({ data: await service.get(req.params.id) });
    });
