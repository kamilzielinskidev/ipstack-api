import { defaults } from './defaults';

export const config = {
  server: {
    port: Number(process.env.PORT || defaults.port),
  },
  db: {
    url: process.env.DB_URL_MAIN || defaults.dbUrlMain,
  },
  ipstackAPI: {
    key: process.env.IPSTACK_API_KEY || defaults.ipstackApiKey,
  },
  auth: {
    jwtToken: process.env.JWT_TOKEN || defaults.JWTToken,
  },
};
