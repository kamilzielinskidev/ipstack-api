import { geolocationController$ } from 'api/geolocation';
import { config } from '@config/config';
import { createServer, httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { cors$ } from '@marblejs/middleware-cors';
import { logger$ } from '@marblejs/middleware-logger';

const { server } = config;

const listener = httpListener({
  middlewares: [
    logger$(),
    bodyParser$(),
    cors$({
      origin: '*',
      allowHeaders: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  ],
  effects: [geolocationController$],
});

export const create = () => createServer({ listener, port: server.port });
