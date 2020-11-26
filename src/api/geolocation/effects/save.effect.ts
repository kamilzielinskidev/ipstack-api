import { of, zip } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { HttpEffect, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';

import { save } from '../geolocation.dao';
import { fetchGeolocationData$ } from '../helpers';

const requestValidator$ = validator$({
  body: Joi.object({
    query: Joi.string().required(),
  }),
});

export const saveEffect$: HttpEffect = (req$) =>
  req$.pipe(
    use(requestValidator$),
    pluck('body', 'query'),
    switchMap((query) => zip(of(query), fetchGeolocationData$(query))),
    switchMap(([adress, { ip, country_name, city, latitude, longitude }]) =>
      save({ adress, ip, country_name, city, latitude, longitude }),
    ),
    map((body) => ({ body })),
  );
