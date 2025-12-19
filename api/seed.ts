import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../server/src/models/User';

dotenv.config();

// Vercel serverless function to seed admin user
export default async function handler(req: any, res: any) {
  // Simple auth check - you might want to add a secret key here
  const authKey = req.headers['x-seed-key'] || req.query.key;
  if (authKey !== process.env.SEED_SECRET && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ error: 'MONGODB_URI not set' });
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL || 'admin@store.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      await mongoose.connection.close();
      return res.json({ 
        message: 'Admin user already exists',
        email 
      });
    }

    // Create admin user
    const admin = new User({
      email,
      password,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully!');

    await mongoose.connection.close();
    return res.json({ 
      message: 'Admin user created successfully',
      email,
      password: 'Check ADMIN_PASSWORD env var'
    });
  } catch (error: any) {
    console.error('Error seeding admin:', error);
    await mongoose.connection.close();
    return res.status(500).json({ 
      error: 'Error seeding admin',
      message: error.message 
    });
  }
}

