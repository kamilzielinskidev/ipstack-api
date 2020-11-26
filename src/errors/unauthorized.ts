import { HttpError, HttpStatus } from '@marblejs/core';

const message = 'Authorization unsuccessfull';

export const unauthorized = new HttpError(message, HttpStatus.UNAUTHORIZED);
