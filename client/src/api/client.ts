import axios from 'axios';

// Use environment variable if set, otherwise use relative URL for Vercel deployment
// For local development, set VITE_API_URL=http://localhost:5000/api in .env file
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for http-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

