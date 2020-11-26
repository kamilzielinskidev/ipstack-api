import { map, switchMap } from 'rxjs/operators';
import { JWTTokenPayload } from '@api/auth/helpers';
import { findOneByLogin } from '@api/user/user.dao';
import { config } from '@config';
import { unauthorized } from '@errors';
import { authorize$ } from '@marblejs/middleware-jwt';
import { errorCondition } from '@utils';

const { jwtToken } = config.auth;

const verifyUser$ = ({ login }: JWTTokenPayload) =>
  findOneByLogin(login).pipe(
    switchMap(errorCondition((user) => !!user, unauthorized)),
    map((userDoc) => userDoc!),
    map(({ login, role }) => ({ login, role })),
  );

export const authorizeUser$ = authorize$({ secret: jwtToken }, verifyUser$);
