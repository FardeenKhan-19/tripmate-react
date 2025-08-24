import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; // Import SignUpPage
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Import ForgotPasswordPage
import DashboardLayout from './pages/DashboardLayout';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Protected Route */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        {/* Add your nested dashboard routes here later */}
                        {/* e.g., <Route path="overview" element={<OverviewPage />} /> */}
                    </Route>

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
