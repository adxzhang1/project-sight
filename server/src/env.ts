import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3001;
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/solo-project';
export const JWT_SECRET = process.env.JWT_SECRET!;
