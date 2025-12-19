import express, { Request, Response, NextFunction } from 'express';
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

// Connect to MongoDB (reuse connection if exists)
let cachedDb: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    if (!process.env.MONGODB_URI) {
      const errorMsg = 'MONGODB_URI environment variable is not set. Please add it in Vercel Environment Variables.';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Check if using localhost (won't work on Vercel)
    if (process.env.MONGODB_URI.includes('localhost') || process.env.MONGODB_URI.includes('127.0.0.1')) {
      const errorMsg = 'Cannot use localhost MongoDB on Vercel. Please use MongoDB Atlas (free cloud MongoDB).';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    console.log('Attempting to connect to MongoDB...');
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });
    cachedDb = db;
    console.log('✅ Connected to MongoDB successfully');
    return db;
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Full error:', error);
    throw error;
  }
}

// Middleware to ensure DB connection before handling routes
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectToDatabase();
    next();
  } catch (error: any) {
    console.error('Database connection failed:', error.message);
    return res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message || 'Please check MONGODB_URI environment variable',
      hint: 'Make sure MONGODB_URI is set in Vercel Environment Variables and points to a cloud MongoDB (not localhost)'
    });
  }
});

// Routes - Mount at /api since Vercel routes /api/* to this handler
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Express error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Vercel serverless function handler
export default async function handler(req: Request, res: Response) {
  return app(req, res);
}

