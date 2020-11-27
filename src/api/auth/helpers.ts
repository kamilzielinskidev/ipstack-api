import { User } from '@api/user/user.model';
import { generateExpirationInHours } from '@marblejs/middleware-jwt';

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
