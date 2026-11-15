/**
 * Runtime configuration. EXPO_PUBLIC_* vars are inlined at build time.
 * When no API URL is configured the app runs on its built-in demo data,
 * so it is fully usable before the backend is deployed.
 */
const apiUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

export const env = {
  apiUrl,
  useRemoteApi: Boolean(apiUrl),
} as const;
