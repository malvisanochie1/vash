type Level = 'info' | 'warn' | 'error';

const write = (level: Level, message: string, meta?: Record<string, unknown>) => {
  const line = JSON.stringify({ level, time: new Date().toISOString(), message, ...meta });
  (level === 'error' ? console.error : console.log)(line);
};

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => write('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => write('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => write('error', message, meta),
};
