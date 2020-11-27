import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const errorCondition = <T>(callback: (data: T) => boolean, errorMsg: string) => ($input: Observable<T>) =>
  $input.pipe(switchMap((data) => (callback(data) ? of(data) : throwError(errorMsg))));
