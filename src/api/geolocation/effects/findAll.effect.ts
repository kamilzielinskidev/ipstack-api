import { map, switchMap } from 'rxjs/operators';
import { HttpEffect } from '@marblejs/core';

import { findAll } from '../geolocation.dao';

export const findAllEffect$: HttpEffect = (req$) =>
  req$.pipe(
    switchMap(findAll),
    map((body) => ({ body })),
  );
