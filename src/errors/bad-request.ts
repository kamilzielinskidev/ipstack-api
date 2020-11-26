import { HttpError, HttpStatus } from '@marblejs/core';

const message = 'Bad Request';

export const badRequest = new HttpError(message, HttpStatus.BAD_REQUEST);
