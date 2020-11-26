import { authController$, geolocationController$, userController$ } from '@api/';
import { config } from '@config';
import { createServer, httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { cors$ } from '@marblejs/middleware-cors';
import { logger$ } from '@marblejs/middleware-logger';
import { contentTypeApplicationJSON$ } from '@outputs';

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
  effects: [userController$, authController$, geolocationController$],
  output$: ($output) => $output.pipe(contentTypeApplicationJSON$),
});

export const create = () => createServer({ listener, port: server.port });
