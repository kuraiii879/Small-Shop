import apiClient from './client';

export interface OrderItem {
  product: string;
  productName: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
}

export interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  deliveryFee?: number;
}

export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
  const response = await apiClient.post('/orders', orderData);
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get('/orders');
  return response.data;
};

export const getOrder = async (id: string): Promise<Order> => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
  const response = await apiClient.put(`/orders/${id}/status`, { status });
  return response.data;
};

