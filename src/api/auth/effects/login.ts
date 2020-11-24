import { compareSync } from 'bcrypt';
import { Observable, of, throwError, zip } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { findOneByLogin } from '@api/user/user.dao';
import { HttpError, HttpRequest, HttpStatus, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';
import { generateTokenPayload } from '../helpers';
import { generateToken } from '@marblejs/middleware-jwt';
import { config } from '@config/config';

const { jwtToken } = config.auth;

const requestValidator$ = validator$({
  body: Joi.object({
    login: Joi.string().alphanum().min(6).max(16).required(),
    password: Joi.string().alphanum().min(6).max(16).required(),
  }),
});

export const login$ = (req$: Observable<HttpRequest>) =>
  req$.pipe(
    use(requestValidator$),
    pluck('body'),
    switchMap(({ login, password }) =>
      zip(
        findOneByLogin(login).pipe(
          switchMap((user) =>
            !!user ? of(user) : throwError(new HttpError('Authorization unsuccessfull', HttpStatus.UNAUTHORIZED)),
          ),
        ),
        of(password),
      ),
    ),
    switchMap(([user, password]) =>
      compareSync(password, user.password)
        ? of(user)
        : throwError(new HttpError('Authorization unsuccessfull', HttpStatus.UNAUTHORIZED)),
    ),
    map(generateTokenPayload),
    map(generateToken({ secret: jwtToken })),
    map((token) => ({ body: { token } })),
  );
