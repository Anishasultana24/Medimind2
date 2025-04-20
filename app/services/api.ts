import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your computer's IP address
const API_URL = 'http://172.16.49.123:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
      }
    });

    // Handle specific error cases
    if (error.code === 'ECONNREFUSED') {
      return Promise.reject({ message: 'Cannot connect to server. Please check if the server is running.' });
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(error.response.data || { message: 'An error occurred' });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ message: 'No response from server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({ message: error.message || 'An error occurred' });
    }
  }
);

export const authService = {
  // Authentication methods
  register: async (userData: any) => {
    try {
      console.log('Registering user...');
      const response = await api.post('/patients/register', userData);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('Logging in...');
      const response = await api.post('/patients/login', credentials);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      console.log('Logging out...');
      await api.post('/patients/logout');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to logout');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Failed to logout');
      }
    }
  },

  getCurrentUser: async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
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

  // Prescription methods
  getPrescriptions: async () => {
    try {
      // Get current user ID from AsyncStorage
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        throw new Error('User not found');
      }
      const userId = JSON.parse(user)._id;
      
      // Get prescriptions for the current user with populated doctor details
      const response = await api.get(`/admin/prescriptions/${userId}`);
      
      // Transform the response to match the frontend interface
      const prescriptions = response.data.map((prescription: any) => ({
        _id: prescription._id,
        doctorName: prescription.doctor?.name || 'Unknown Doctor',
        disease: prescription.diseaseName,
        date: prescription.date,
        medicines: prescription.medicine.map((med: any) => ({
          name: med.name,
          dosage: med.dosage,
          frequency: med.frequency || 'As prescribed'
        })),
        instructions: prescription.treatment || 'No specific instructions',
        fileUrl: prescription.fileUrl // If you have a file URL in your prescription model
      }));
      
      return prescriptions;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch prescriptions');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Failed to fetch prescriptions');
      }
    }
  },

  downloadPrescription: async (id: string) => {
    try {
      const response = await api.get(`/admin/prescriptions/${id}/download`, {
        responseType: 'blob',
      });
      
      // Create a blob URL for the downloaded file
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `prescription-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to download prescription');
      } else if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      } else {
        throw new Error('Failed to download prescription');
      }
    }
  },

  // Medical Test Methods
  getMedicalTests: async () => {
    try {
      console.log('Fetching medical tests...');
      const response = await api.get('/admin/alltest');
      console.log('Medical tests response:', response);
      return response;
    } catch (error: any) {
      console.error('Error fetching medical tests:', error);
      throw error;
    }
  },

  bookMedicalTest: async (testId: string) => {
    try {
      const response = await api.post('/booked-tests/book', { testId });
      return { data: { success: true, message: 'Test booked successfully' } };
    } catch (error: any) {
      console.warn('Initial booking failed, retrying with date:', error.message);
      try {
        const response = await api.post('/booked-tests/book', {
          testId,
          date: new Date().toISOString(), // Retry with date
        });
        console.log('Retry successful:', response);
        return response;
      } catch (retryError: any) {
        console.error('Error retrying booking medical test:', retryError);
        throw retryError;
      }
    }
  },
  
};

export default api; 