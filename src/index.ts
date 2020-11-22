import { connect } from '@connection/database';
import { create } from '@connection/server';

const main = async () => {
  await connect();
  (await create())();
};

main();
