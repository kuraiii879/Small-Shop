import express, { Request, Response } from 'express';
import Order from '../models/Order';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// POST /api/orders - Create new order (public)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { customerName, customerPhone, customerAddress, items, deliveryFee } = req.body;

    if (!customerName || !customerPhone || !customerAddress || !items || items.length === 0) {
      return res.status(400).json({ error: 'Customer information and items are required' });
    }

    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0) + (deliveryFee || 8);

    const order = new Order({
      customerName,
      customerPhone,
      customerAddress,
      items,
      totalAmount,
      deliveryFee: deliveryFee || 8,
      status: 'pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});

// GET /api/orders - Get all orders (admin only)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('items.product');
    res.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// GET /api/orders/:id - Get single order (admin only)
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error: any) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
});

// PUT /api/orders/:id/status - Update order status (admin only)
router.put('/:id/status', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Valid status is required' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.product');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error: any) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Error updating order status' });
  }
});

export default router;

