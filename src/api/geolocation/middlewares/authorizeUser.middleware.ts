import { of, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { JWTTokenPayload } from '@api/auth/helpers';
import { findOneByLogin } from '@api/user/user.dao';
import { config } from '@config/config';
import { HttpError, HttpStatus } from '@marblejs/core';
import { authorize$ } from '@marblejs/middleware-jwt';

const { jwtToken } = config.auth;

const verifyUser$ = ({ login }: JWTTokenPayload) =>
  findOneByLogin(login).pipe(
    switchMap((user) =>
      !!user
        ? of(user).pipe(map(({ login, role }) => ({ login, role })))
        : throwError(new HttpError('Authorization unsuccessfull', HttpStatus.UNAUTHORIZED)),
    ),
  );

export const authorizeUser$ = authorize$({ secret: jwtToken }, verifyUser$);
