import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  FormHelperText, 
  Button, 
  Tabs, 
  Tab, 
  IconButton,
  Pagination,
  Chip,
  CircularProgress,
  useTheme,
  Fab,
  AppBar,
  Toolbar,
  Badge,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Download, 
  Search, 
  Dashboard, 
  TrendingUp, 
  People, 
  AttachMoney,
  KeyboardArrowUp,
  Undo,
  Notifications,
  AccountCircle,
  Logout,
  Settings,
  Email
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-toastify';
import fileDownload from 'js-file-download';
import AdminLogin from '../components/AdminLogin';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCause, setSelectedCause] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [analytics, setAnalytics] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [refundSnackbar, setRefundSnackbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();

  const itemsPerPage = 10;

  // Mock data for donations with refund capability
  const mockDonations = [
    {
      id: 1,
      donorName: 'John Doe',
      email: 'john@example.com',
      amount: 5000,
      cause: 'Clean Water for Kibera',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      donorName: 'Jane Smith',
      email: 'jane@example.com',
      amount: 2500,
      cause: 'School Library in Mathare',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      donorName: 'Michael Johnson',
      email: 'michael@example.com',
      amount: 7500,
      cause: 'Solar Power for Rural Clinic',
      date: '2024-01-13',
      status: 'refunded'
    },
    {
      id: 4,
      donorName: 'Sarah Wilson',
      email: 'sarah@example.com',
      amount: 3000,
      cause: 'Youth Skills Training Center',
      date: '2024-01-12',
      status: 'completed'
    },
    {
      id: 5,
      donorName: 'David Brown',
      email: 'david@example.com',
      amount: 4000,
      cause: 'Emergency Food Relief',
      date: '2024-01-11',
      status: 'completed'
    }
  ];

  const mockAnalytics = {
    totalAmount: 48500,
    totalDonors: 8,
    totalDonations: 6,
    averageDonation: 8083,
    monthlyGrowth: {
      totalAmount: 12,
      totalDonors: 5,
      totalDonations: 8,
      averageDonation: 3
    },
    topCauses: [
      { name: 'Clean Water for Kibera', amount: 35000 },
      { name: 'School Library in Mathare', amount: 28000 },
      { name: 'Solar Power for Rural Clinic', amount: 25000 },
      { name: 'Youth Skills Training Center', amount: 22000 },
      { name: 'Emergency Food Relief', amount: 15000 }
    ]
  };

  const causes = [
    'Clean Water for Kibera',
    'School Library in Mathare',
    'Solar Power for Rural Clinic',
    'Youth Skills Training Center',
    'Emergency Food Relief',
    'Women Empowerment Program'
  ];

  useEffect(() => {
    // Check if admin is already logged in
    const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    loadDonations();
    loadAnalytics();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, searchTerm, selectedCause]);

  const loadDonations = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setDonations(mockDonations);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load donations');
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      setAnalytics(mockAnalytics);
    } catch (error) {
      toast.error('Failed to load analytics');
    }
  };

  const filterDonations = () => {
    let filtered = donations;

    if (searchTerm) {
      filtered = filtered.filter(donation =>
        donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCause) {
      filtered = filtered.filter(donation => donation.cause === selectedCause);
    }

    setFilteredDonations(filtered);
    setCurrentPage(1);
  };

  const handleExportCSV = async () => {
    try {
      const csvContent = [
        'Donor Name,Email,Amount,Cause,Date,Status',
        ...filteredDonations.map(d => 
          `${d.donorName},${d.email},${d.amount},${d.cause},${d.date},${d.status}`
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      fileDownload(blob, 'donations.csv');
      toast.success('Donations exported successfully!');
    } catch (error) {
      toast.error('Failed to export donations');
    }
  };

  const handleRefund = async (donationId) => {
    try {
      const updatedDonations = donations.map(donation => 
        donation.id === donationId 
          ? { ...donation, status: 'refunded' }
          : donation
      );
      
      setDonations(updatedDonations);
      setRefundSnackbar(true);
    } catch (error) {
      toast.error('Failed to process refund');
    }
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowBackToTop(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
    toast.info('Logged out successfully');
    handleProfileMenuClose();
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const COLORS = ['#16a34a', '#2563eb', '#dc2626', '#ca8a04', '#9333ea'];

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Admin Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: 'background.paper', color: 'text.primary', boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Welcome, Admin
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton
              size="large"
              color="inherit"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            {/* Profile Menu */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Notification Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationMenuClose}
        PaperProps={{
          sx: { width: 300, maxHeight: 400 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold">Notifications</Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            New donation received from John Doe
          </Typography>
          <Typography variant="caption" color="text.secondary">2 minutes ago</Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Monthly report is ready
          </Typography>
          <Typography variant="caption" color="text.secondary">1 hour ago</Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            New cause added successfully
          </Typography>
          <Typography variant="caption" color="text.secondary">3 hours ago</Typography>
        </Box>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle1" fontWeight="bold">Admin User</Typography>
          <Typography variant="body2" color="text.secondary">admin@communityfund.org</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, flex: 1 }}>
        <Box sx={{ mb: { xs: 2, md: 4 } }}>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, color: 'primary.main' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage donations and view analytics
          </Typography>
        </Box>

        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: { xs: 2, md: 4 } }}>
          <Tab icon={<Dashboard />} label="Analytics" />
          <Tab icon={<AttachMoney />} label="Donations" />
        </Tabs>

        {tabValue === 0 && analytics && (
          <Box>
            {/* Analytics Cards - Enhanced like the photo */}
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, p: 3, textAlign: 'center', height: 140 }}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Total Raised
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      KSh {analytics.totalAmount.toLocaleString()}
                    </Typography>
                    <AttachMoney sx={{ color: 'primary.main', fontSize: 32 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                    +{analytics.monthlyGrowth.totalAmount}% from last month
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, p: 3, textAlign: 'center', height: 140 }}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Total Donors
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {analytics.totalDonors}
                    </Typography>
                    <People sx={{ color: 'primary.main', fontSize: 32 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                    +{analytics.monthlyGrowth.totalDonors}% from last month
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, p: 3, textAlign: 'center', height: 140 }}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Total Donations
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {analytics.totalDonations}
                    </Typography>
                    <TrendingUp sx={{ color: 'primary.main', fontSize: 32 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                    +{analytics.monthlyGrowth.totalDonations}% from last month
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 3, p: 3, textAlign: 'center', height: 140 }}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Average Donation
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      KSh {analytics.averageDonation.toLocaleString()}
                    </Typography>
                    <TrendingUp sx={{ color: 'primary.main', fontSize: 32 }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                    +{analytics.monthlyGrowth.averageDonation}% from last month
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Charts - Full width and below stats */}
            <Grid container spacing={{ xs: 2, md: 4 }}>
              <Grid item xs={12} lg={8}>
                <Card sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, height: 500 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Top Causes by Amount
                  </Typography>
                  <ResponsiveContainer width={600} height={400}>
                    <BarChart data={analytics.topCauses} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                        fontSize={11}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Card sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, height: 500 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                    Cause Distribution
                  </Typography>
                  <ResponsiveContainer width={600} height={400}>
                    <PieChart>
                      <Pie
                        data={analytics.topCauses}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="amount"
                        label={(entry) => `${entry.name.split(' ')[0]}...`}
                      >
                        {analytics.topCauses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            {/* Filters */}
            <Card sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, mb: { xs: 2, md: 4 } }}>
              <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search by donor name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Filter by Cause</InputLabel>
                    <Select
                      value={selectedCause}
                      label="Filter by Cause"
                      onChange={(e) => setSelectedCause(e.target.value)}
                    >
                      <MenuItem value="">All Causes</MenuItem>
                      {causes.map((cause) => (
                        <MenuItem key={cause} value={cause}>{cause}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    onClick={handleExportCSV}
                    fullWidth
                    sx={{ py: 2 }}
                  >
                    Export CSV
                  </Button>
                </Grid>
                
                <Grid item xs={12} md={2}>
                  <Typography variant="body2" color="text.secondary">
                    {filteredDonations.length} donation(s) found
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            {/* Donations Table */}
            <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ overflowX: 'auto' }}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: 'primary.main' }}>
                      <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Donor Name</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cause</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedDonations.map((donation) => (
                        <TableRow key={donation.id} hover>
                          <TableCell fontWeight="600">{donation.donorName}</TableCell>
                          <TableCell sx={{ wordBreak: 'break-word' }}>{donation.email}</TableCell>
                          <TableCell>
                            <Typography fontWeight="bold" color="primary">
                              KSh {donation.amount.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ maxWidth: 200, wordWrap: 'break-word' }}>
                            {donation.cause}
                          </TableCell>
                          <TableCell>{donation.date}</TableCell>
                          <TableCell>
                            <Chip 
                              label={donation.status} 
                              color={donation.status === 'refunded' ? 'warning' : 'success'} 
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            {donation.status === 'completed' && (
                              <IconButton
                                onClick={() => handleRefund(donation.id)}
                                color="warning"
                                size="small"
                                sx={{
                                  '&:hover': {
                                    backgroundColor: 'warning.light',
                                    color: 'white'
                                  }
                                }}
                              >
                                <Undo />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Box>
              
              {!loading && filteredDonations.length > itemsPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <Pagination
                    count={Math.ceil(filteredDonations.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(e, page) => setCurrentPage(page)}
                    color="primary"
                  />
                </Box>
              )}
            </Card>
          </Box>
        )}

        {/* Refund Success Snackbar */}
        <Snackbar
          open={refundSnackbar}
          autoHideDuration={6000}
          onClose={() => setRefundSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setRefundSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Refund processed successfully!
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
    </Box>
  );
};

export default AdminDashboard;