export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code: string = 'APP_ERROR',
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const BadRequest = (message: string, details?: unknown) =>
  new AppError(400, message, 'BAD_REQUEST', details);
export const Unauthorized = (message = 'Authentication required') =>
  new AppError(401, message, 'UNAUTHORIZED');
export const Forbidden = (message = 'Not allowed') => new AppError(403, message, 'FORBIDDEN');
export const NotFound = (resource: string) =>
  new AppError(404, `${resource} not found`, 'NOT_FOUND');
export const Conflict = (message: string) => new AppError(409, message, 'CONFLICT');
