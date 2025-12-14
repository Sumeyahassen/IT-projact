import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' }
});

// Add token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getWeather = () => api.get('/weather/all');
export const getAdminDashboard = () => api.get('/admin/dashboard');
// Add more later: getPrices, postKnowledge etc.

export default api;