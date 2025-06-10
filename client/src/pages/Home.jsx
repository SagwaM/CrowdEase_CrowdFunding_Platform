import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Box, Grid, Paper, Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import CauseCard from '../components/CauseCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Hardcoded causes data with images
  const causes = [
    {
      id: '1',
      title: 'Clean Water for Kibera',
      description: 'Help us install water purification systems in Kibera slum to provide clean drinking water for over 500 families. This project will significantly reduce waterborne diseases in the community.',
      goalAmount: 250000,
      raisedAmount: 85000,
      category: 'Health & Water',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'School Library in Mathare',
      description: 'Building a modern library for Mathare Primary School with books, computers, and study materials to improve literacy rates among 800 students in this underserved community.',
      goalAmount: 180000,
      raisedAmount: 145000,
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'Solar Power for Rural Clinic',
      description: 'Installing solar panels at Kajiado Rural Health Clinic to ensure 24/7 power supply for medical equipment and emergency services. This will serve over 2,000 residents in the area.',
      goalAmount: 320000,
      raisedAmount: 95000,
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6548?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'Youth Skills Training Center',
      description: 'Establishing a vocational training center in Kisumu for unemployed youth to learn carpentry, tailoring, and digital skills. Expected to train 200 young people annually.',
      goalAmount: 450000,
      raisedAmount: 178000,
      category: 'Skills & Employment',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop'
    },
    {
      id: '5',
      title: 'Emergency Food Relief',
      description: 'Providing emergency food supplies to families affected by drought in Turkana County. This initiative will support 150 families for three months with essential nutrition.',
      goalAmount: 120000,
      raisedAmount: 67000,
      category: 'Emergency Relief',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop'
    },
    {
      id: '6',
      title: 'Women Empowerment Program',
      description: 'Supporting women entrepreneurs in Nakuru with microfinance loans and business training. This program aims to help 100 women start or expand their small businesses.',
      goalAmount: 200000,
      raisedAmount: 134000,
      category: 'Women Empowerment',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop'
    },
  ];

  const filteredCauses = causes.filter(cause =>
    cause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cause.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cause.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowBackToTop(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #16a34a 0%, #2563eb 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" fontWeight="bold" sx={{ mb: 3 }}>
              Empower Local Communities
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}>
              Join hands with your neighbors to create lasting positive change in Kenya. 
              Every contribution matters, every cause counts.
            </Typography>
            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
              <TextField
                fullWidth
                variant="filled"
                placeholder="Search causes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'white',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'white'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white'
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ textAlign: 'center' }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <Typography variant="h3" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                  KSh 1.2M+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Total Raised
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <Typography variant="h3" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                  850+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Lives Impacted
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <Typography variant="h3" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                  {causes.length}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Active Causes
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Causes Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
              Current Causes
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto' }}>
              Support these vital community initiatives and help create positive change in local communities across Kenya.
            </Typography>
          </Box>

          {filteredCauses.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" color="text.secondary">
                No causes found matching your search.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
              {filteredCauses.map((cause) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={cause.id}>
                  <CauseCard cause={cause} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Fab
          color="primary"
          size="medium"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      )}
    </div>
  );
};

export default Home;
