import { Schema, model, Document } from 'mongoose';

export interface User {
  email: string;
  password: string;
}

export type UserDocument = User & Document;

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>('user', userSchema);
