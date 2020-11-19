import { createServer } from '@marblejs/core';
import { listener } from './src/http.listener';

const server = createServer({
  port: parseInt(process.env.PORT || '1337'),
  listener,
});

const main = async () =>
  await (await server)();

main();