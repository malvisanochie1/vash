import bcrypt from 'bcryptjs';
import { Conflict, NotFound, Unauthorized } from '../../core/errors.js';
import { newId } from '../../shared/ids.js';
import type { UserRepository } from '../users/user.repository.js';
import { toPublicUser, type PublicUser } from '../users/user.types.js';
import type { LoginBody, RegisterBody } from './auth.schema.js';
import { tokenService } from './token.service.js';

export interface AuthSession {
  token: string;
  user: PublicUser;
}

export const createAuthService = (users: UserRepository) => {
  const session = (user: Parameters<typeof toPublicUser>[0]): AuthSession => ({
    token: tokenService.sign(user.id),
    user: toPublicUser(user),
  });

  return {
    async login({ email, password }: LoginBody): Promise<AuthSession> {
      const user = await users.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        throw Unauthorized('Email or password is incorrect');
      }
      return session(user);
    },

    async register({ name, email, password }: RegisterBody): Promise<AuthSession> {
      if (await users.findByEmail(email)) throw Conflict('An account with this email already exists');
      const user = await users.save({
        id: newId(),
        name,
        email,
        passwordHash: await bcrypt.hash(password, 10),
        role: 'customer',
        createdAt: new Date().toISOString(),
      });
      return session(user);
    },

    async me(userId: string): Promise<PublicUser> {
      const user = await users.findById(userId);
      if (!user) throw NotFound('User');
      return toPublicUser(user);
    },
  };
};

export type AuthService = ReturnType<typeof createAuthService>;
