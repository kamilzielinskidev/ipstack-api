import { map } from 'rxjs/operators';
import { JWTTokenPayload } from '@api/auth/helpers';
import { findOneByLogin$ } from '@api/user/user.dao';
import { config } from '@config';
import { authorize$ } from '@marblejs/middleware-jwt';

const { jwtToken } = config.auth;

const verifyUser$ = ({ login }: JWTTokenPayload) =>
  findOneByLogin$(login).pipe(
    map((userDoc) => userDoc!),
    map(({ login, role }) => ({ login, role })),
  );

export const authorizeUser$ = authorize$({ secret: jwtToken }, verifyUser$);
