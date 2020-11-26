import { combineRoutes, r } from '@marblejs/core';

import { loginEffect$ } from './effects';

const postLogin$ = r.pipe(r.matchPath('/login'), r.matchType('POST'), r.useEffect(loginEffect$));

export const authController$ = combineRoutes('/auth', [postLogin$]);
