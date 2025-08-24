// ===============================================================
// 1. UPDATE THIS FILE: src/theme.js
// ===============================================================
// This file defines the color palette, typography, and overall
// look and feel for your entire application.

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#8B5CF6', // A vibrant violet for primary actions
        },
        secondary: {
            main: '#6D28D9', // A deeper violet for secondary elements
        },
        background: {
            default: '#F5F3FF', // A very light lavender for the page background
            paper: '#FFFFFF',   // White for cards and surfaces
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        button: {
            textTransform: 'none', // Buttons will use normal case, not all-caps
            fontWeight: 600,
        }
    },
    shape: {
        borderRadius: 7, // A modern, slightly rounded corner for a rectangular feel
    },
});