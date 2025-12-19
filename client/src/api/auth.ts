import apiClient from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/auth/verify');
    return response.data.authenticated === true;
  } catch {
    return false;
  }
};

