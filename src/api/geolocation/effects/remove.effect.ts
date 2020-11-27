import { map, pluck, switchMap } from 'rxjs/operators';
import { HttpEffect, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';

import { remove$ } from '../geolocation.dao';

const requestValidator$ = validator$({
  params: Joi.object({
    query: Joi.string(),
  }),
});

export const removeEffect$: HttpEffect = (req$) =>
  req$.pipe(
    use(requestValidator$),
    pluck('params', 'query'),
    switchMap(remove$),
    map((body) => ({ body })),
  );
