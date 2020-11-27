import { of, throwError, zip } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';
import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';

import { save$ } from '../geolocation.dao';
import { fetchGeolocationData$ } from '../helpers';

const requestValidator$ = validator$({
  body: Joi.object({
    query: Joi.string().required(),
  }),
});

const fetchGeolocation$ = (query: string) =>
  fetchGeolocationData$(query).pipe(
    catchError((err) =>
      throwError(
        new HttpError(
          err,
          err === 'Failed to fetch from IPStack API' ? HttpStatus.FAILED_DEPENDENCY : HttpStatus.BAD_REQUEST,
        ),
      ),
    ),
  );

export const saveEffect$: HttpEffect = (req$) =>
  req$.pipe(
    use(requestValidator$),
    pluck('body', 'query'),
    switchMap((query) => zip(of(query), fetchGeolocation$(query))),
    switchMap(([adress, { ip, country_name, city, latitude, longitude }]) =>
      save$({ adress, ip, country_name, city, latitude, longitude }).pipe(
        catchError((err) => throwError(new HttpError(err, HttpStatus.BAD_REQUEST))),
      ),
    ),
    map((body) => ({ body })),
  );
