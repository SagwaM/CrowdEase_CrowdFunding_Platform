import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab
} from '@mui/material';
import { 
  CheckCircle, 
  Favorite, 
  Home, 
  Share,
  FiberManualRecord,
  KeyboardArrowUp
} from '@mui/icons-material';

const ThankYou = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          {/* Success Animation */}
          <Box sx={{ mb: 4, position: 'relative' }}>
            <Box 
              sx={{ 
                width: 120, 
                height: 120, 
                mx: 'auto', 
                background: 'linear-gradient(135deg, #22c55e, #16a34a)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 3,
                animation: 'pulse 2s infinite',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)'
              }}
            >
              <CheckCircle sx={{ fontSize: 60, color: 'white' }} />
            </Box>
            
            {/* Floating hearts animation */}
            <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <Favorite 
                sx={{ 
                  fontSize: 20, 
                  color: '#ef4444', 
                  position: 'absolute', 
                  top: 32, 
                  left: '25%',
                  animation: 'bounce 2s infinite',
                  animationDelay: '0.5s'
                }} 
              />
              <Favorite 
                sx={{ 
                  fontSize: 16, 
                  color: '#ec4899', 
                  position: 'absolute', 
                  top: 48, 
                  right: '25%',
                  animation: 'bounce 2s infinite',
                  animationDelay: '1s'
                }} 
              />
              <Favorite 
                sx={{ 
                  fontSize: 24, 
                  color: '#f87171', 
                  position: 'absolute', 
                  bottom: 32, 
                  left: '33%',
                  animation: 'bounce 2s infinite',
                  animationDelay: '1.5s'
                }} 
              />
            </Box>
          </Box>

          {/* Main Message */}
          <Typography variant="h2" fontWeight="bold" sx={{ mb: 2, color: 'primary.main' }}>
            Thank You!
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
            Your generous donation will make a real difference in our community
          </Typography>

          {/* Information Card */}
          <Card sx={{ mb: 6, textAlign: 'left', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: 'primary.main' }}>
                What happens next?
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: 12, color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="You will receive an M-Pesa confirmation message within the next few minutes"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: 12, color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Your donation will be transferred directly to the cause organizers"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <FiberManualRecord sx={{ fontSize: 12, color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="You'll receive updates on how your contribution is making an impact"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Call to Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center', mb: 6 }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              startIcon={<Home />}
              sx={{ 
                px: 4, 
                py: 2, 
                fontSize: '1.1rem', 
                fontWeight: 700,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #16a34a, #22c55e)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #15803d, #16a34a)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Back to Home
            </Button>
            
            <Button 
              variant="outlined" 
              size="large"
              startIcon={<Share />}
              sx={{ 
                px: 4, 
                py: 2, 
                fontSize: '1.1rem', 
                fontWeight: 700,
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'CommunityFund',
                    text: 'I just made a donation to support local causes! Join me in making a difference.',
                    url: window.location.origin,
                  });
                } else {
                  const text = `I just made a donation to support local causes! Join me in making a difference. ${window.location.origin}`;
                  navigator.clipboard.writeText(text);
                }
              }}
            >
              Share Your Impact
            </Button>
          </Box>

          {/* Encouraging Message */}
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #f0fdf4, #eff6ff)',
              p: 4,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h6" color= "info" backgroundColor= 'rgba(37, 77, 53, 0.8)' sx={{ fontStyle: 'italic', mb: 2, lineHeight: 1.6, padding: '16px', borderRadius: '8px' }}>
              "Every act of kindness, no matter how small, makes the world a little brighter. 
              Thank you for being part of positive change in our community."
            </Typography>
            <Typography variant="h6" fontWeight="700" color="primary">
              - CommunityFund Team
            </Typography>
          </Card>

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
        </Box>
      </Container>
    </div>
  );
};

export default ThankYou;
