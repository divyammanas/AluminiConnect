import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  if (!env.mongodbUri) {
    console.warn('MONGODB_URI is not set; starting without a database connection.');
    return;
  }

  await mongoose.connect(env.mongodbUri);
  console.log('MongoDB connected');
}

