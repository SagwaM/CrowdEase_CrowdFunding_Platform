import { Link, useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Favorite, Home, AdminPanelSettings } from '@mui/icons-material';
import DarkModeToggle from './DarkModeToggle';
import MobileMenu from './MobileMenu';
import { useAuth } from '../contexts/AuthContext';


const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <AppBar position="sticky" sx={{ width: '100vw', backgroundColor: 'background.paper', color: 'text.primary', boxShadow: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Mobile Menu */}
        <MobileMenu />
        
        {/* Brand */}
        <Button
          component={Link}
          to="/"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'primary.dark'
            }
          }}
        >
          <Favorite sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">
            CrowdEase
          </Typography>
        </Button>
        
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<Home />}
            variant={location.pathname === '/' ? 'contained' : 'text'}
            color="primary"
            sx={{ 
              color: location.pathname === '/' ? 'white' : 'text.secondary',
              backgroundColor: location.pathname === '/' ? 'primary.main' : 'transparent'
            }}
          >
            Home
          </Button>
          
          <Button
            onClick={handleAdminClick}
            startIcon={<AdminPanelSettings />}
            variant={location.pathname === '/admin' ? 'contained' : 'text'}
            color="primary"
            sx={{ 
              color: location.pathname === '/admin' ? 'white' : 'text.secondary',
              backgroundColor: location.pathname === '/admin' ? 'primary.main' : 'transparent'
            }}
          >
            Admin
          </Button>
          <Button
            component={Link}
            to="/donate"
            variant="contained"
            color="primary"
          >
            Donate Now
          </Button>
          
          <DarkModeToggle />
        </Box>

        {/* Mobile Dark Mode Toggle */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <DarkModeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;