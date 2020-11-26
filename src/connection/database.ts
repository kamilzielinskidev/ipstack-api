import chalk from 'chalk';
import mongoose from 'mongoose';
import { config } from '@config';

const { db } = config;

const onOpen = () => {
  console.info(chalk.green('[database] connected'));
};

const onError = (error: mongoose.Error) => {
  console.error(chalk.red(`[database] connection error: ${error.message}`));
  process.exit();
};

export const connect = () =>
  mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(onOpen).catch(onError);

export const disconnect = () => mongoose.disconnect();
