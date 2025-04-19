import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Medimind Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name}!
        </Typography>
        <Typography variant="body1">
          This is your dashboard. You can manage your appointments, view prescriptions,
          and access other healthcare services here.
        </Typography>
      </Container>
    </Box>
  );
};

export default Dashboard; 