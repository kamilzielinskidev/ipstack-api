import mongoose, { Document, Schema } from 'mongoose';

export type Geolocation = {
  adress: string;
  ip: string;
  country_name: string;
  city: string;
  latitude: number;
  longitude: number;
};

type GeolocationDoc = Geolocation & Document;

const GeolocationSchema = new Schema({
  adress: { type: String, unique: true },
  ip: { type: String, unique: true },
  country_name: String,
  city: String,
  latitude: Number,
  longitude: Number,
});

export const GeolocationModel = mongoose.model<GeolocationDoc>('Geolocation', GeolocationSchema);
