import { defaults } from './defaults';

export const config = {
  server: {
    port: Number(process.env.PORT || defaults.port),
  },
  db: {
    url: process.env.DB_URL_MAIN || defaults.dbUrl,
  },
};
