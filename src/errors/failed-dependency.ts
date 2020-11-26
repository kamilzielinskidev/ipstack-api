import { HttpError, HttpStatus } from '@marblejs/core';

const message = 'Failed dependency';

export const failedDependency = new HttpError(message, HttpStatus.FAILED_DEPENDENCY);
