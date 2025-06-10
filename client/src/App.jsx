
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import ThankYou from './pages/ThankYou';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import Login from './pages/Login';
import './App.css';
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
    <CustomThemeProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/donate/:causeId" element={<Donate />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/login" element={<Login />} />
              </Routes>
            </Box>
            <Footer />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Box>
        </Router>
      </QueryClientProvider>
    </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;