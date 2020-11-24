import { combineRoutes, r } from '@marblejs/core';

import { login$ } from './effects';

const postLogin$ = r.pipe(r.matchPath('/login'), r.matchType('POST'), r.useEffect(login$));

export const authController$ = combineRoutes('/auth', [postLogin$]);
