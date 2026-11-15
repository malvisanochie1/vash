import { env } from '@/config/env';
import type { Api } from './api.types';
import { localApi } from './local.api';
import { remoteApi } from './remote.api';

export const api: Api = env.useRemoteApi ? remoteApi : localApi;
export type { Api, ProductQuery } from './api.types';
