import { Router } from 'express';
import { authenticate, requireUserId } from '../../core/middleware/authenticate.js';
import { validate } from '../../core/middleware/validate.js';
import { LoginBody, RegisterBody } from './auth.schema.js';
import type { AuthService } from './auth.service.js';

export const authRoutes = (service: AuthService) =>
  Router()
    .post('/auth/login', validate(LoginBody), async (req, res) => {
      res.json({ data: await service.login(req.body) });
    })
    .post('/auth/register', validate(RegisterBody), async (req, res) => {
      res.status(201).json({ data: await service.register(req.body) });
    })
    .get('/auth/me', authenticate, async (req, res) => {
      res.json({ data: await service.me(requireUserId(req)) });
    });
