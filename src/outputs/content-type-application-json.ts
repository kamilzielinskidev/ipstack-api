import { HttpEffectResponse, HttpRequest } from '@marblejs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const contentTypeApplicationJSON$ = ($output: Observable<{ req: HttpRequest; res: HttpEffectResponse }>) =>
  $output.pipe(
    map(({ res }) => ({
      ...res,
      headers: { ...res.headers, 'Content-Type': 'application/json' },
    })),
  );
