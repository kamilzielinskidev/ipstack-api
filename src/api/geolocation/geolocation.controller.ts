import { combineRoutes, r } from '@marblejs/core';
import { authorizeUser$ } from '@middlewares';

import { findAllEffect$, removeEffect$, saveEffect$ } from './effects';
import { findOneEffect$ } from './effects/findOne.effect';

const get$ = r.pipe(r.matchPath('/'), r.matchType('GET'), r.useEffect(findAllEffect$));

const getOne$ = r.pipe(r.matchPath('/:query'), r.matchType('GET'), r.useEffect(findOneEffect$));

const post$ = r.pipe(r.matchPath('/'), r.matchType('POST'), r.useEffect(saveEffect$));

const deleteById$ = r.pipe(r.matchPath('/:query'), r.matchType('DELETE'), r.useEffect(removeEffect$));

export const geolocationController$ = combineRoutes('/geolocation', {
  effects: [get$, getOne$, post$, deleteById$],
  middlewares: [authorizeUser$],
});
