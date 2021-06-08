import { Schema, model } from 'mongoose';

export interface Goal {
  title: string;
  description?: string;
}

const goalSchema = new Schema<Goal>({
  title: { type: String, required: true },
  description: String,
});

export const GoalModel = model<Goal>('goal', goalSchema);
