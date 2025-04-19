import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const currentDoctor = authService.getCurrentDoctor();
    const currentAdmin = authService.getCurrentAdmin();

    setUser(currentUser);
    setDoctor(currentDoctor);
    setAdmin(currentAdmin);
    setLoading(false);
  }, []);

  const loginPatient = async (credentials) => {
    try {
      const response = await authService.loginPatient(credentials);
      setUser(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerPatient = async (patientData) => {
    try {
      const response = await authService.registerPatient(patientData);
      setUser(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginDoctor = async (credentials) => {
    try {
      const response = await authService.loginDoctor(credentials);
      setDoctor(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginAdmin = async (credentials) => {
    try {
      const response = await authService.loginAdmin(credentials);
      setAdmin(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logoutPatient();
      setUser(null);
      setDoctor(null);
      setAdmin(null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    doctor,
    admin,
    loading,
    loginPatient,
    registerPatient,
    loginDoctor,
    loginAdmin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 