import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpRequest } from '@marblejs/core';

import { findAll } from '../geolocation.dao';

export const findAllEffect$ = (req$: Observable<HttpRequest>) =>
  req$.pipe(
    mergeMap(findAll),
    map((body) => ({ body })),
  );
