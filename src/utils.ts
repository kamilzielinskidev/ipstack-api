import { of, throwError } from 'rxjs';
import { HttpError } from '@marblejs/core';

export const errorCondition = <T>(callback: (data: T) => boolean, httpError: HttpError) => (data: T) =>
  callback(data) ? of(data) : throwError(httpError);
