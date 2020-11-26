import { compareSync } from 'bcrypt';
import { of, zip } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { findOneByLogin } from '@api/user/user.dao';
import { UserDoc } from '@api/user/user.model';
import { config } from '@config';
import { unauthorized } from '@errors';
import { HttpEffect, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';
import { generateToken } from '@marblejs/middleware-jwt';
import { errorCondition } from '@utils';

import { generateTokenPayload } from '../helpers';

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
      zip(
        findOneByLogin(login).pipe(
          switchMap(errorCondition((userDoc) => !!userDoc, unauthorized)),
          map((userDoc) => userDoc as UserDoc),
        ),
        of(password),
      ),
    ),
    switchMap(errorCondition(([user, password]) => compareSync(password, user.password), unauthorized)),
    map(([user]) => user),
    map(generateTokenPayload),
    map(generateToken({ secret: jwtToken })),
    map((token) => ({ body: { token } })),
  );
