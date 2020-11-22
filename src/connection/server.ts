import { geolocation$ } from 'api/geolocation/geolocation';
import { config } from '@config/config';
import { createServer, httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';

const { server } = config;

const listener = httpListener({
  middlewares: [logger$(), bodyParser$()],
  effects: [geolocation$],
});

export const create = () => createServer({ listener, port: server.port });
