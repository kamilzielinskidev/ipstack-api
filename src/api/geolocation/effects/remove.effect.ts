import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { HttpRequest, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';

import { remove } from '../geolocation.dao';

const requestValidator$ = validator$({
  params: {
    id: Joi.string(),
  },
});

export const removeEffect$ = (req$: Observable<HttpRequest>) =>
  req$.pipe(
    use(requestValidator$),
    pluck('params', 'id'),
    switchMap(remove),
    map((body) => ({ body })),
  );
