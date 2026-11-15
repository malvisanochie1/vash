import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env.js';

interface TokenPayload {
  sub: string;
}

export const tokenService = {
  sign: (userId: string) =>
    jwt.sign({ sub: userId } satisfies TokenPayload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    }),
  verify: (token: string) => jwt.verify(token, env.JWT_SECRET) as TokenPayload,
};
