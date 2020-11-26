import { pluck, switchMap, map } from 'rxjs/operators';
import { HttpEffect, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';
import { findOne } from '../geolocation.dao';

const requestValidator$ = validator$({
  params: Joi.object({
    query: Joi.string(),
  }),
});

export const findOneEffect$: HttpEffect = (req$) =>
  req$.pipe(
    use(requestValidator$),
    pluck('params', 'query'),
    switchMap(findOne),
    map((body) => ({ body })),
  );