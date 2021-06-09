import { Schema, model } from 'mongoose';
import { User } from './user';

export interface Goal {
  title: string;
  description?: string;
  user: string | Schema.Types.ObjectId | User;
}

const goalSchema = new Schema<Goal>({
  title: { type: String, required: true },
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export const GoalModel = model<Goal>('goal', goalSchema);
