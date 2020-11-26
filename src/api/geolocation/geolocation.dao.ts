import { from } from 'rxjs';

import { Geolocation, GeolocationModel } from './geolocation.model';

export const findAll = () => from(GeolocationModel.find());

export const findOne = (query: string) => from(GeolocationModel.findOne({ $or: [{ adress: query }, { ip: query }] }));

export const save = (doc: Geolocation) => from(new GeolocationModel(doc).save());

export const remove = (query: string) =>
  from(GeolocationModel.findOneAndDelete({ $or: [{ adress: query }, { ip: query }] }));
