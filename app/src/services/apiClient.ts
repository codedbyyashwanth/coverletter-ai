import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// Create an axios instance with default configs
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // You can add auth token here if needed in the future
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
    (response: unknown) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle specific error statuses
        const status = error.response?.status;
        
        if (status === 401) {
        // Handle unauthorized
        console.error('Unauthorized access');
        } else if (status === 403) {
        // Handle forbidden
        console.error('Forbidden access');
        } else if (status === 404) {
        // Handle not found
        console.error('Resource not found');
        } else if (status === 500) {
        // Handle server error
        console.error('Server error occurred');
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;