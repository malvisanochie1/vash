import type { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError } from '../errors.js';
import { logger } from '../logger.js';

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.path} not found` } });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
    return;
  }
  logger.error('Unhandled error', { path: req.path, error: String(err?.stack ?? err) });
  res.status(500).json({ error: { code: 'INTERNAL', message: 'Something went wrong' } });
};
