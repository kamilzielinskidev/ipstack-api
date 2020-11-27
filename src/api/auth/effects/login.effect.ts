import { catchError, map, pluck, switchMap } from 'rxjs/operators';
import { findOneByCredentials$ } from '@api/user/user.dao';
import { config } from '@config';
import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';
import { generateToken } from '@marblejs/middleware-jwt';

import { generateTokenPayload } from '../helpers';
import { throwError } from 'rxjs';

const { jwtToken } = config.auth;

const requestValidator$ = validator$({
  body: Joi.object({
    login: Joi.string().alphanum().min(6).max(16).required(),
    password: Joi.string().alphanum().min(6).max(16).required(),
  }),
});

export const loginEffect$: HttpEffect = (req$) =>
  req$.pipe(
    use(requestValidator$),
    pluck('body'),
    switchMap(({ login, password }) =>
      findOneByCredentials$(login, password).pipe(
        catchError((err) => throwError(new HttpError(err, HttpStatus.FORBIDDEN))),
      ),
    ),
    map(generateTokenPayload),
    map(generateToken({ secret: jwtToken })),
    map((token) => ({ body: { token } })),
  );
