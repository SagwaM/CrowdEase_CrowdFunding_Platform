import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid, 
  Box,
  CircularProgress,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Fab,
  Alert,
  Snackbar
} from '@mui/material';
import { Favorite, Phone, Person, AttachMoney, KeyboardArrowUp, WifiOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useOfflineSync } from '../hooks/useOfflineSync';

const Donate = () => {
  const { causeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const { isOnline, pendingDonations, savePendingDonation, submitPendingDonations } = useOfflineSync();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const watchedCauseId = watch('causeId');

  // Hardcoded causes data (same as Home page)
  const causes = [
    {
      id: '1',
      title: 'Clean Water for Kibera',
      description: 'Help us install water purification systems in Kibera slum to provide clean drinking water for over 500 families.',
      goalAmount: 250000,
      raisedAmount: 85000,
      category: 'Health & Water',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'School Library in Mathare',
      description: 'Building a modern library for Mathare Primary School with books, computers, and study materials.',
      goalAmount: 180000,
      raisedAmount: 145000,
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'Solar Power for Rural Clinic',
      description: 'Installing solar panels at Kajiado Rural Health Clinic to ensure 24/7 power supply for medical equipment.',
      goalAmount: 320000,
      raisedAmount: 95000,
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6548?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'Youth Skills Training Center',
      description: 'Establishing a vocational training center in Kisumu for unemployed youth to learn various skills.',
      goalAmount: 450000,
      raisedAmount: 178000,
      category: 'Skills & Employment',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop'
    },
    {
      id: '5',
      title: 'Emergency Food Relief',
      description: 'Providing emergency food supplies to families affected by drought in Turkana County.',
      goalAmount: 120000,
      raisedAmount: 67000,
      category: 'Emergency Relief',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop'
    },
    {
      id: '6',
      title: 'Women Empowerment Program',
      description: 'Supporting women entrepreneurs in Nakuru with microfinance loans and business training.',
      goalAmount: 200000,
      raisedAmount: 134000,
      category: 'Women Empowerment',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop'
    },
  ];

  useEffect(() => {
    if (causeId) {
      const cause = causes.find(c => c.id === causeId);
      if (cause) {
        setSelectedCause(cause);
        setValue('causeId', cause.id);
      }
    }
  }, [causeId, setValue]);

  useEffect(() => {
    if (watchedCauseId && !causeId) {
      const cause = causes.find(c => c.id === watchedCauseId);
      setSelectedCause(cause);
    }
  }, [watchedCauseId, causeId]);

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

  const normalizePhoneNumber = (phone) => {
    if (phone.startsWith('0')) {
      return phone.replace(/^0/, '254');
    }
    if (phone.startsWith('+')) {
      return phone.replace(/^\+/, '');
    }
    return phone;
  };
  const onSubmit = async (data) => {
    // Prevent double submission
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      console.log('Donation data:', data);
      
      // If offline, save to localStorage
      if (!isOnline) {
        savePendingDonation(data);
        setIsLoading(false);
        return;
      }
      const normalizedPhone = normalizePhoneNumber(data.phone);
      const response = await fetch('http://localhost:5000/api/donations/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',},
      body: JSON.stringify({
        phone: normalizedPhone,
        amount: parseInt(data.amount),
        cause: selectedCause?.title || 'General Donation',
        name: data.name
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'STK push failed');
    }

    toast.success('✅ Donation successful! Check your phone to complete payment.');
      
      // Navigate to thank you page after brief delay
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
      
    } catch (error) {
      toast.error('Failed to process donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPending = async () => {
    await submitPendingDonations(onSubmit);
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    return phoneRegex.test(value) || "Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)";
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {!isOnline && (
          <Alert 
            severity="warning" 
            icon={<WifiOff />}
            sx={{ mb: 4 }}
            action={
              pendingDonations.length > 0 && (
                <Button color="inherit" size="small" onClick={handleSubmitPending}>
                  Submit Pending ({pendingDonations.length})
                </Button>
              )
            }
          >
            You are offline. Donations will be saved and submitted when connection is restored.
          </Alert>
        )}

        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            p: 4,
            background: 'linear-gradient(135deg, #16a34a 0%, #2563eb 100%)',
            borderRadius: 3,
            color: 'white'
          }}
        >
          <Box sx={{ animation: 'pulse 2s infinite' }}>
            <Favorite sx={{ fontSize: 56, mb: 2 }} />
          </Box>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
            Make a Donation
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Your contribution will make a real difference in someone's life
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={4} sx={{ maxWidth: selectedCause ? '100%' : '800px' }}>
            {/* Selected Cause Info */}
            {selectedCause && (
              <Grid item xs={12} lg={6}>
                <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                  <Box
                    component="img"
                    height="200"
                    width="100%"
                    src={selectedCause.image}
                    alt={selectedCause.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                        {selectedCause.title}
                      </Typography>
                      <Chip 
                        label={selectedCause.category} 
                        sx={{ 
                          backgroundColor: 'primary.main',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {selectedCause.description}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Raised
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          KSh {selectedCause.raisedAmount.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Goal
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          KSh {selectedCause.goalAmount.toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Donation Form */}
            <Grid item xs={12} lg={selectedCause ? 6 : 12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ borderRadius: 3, width: '100%', maxWidth: selectedCause ? 'none' : '600px' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                      Donation Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                      Fill in your details to complete the donation
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {/* Cause Selection Dropdown - Only show if no cause is preselected */}
                      {!causeId && (
                        <FormControl fullWidth error={!!errors.causeId}>
                          <InputLabel>Select a Cause</InputLabel>
                          <Select
                            label="Select a Cause"
                            {...register('causeId', { required: 'Please select a cause' })}
                            defaultValue=""
                          >
                            {causes.map((cause) => (
                              <MenuItem key={cause.id} value={cause.title}>
                                <Box>
                                  <Typography variant="body1" fontWeight="600">
                                    {cause.title}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {cause.category}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.causeId && (
                            <FormHelperText>{errors.causeId.message}</FormHelperText>
                          )}
                        </FormControl>
                      )}

                      {/* Name Field */}
                      <TextField
                        fullWidth
                        label="Full Name"
                        placeholder="Enter your full name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                        {...register('name', { 
                          required: 'Name is required',
                          minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />

                      <TextField
                        fullWidth
                        label="M-Pesa Phone Number"
                        placeholder="0712345678 or +254712345678"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          ),
                        }}
                        {...register('phone', { 
                          required: 'Phone number is required',
                          validate: validatePhoneNumber
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message || "You will receive an M-Pesa payment prompt on this number"}
                      />

                      <TextField
                        fullWidth
                        type="number"
                        label="Donation Amount (KSh)"
                        placeholder="Enter amount (minimum KSh 10)"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoney />
                            </InputAdornment>
                          ),
                        }}
                        {...register('amount', { 
                          required: 'Amount is required',
                          min: { value: 10, message: 'Minimum donation is KSh 10' },
                          max: { value: 1000000, message: 'Maximum donation is KSh 1,000,000' }
                        })}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                      />

                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Optional Message"
                        placeholder="Leave a message of support (optional)"
                        {...register('message')}
                      />

                      {/* Submit Button */}
                      <LoadingButton
                        type="submit"
                        loading={isLoading}
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isLoading}
                        sx={{ 
                          py: 2, 
                          fontSize: '1.1rem', 
                          fontWeight: 700,
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #16a34a, #22c55e)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #15803d, #16a34a)',
                          },
                          '&:disabled': {
                            background: '#cccccc',
                          }
                        }}
                      >
                        {isLoading ? 'Processing...' : isOnline ? 'Donate Now' : 'Save Offline'}
                      </LoadingButton>

                      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.4 }}>
                        By clicking "Donate Now", you agree to our terms and conditions.
                        Your donation will be processed securely through M-Pesa.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccessSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSuccessSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            ✅ Donation successful! SMS sent to your phone.
          </Alert>
        </Snackbar>

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
      </Container>
    </div>
  );
};

export default Donate;