export type UserRole = 'customer' | 'admin';

export interface Address {
  line1: string;
  city: string;
  state: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  address?: Address;
  createdAt: string;
}

export type PublicUser = Omit<User, 'passwordHash'>;

export const toPublicUser = ({ passwordHash: _omit, ...user }: User): PublicUser => user;
