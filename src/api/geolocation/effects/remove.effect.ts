import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { HttpRequest, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';

import { remove } from '../geolocation.dao';

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  }),
});

export const removeEffect$ = (req$: Observable<HttpRequest>) =>
  req$.pipe(
    use(validator$),
    pluck('params', 'id'),
    switchMap(remove),
    map((body) => ({ body })),
  );
