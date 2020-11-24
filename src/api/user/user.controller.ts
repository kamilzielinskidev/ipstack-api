import { combineRoutes, r } from '@marblejs/core';

import { saveEffect$ } from './effects';

const post$ = r.pipe(r.matchPath('/'), r.matchType('POST'), r.useEffect(saveEffect$));

export const userController$ = combineRoutes('/user', [post$]);
