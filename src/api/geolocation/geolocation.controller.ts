import { combineRoutes, r } from '@marblejs/core';
import { findAllEffect$, removeEffect$, saveEffect$ } from './effects';

const getAll$ = r.pipe(r.matchPath('/'), r.matchType('GET'), r.useEffect(findAllEffect$));

const post$ = r.pipe(r.matchPath('/'), r.matchType('POST'), r.useEffect(saveEffect$));

const delete$ = r.pipe(r.matchPath('/:id'), r.matchType('DELETE'), r.useEffect(removeEffect$));

export const geolocationController$ = combineRoutes('/geolocation', [getAll$, post$, delete$]);
