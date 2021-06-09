import { config } from 'dotenv';

config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3001;
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/solo-project';
export const JWT_SECRET = process.env.JWT_SECRET!;
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN!;
