import mongoose, { Document, Schema } from 'mongoose';

export type Role = 'ADMIN' | 'USER';

export type User = {
  login: string;
  password: string;
  role: Role[];
};

type UserDoc = User & Document;

const UserSchema = new Schema({
  login: { type: String, unique: true },
  password: String,
  role: [String],
});

export const UserModel = mongoose.model<UserDoc>('User', UserSchema);
