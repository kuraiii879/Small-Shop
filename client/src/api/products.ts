import apiClient from './client';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrls: string[];
  imageUrl?: string; // For backward compatibility
  colors?: string[];
  inStock: boolean;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await apiClient.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
  const response = await apiClient.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};

