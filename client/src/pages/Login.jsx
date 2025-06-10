import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert 
} from '@mui/material';
import { Shield, Login } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = login(username, password);
    
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', py: 6 }}>
      <Paper elevation={6} sx={{ width: '100%', p: 6, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              backgroundColor: 'primary.light', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 3
            }}
          >
            <Shield sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            Admin Login
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Access the admin dashboard to manage donations and view analytics
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
            startIcon={<Login />}
            sx={{ 
              py: 1.5, 
              fontSize: '1.1rem', 
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>

        <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Demo Credentials:<br />
            Username: <strong>admin</strong><br />
            Password: <strong>admin123</strong>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;