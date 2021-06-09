import { Schema, model } from 'mongoose';
import { Goal } from './goal';
import { User } from './user';

export interface Category {
  name: string;
  goals: string[] | Schema.Types.ObjectId[] | Goal[];
  user: string | Schema.Types.ObjectId | User;
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'goal',
      default: [],
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export const CategoryModel = model<Category>('category', categorySchema);
