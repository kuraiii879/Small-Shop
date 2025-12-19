import axios from 'axios';

// In production on Vercel, use relative URL since API is on same domain
// Otherwise use environment variable or localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for http-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

