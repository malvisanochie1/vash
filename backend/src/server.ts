import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './core/logger.js';

const server = createApp().listen(env.PORT, () => {
  logger.info('Vash API listening', { port: env.PORT, env: env.NODE_ENV });
});

const shutdown = (signal: string) => {
  logger.info('Shutting down', { signal });
  server.close(() => process.exit(0));
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
