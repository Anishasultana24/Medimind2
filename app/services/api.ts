import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace this with your computer's IP address
const API_URL = 'http://172.16.49.123:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add token to requests if it exists
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    dateOfBirth: string;
  }) => {
    try {
      console.log('Sending registration request to:', API_URL);
      console.log('Registration data:', userData);
      const response = await api.post('/patients/register', userData);
      console.log('Registration response:', response.data);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error);
      if (error.code === 'ECONNREFUSED') {
        throw { message: 'Cannot connect to server. Please check if the server is running.' };
      }
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/patients/login', credentials);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  logout: async () => {
    try {
      await api.post('/patients/logout');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error: any) {
      throw error.response?.data || { message: 'Logout failed' };
    }
  },

  getCurrentUser: async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Doctor-related endpoints
  getDoctors: async () => {
    try {
      console.log('Fetching doctors from:', `${API_URL}/doctors/all-doctors`);
      const response = await api.get('/doctors/all-doctors');
      console.log('Doctors response:', response.data);
      return response;
    } catch (error: any) {
      console.error('Error fetching doctors:', error);
      throw error.response?.data || { message: 'Failed to fetch doctors' };
    }
  },

  getDoctorById: async (doctorId: string) => {
    try {
      const response = await api.get(`/doctors/${doctorId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch doctor details' };
    }
  },

  getDoctorsBySpecialization: async (specialization: string) => {
    try {
      const response = await api.get(`/doctors/specialization/${specialization}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch doctors by specialization' };
    }
  },
};

export default api; 