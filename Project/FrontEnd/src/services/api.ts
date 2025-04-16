import axios from 'axios';

// Create axios instance with default config
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: { username?: string; email?: string }) =>
    api.put('/auth/profile', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/auth/change-password', data),
};

// Problems API
export const problemsAPI = {
  getAll: (params?: {
    category?: string;
    difficulty?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get('/problems', { params }),
  getById: (id: string) => api.get(`/problems/${id}`),
  submitSolution: (id: string, data: { code: string; language: string }) =>
    api.post(`/problems/${id}/submit`, data),
  getSubmissions: (id: string) => api.get(`/problems/${id}/submissions`),
  getStats: (id: string) => api.get(`/problems/${id}/stats`),
};

// Interview Questions API
export const interviewQuestionsAPI = {
  getAll: (params?: {
    category?: string;
    difficulty?: string;
    company?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get('/interview-questions', { params }),
  getById: (id: string) => api.get(`/interview-questions/${id}`),
  submitAnswer: (id: string, data: { answer: string }) =>
    api.post(`/interview-questions/${id}/submit`, data),
  getResponses: (id: string) => api.get(`/interview-questions/${id}/responses`),
  getStats: (id: string) => api.get(`/interview-questions/${id}/stats`),
  getByCompany: (company: string) =>
    api.get(`/interview-questions/company/${company}`),
  getByCategory: (category: string) =>
    api.get(`/interview-questions/category/${category}`),
};

export default api; 