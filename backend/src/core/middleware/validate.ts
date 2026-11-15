import type { RequestHandler } from 'express';
import { z } from 'zod';
import { BadRequest } from '../errors.js';

type RequestPart = 'body' | 'query' | 'params';

/**
 * Validates a request part against a Zod schema and replaces it with the
 * parsed (typed, defaulted) value. Express 5 exposes `req.query` as a getter,
 * so the value is redefined rather than assigned.
 */
export const validate =
  (schema: z.ZodType, part: RequestPart = 'body'): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      next(BadRequest('Invalid request', z.flattenError(result.error).fieldErrors));
      return;
    }
    Object.defineProperty(req, part, { value: result.data, writable: true, configurable: true });
    next();
  };
