import { from, throwError } from 'rxjs';
import { errorCondition } from '@utils';

import { Geolocation, GeolocationModel } from './geolocation.model';
import { catchError } from 'rxjs/operators';

export const findAll$ = () => from(GeolocationModel.find());

export const findOne$ = (query: string) =>
  from(GeolocationModel.findOne({ $or: [{ adress: query }, { ip: query }] })).pipe(
    errorCondition((geolocation) => !!geolocation, 'Resource not found'),
  );

export const save$ = (doc: Geolocation) =>
  from(new GeolocationModel(doc).save()).pipe(
    catchError((err) => throwError(err.code === 11000 ? 'Record already exist' : 'Save error')),
  );

export const remove$ = (query: string) =>
  from(GeolocationModel.findOneAndDelete({ $or: [{ adress: query }, { ip: query }] }));
