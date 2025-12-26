import axios, { type AxiosInstance } from 'axios';
import type { Locale } from '@/types/locale';

/**
 * Axios instance for backend API calls
 * Will be configured when backend is ready
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add locale header
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get locale from URL or default to 'uz'
    // Only works on client-side
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const locale = (pathSegments[0] || 'uz') as Locale;
      
      if (['uz', 'kr', 'ru'].includes(locale)) {
        config.headers['Accept-Language'] = locale;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * API functions for home page data
 * These will be used when backend is ready
 */
export const homeApi = {
  getHomeData: async (locale: Locale) => {
    const response = await apiClient.get('/home', {
      headers: {
        'Accept-Language': locale,
      },
    });
    return response.data;
  },
};

export default apiClient;

