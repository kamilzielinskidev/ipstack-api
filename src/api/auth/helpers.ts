import bcrypt from 'bcrypt';

import { User } from '@api/user/user.model';
import { generateExpirationInHours } from '@marblejs/middleware-jwt';

export const comparePasswords = (pass1: string, pass2: string) => bcrypt.compareSync(pass1, pass2);

export type JWTTokenPayload = {
  login: User['login'];
  role: User['role'];
  exp: number;
};

export const generateTokenPayload = ({ login, role }: User): JWTTokenPayload => ({
  login,
  role,
  exp: generateExpirationInHours(4),
});
