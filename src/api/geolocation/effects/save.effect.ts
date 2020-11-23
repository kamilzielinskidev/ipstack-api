import { Observable, of, throwError, zip } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';
import { HttpError, HttpRequest, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';

import { save } from '../geolocation.dao';
import { fetchGeolocationData$ } from '../helpers';

const validator$ = requestValidator$({
  body: t.type({
    query: t.string,
  }),
});

export const saveEffect$ = (req$: Observable<HttpRequest>) =>
  req$.pipe(
    use(validator$),
    pluck('body', 'query'),
    switchMap((query) =>
      zip(
        of(query),
        fetchGeolocationData$(query).pipe(
          catchError(() =>
            throwError(new HttpError('Error while connecting to ipstack API', HttpStatus.FAILED_DEPENDENCY)),
          ),
        ),
      ),
    ),
    switchMap(([adress, { ip, country_name, city, latitude, longitude }]) =>
      save({ adress, ip, country_name, city, latitude, longitude }),
    ),
    map((body) => ({ body })),
  );
