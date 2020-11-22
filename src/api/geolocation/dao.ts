import { from } from 'rxjs';
import { Geolocation } from './model';

export const findAll = () => from(Geolocation.find());

export const create = (doc: Geolocation) => from(new Geolocation(doc).save());
