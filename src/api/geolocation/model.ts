import mongoose, { Schema, Document } from 'mongoose';

export type Geolocation = {
  adress: string;
  country_name: string;
  city: string;
  latitude: number;
  longitude: number;
};

type GeolocationDocument = Geolocation & Document;

const GeolocationSchema = new Schema<Geolocation>({
  adress: { type: String, required: true, unique: true },
  country_name: { type: String, required: true },
  city: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

export const Geolocation = mongoose.model<GeolocationDocument>('Geolocation', GeolocationSchema);
