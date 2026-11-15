import { Router, type Request, type RequestHandler } from 'express';
import { Forbidden } from '../../core/errors.js';
import { authenticate, requireUserId } from '../../core/middleware/authenticate.js';
import { validate } from '../../core/middleware/validate.js';
import type { AuthService } from '../auth/auth.service.js';
import { CreateOrderBody, UpdateStatusBody } from './order.schema.js';
import type { OrderService } from './order.service.js';

export const orderRoutes = (service: OrderService, auth: AuthService) => {
  const adminOnly: RequestHandler = async (req, _res, next) => {
    const user = await auth.me(requireUserId(req));
    next(user.role === 'admin' ? undefined : Forbidden());
  };

  return Router()
    .use('/orders', authenticate)
    .post('/orders', validate(CreateOrderBody), async (req, res) => {
      res.status(201).json({ data: await service.create(requireUserId(req), req.body) });
    })
    .get('/orders', async (req, res) => {
      res.json({ data: await service.list(requireUserId(req)) });
    })
    .get('/orders/:id', async (req, res) => {
      res.json({ data: await service.get(requireUserId(req), req.params.id) });
    })
    .patch('/orders/:id/status', adminOnly, validate(UpdateStatusBody), async (req: Request<{ id: string }>, res) => {
      res.json({ data: await service.updateStatus(req.params.id, req.body.status) });
    });
};
