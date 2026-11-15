import bcrypt from 'bcryptjs';
import { MemoryCollection } from '../../shared/memory-store.js';
import type { User } from './user.types.js';

export interface UserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

/** Demo account so the app can be explored before real sign-ups exist. */
const demoUser: User = {
  id: 'u-demo',
  name: 'Ada Okafor',
  email: 'demo@vash.ng',
  passwordHash: bcrypt.hashSync('vash1234', 10),
  role: 'customer',
  address: { line1: '12 Admiralty Way, Lekki Phase 1', city: 'Lagos', state: 'Lagos', phone: '+234 803 000 4412' },
  createdAt: new Date(0).toISOString(),
};

export const createMemoryUserRepository = (): UserRepository => {
  const users = new MemoryCollection<User>([demoUser]);
  return {
    findById: async (id) => users.get(id),
    findByEmail: async (email) => users.find((u) => u.email === email.toLowerCase()),
    save: async (user) => users.save(user),
  };
};
