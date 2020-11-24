import { combineRoutes, r } from '@marblejs/core';

import { findAllEffect$, removeEffect$, saveEffect$ } from './effects';
import { authorizeUser$ } from './middlewares';

const get$ = r.pipe(r.matchPath('/'), r.matchType('GET'), r.useEffect(findAllEffect$));

const post$ = r.pipe(r.matchPath('/'), r.matchType('POST'), r.useEffect(saveEffect$));

const deleteById$ = r.pipe(r.matchPath('/:id'), r.matchType('DELETE'), r.useEffect(removeEffect$));

export const geolocationController$ = combineRoutes('/geolocation', {
  effects: [get$, post$, deleteById$],
  middlewares: [authorizeUser$],
});
