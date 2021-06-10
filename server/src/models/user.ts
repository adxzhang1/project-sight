import { Schema, model, Document } from 'mongoose';
import { CategoryModel } from './category';
import { GoalModel } from './goal';

export interface User {
  email: string;
  password: string;
}

export type UserDocument = User & Document;

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('remove', async function () {
  try {
    await Promise.all([
      CategoryModel.deleteMany({ user: this._id }),
      GoalModel.deleteMany({ user: this._id }),
    ]);
  } catch (err) {
    console.log(err);
  }
});

export const UserModel = model<User>('user', userSchema);
