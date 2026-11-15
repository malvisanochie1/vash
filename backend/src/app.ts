import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './core/middleware/error-handler.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { createAuthService } from './modules/auth/auth.service.js';
import { createMemoryOrderRepository } from './modules/orders/order.repository.js';
import { orderRoutes } from './modules/orders/order.routes.js';
import { createOrderService } from './modules/orders/order.service.js';
import { createMemoryProductRepository } from './modules/products/product.repository.js';
import { productRoutes } from './modules/products/product.routes.js';
import { createProductService } from './modules/products/product.service.js';
import { promotionRoutes } from './modules/promotions/promotion.routes.js';
import { createMemoryUserRepository } from './modules/users/user.repository.js';

/** Composition root: wire repositories → services → routes. */
export const createApp = () => {
  const auth = createAuthService(createMemoryUserRepository());
  const products = createProductService(createMemoryProductRepository());
  const orders = createOrderService({ orders: createMemoryOrderRepository(), products, auth });

  const origins = env.CORS_ORIGINS === '*' ? true : env.CORS_ORIGINS.split(',').map((o) => o.trim());

  const api = express.Router()
    .use(authRoutes(auth))
    .use(productRoutes(products))
    .use(promotionRoutes())
    .use(orderRoutes(orders, auth));

  return express()
    .disable('x-powered-by')
    .use(helmet())
    .use(cors({ origin: origins }))
    .use(express.json({ limit: '100kb' }))
    .get('/health', (_req, res) => {
      res.json({ status: 'ok' });
    })
    .use('/api/v1', api)
    .use(notFoundHandler)
    .use(errorHandler);
};
