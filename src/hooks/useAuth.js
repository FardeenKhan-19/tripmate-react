// ===============================================================
// src/hooks/useAuth.js
// ===============================================================
// A simple custom hook to easily access the AuthContext.
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
    return useContext(AuthContext);
};