import { map, mergeMap } from 'rxjs/operators';
import { r } from '@marblejs/core';
import { create } from '../dao';

export const create$ = r.pipe(
  r.matchPath('/create'),
  r.matchType('GET'),
  r.useEffect((req$) =>
    req$.pipe(
      mergeMap(() =>
        create({ adress: 'testAddress', country_name: 'testCountry', city: 'testCity', latitude: 1, longitude: 2 }),
      ),
      map((body) => ({ body })),
    ),
  ),
);
