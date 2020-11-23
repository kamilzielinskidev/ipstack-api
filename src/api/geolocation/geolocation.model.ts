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

const GeolocationSchema = new Schema<Geolocation>({
  adress: { type: String, required: false },
  ip: { type: String, required: true },
  country_name: { type: String, required: true },
  city: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

export const GeolocationModel = mongoose.model<GeolocationDoc>('Geolocation', GeolocationSchema);
