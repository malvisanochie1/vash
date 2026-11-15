import { env } from '@/config/env';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type TokenGetter = () => string | null | undefined;
let getToken: TokenGetter = () => null;

/** Lets the auth store provide the current token without a circular import. */
export const setTokenGetter = (getter: TokenGetter) => {
  getToken = getter;
};

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
}

export async function http<T>(path: string, { method = 'GET', body, query }: RequestOptions = {}): Promise<T> {
  const qs = query
    ? '?' +
      Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';
  const token = getToken();

  const response = await fetch(`${env.apiUrl}/api/v1${path}${qs}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    data?: T;
    error?: { message: string; code?: string };
  };
  if (!response.ok) {
    throw new ApiError(payload.error?.message ?? 'Something went wrong', response.status, payload.error?.code);
  }
  return payload.data as T;
}
