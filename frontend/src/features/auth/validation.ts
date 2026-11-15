const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export const validateLogin = (email: string, password: string): FieldErrors<'email' | 'password'> => ({
  ...(!EMAIL.test(email.trim()) && { email: 'Enter a valid email address' }),
  ...(!password && { password: 'Enter your password' }),
});

export const validateRegister = (
  name: string,
  email: string,
  password: string,
): FieldErrors<'name' | 'email' | 'password'> => ({
  ...(name.trim().length < 2 && { name: 'Tell us your name' }),
  ...(!EMAIL.test(email.trim()) && { email: 'Enter a valid email address' }),
  ...(password.length < 8 && { password: 'Use at least 8 characters' }),
});
