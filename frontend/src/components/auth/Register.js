import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    dateOfBirth: '',
  });
  const [error, setError] = useState('');
  const { registerPatient } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerPatient(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Patient Registration
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone Number"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            id="dateOfBirth"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 