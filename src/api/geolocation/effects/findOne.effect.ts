import { throwError } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';
import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';

import { findOne$ } from '../geolocation.dao';

const requestValidator$ = validator$({
  params: Joi.object({
    query: Joi.string(),
  }),
});

export const findOneEffect$: HttpEffect = (req$) =>
  req$.pipe(
    use(requestValidator$),
    pluck('params', 'query'),
    switchMap((query) =>
      findOne$(query).pipe(catchError((err) => throwError(new HttpError(err, HttpStatus.NOT_FOUND)))),
    ),
    map((body) => ({ body })),
  );
