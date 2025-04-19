import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authService = {
  // Patient Authentication
  registerPatient: async (patientData) => {
    try {
      const response = await axios.post(`${API_URL}/patients/register`, patientData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  loginPatient: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/patients/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logoutPatient: async () => {
    try {
      await axios.post(`${API_URL}/patients/logout`);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      throw error.response.data;
    }
  },

  // Doctor Authentication
  loginDoctor: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/doctors/login`, credentials);
      if (response.data) {
        localStorage.setItem('doctorToken', response.data.token);
        localStorage.setItem('doctor', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Admin Authentication
  loginAdmin: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, credentials);
      if (response.data) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getCurrentDoctor: () => {
    const doctor = localStorage.getItem('doctor');
    return doctor ? JSON.parse(doctor) : null;
  },

  getCurrentAdmin: () => {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  },

  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}; 