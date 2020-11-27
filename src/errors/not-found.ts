import { HttpError, HttpStatus } from '@marblejs/core';

const message = 'Resource not found';

export const notFound = new HttpError(message, HttpStatus.NOT_FOUND);
