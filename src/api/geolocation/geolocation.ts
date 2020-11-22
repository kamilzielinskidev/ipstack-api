import { combineRoutes } from '@marblejs/core';

import { create$ } from './effects/create';
import { findAll$ } from './effects/findAll';

export const geolocation$ = combineRoutes('/geolocation', [findAll$, create$]);
