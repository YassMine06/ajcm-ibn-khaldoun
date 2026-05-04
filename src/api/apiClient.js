import axios from 'axios';

/**
 * Centralized API Client
 * Uses environment variables for configuration and handles global error reporting.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (e.g., for adding Auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (for global error handling)
apiClient.interceptors.response.use(
  (response) => response.data, // Return data directly
  (error) => {
    const message = error.response?.data?.error || error.message || 'Une erreur inattendue est survenue.';
    
    // You could trigger a global notification system here (e.g., toast)
    console.error('[API Error]:', message);
    
    if (error.response?.status === 401) {
      // Handle Unauthorized (e.g., redirect to login)
      // localStorage.removeItem('user');
      // window.location.href = '/login';
    }
    
    return Promise.reject({ ...error, message });
  }
);

export default apiClient;
