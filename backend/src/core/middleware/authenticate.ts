import type { RequestHandler } from 'express';
import { Unauthorized } from '../errors.js';
import { tokenService } from '../../modules/auth/token.service.js';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export const authenticate: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token) return next(Unauthorized());
  try {
    req.userId = tokenService.verify(token).sub;
    next();
  } catch {
    next(Unauthorized('Session expired, please sign in again'));
  }
};

/** Narrow helper for controllers behind `authenticate`. */
export const requireUserId = (req: { userId?: string }): string => {
  if (!req.userId) throw Unauthorized();
  return req.userId;
};
