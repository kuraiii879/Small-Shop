import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Configure multer for file uploads
// Use memory storage for Vercel serverless functions (can't write to disk)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Helper function to convert buffer to base64 data URL
function bufferToDataURL(buffer: Buffer, mimetype: string): string {
  const base64 = buffer.toString('base64');
  return `data:${mimetype};base64,${base64}`;
}

// GET /api/products - Public route to get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// GET /api/products/:id - Public route to get single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// POST /api/products - Admin only - Create product
router.post('/', authenticate, upload.array('images', 5), async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, category, inStock, stockQuantity, colors } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: 'Name, description, price, and category are required' });
    }

    // Convert uploaded images to base64 data URLs for storage
    const imageUrls = req.files && Array.isArray(req.files)
      ? req.files.map((file: Express.Multer.File) => {
          if (file.buffer) {
            return bufferToDataURL(file.buffer, file.mimetype);
          }
          return '';
        }).filter(url => url !== '')
      : [];

    let productColors = ['Black', 'White', 'Gray', 'Navy', 'Green'];
    if (colors) {
      if (Array.isArray(colors)) {
        productColors = colors;
      } else if (typeof colors === 'string') {
        try {
          // Try parsing as JSON first
          productColors = JSON.parse(colors);
        } catch {
          // If not JSON, treat as comma-separated string
          productColors = colors.split(',').map((c: string) => c.trim()).filter((c: string) => c.length > 0);
        }
      }
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrls,
      colors: productColors,
      inStock: inStock === 'true' || inStock === true,
      stockQuantity: parseInt(stockQuantity) || 0
    });

    await product.save();
    res.status(201).json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
});

// PUT /api/products/:id - Admin only - Update product
router.put('/:id', authenticate, upload.array('images', 5), async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, category, inStock, stockQuantity, existingImages, colors } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = parseFloat(price);
    if (category) updateData.category = category;
    if (inStock !== undefined) updateData.inStock = inStock === 'true' || inStock === true;
    if (stockQuantity !== undefined) updateData.stockQuantity = parseInt(stockQuantity);
    if (colors !== undefined) {
      if (Array.isArray(colors)) {
        updateData.colors = colors;
      } else if (typeof colors === 'string') {
        try {
          updateData.colors = JSON.parse(colors);
        } catch {
          updateData.colors = colors.split(',').map((c: string) => c.trim()).filter((c: string) => c.length > 0);
        }
      }
    }

    // Handle image updates - convert to base64 data URLs
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const newImageUrls = req.files
        .map((file: Express.Multer.File) => {
          if (file.buffer) {
            return bufferToDataURL(file.buffer, file.mimetype);
          }
          return '';
        })
        .filter(url => url !== '');
      
      // Merge with existing images if provided
      if (existingImages) {
        const existing = Array.isArray(existingImages) ? existingImages : JSON.parse(existingImages);
        updateData.imageUrls = [...existing, ...newImageUrls].slice(0, 5); // Max 5 images
      } else {
        updateData.imageUrls = newImageUrls;
      }
    } else if (existingImages) {
      // Only update existing images if no new files uploaded
      const existing = Array.isArray(existingImages) ? existingImages : JSON.parse(existingImages);
      updateData.imageUrls = existing;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
});

// DELETE /api/products/:id - Admin only - Delete product
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

export default router;

