import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { HttpRequest, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';

import { hashPass } from '../helpers';
import { save } from '../user.dao';

const requestValidator$ = validator$({
  body: Joi.object({
    login: Joi.string().alphanum().min(6).max(16).required(),
    password: Joi.string().alphanum().min(6).max(16).required(),
  }),
});

export const saveEffect$ = (req$: Observable<HttpRequest>) =>
  req$.pipe(
    use(requestValidator$),
    pluck('body'),
    switchMap(({ login, password }) => save({ login, password: hashPass(password), role: ['ADMIN'] })),
    map((body) => ({ body })),
  );