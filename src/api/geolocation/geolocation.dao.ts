import { from } from 'rxjs';

import { Geolocation, GeolocationModel } from './geolocation.model';

export const findAll = () => from(GeolocationModel.find());

export const save = (doc: Geolocation) => from(new GeolocationModel(doc).save());

export const remove = (id: string) => from(GeolocationModel.findByIdAndDelete(id));
