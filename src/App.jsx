import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignUpPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx';
import DashboardOverviewPage from './pages/DashboardOverviewPage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import ItineraryPage from './pages/ItineraryPage.jsx';
import ExpensesPage from './pages/ExpensesPage.jsx';

// MUI Imports for Theme
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // <-- Hamara naya theme import karein

// MUI Date Picker Setup
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    // === FIX STARTS HERE ===
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This resets default browser styles */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* --- Authentication Routes --- */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* --- Protected Dashboard Routes --- */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/trips" replace />} />
                <Route path="overview" element={<DashboardOverviewPage />} />
                <Route path="trips" element={<TripsPage />} />
                <Route path="trip/:tripId/itinerary" element={<ItineraryPage />} />
                <Route path="trip/:tripId/expenses" element={<ExpensesPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
    // === FIX ENDS HERE ===
  );
}

export default App;
