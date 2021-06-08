import { Schema, model } from 'mongoose';
import { Goal } from './goal';

export interface Category {
  name: string;
  goals: string[] | Schema.Types.ObjectId[] | Goal[];
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
});

export const CategoryModel = model<Category>('category', categorySchema);
