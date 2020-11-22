import { r } from '@marblejs/core';
import { map, mergeMap } from 'rxjs/operators';
import { findAll } from '../dao';

export const findAll$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect((req$) =>
    req$.pipe(
      mergeMap(findAll),
      map((body) => ({ body })),
    ),
  ),
);
