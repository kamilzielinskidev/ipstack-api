export const config = {
  server: {
    port: Number(process.env.PORT!),
  },
  db: {
    url: process.env.DB_URL_MAIN!,
  },
  ipstackAPI: {
    key: process.env.IPSTACK_API_KEY!,
  },
  auth: {
    jwtToken: process.env.JWT_TOKEN!,
  },
};
