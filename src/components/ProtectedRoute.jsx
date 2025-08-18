// ===============================================================
// src/components/ProtectedRoute.jsx
// ===============================================================
// This component will protect routes that require a user to be logged in.

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // If no user is logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;