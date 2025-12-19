import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from '../server/src/routes/auth';
import productRoutes from '../server/src/routes/products';
import orderRoutes from '../server/src/routes/orders';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes - Mount at /api since Vercel routes /api/* to this handler
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Connect to MongoDB (reuse connection if exists)
let cachedDb: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedDb && cachedDb.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/clothing-store',
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    cachedDb = db;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Vercel serverless function handler
export default async function handler(req: Request, res: Response) {
  // Connect to database before handling request
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Handle the request with Express app
  return app(req, res);
}

