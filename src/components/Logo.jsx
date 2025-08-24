import React from 'react';
import { Box, Typography } from '@mui/material';

const Logo = ({ color = 'white' }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color }}>
            {/* New SVG logo based on your image */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M20 50 C 35 35, 45 65, 60 50 C 75 35, 85 65, 90 60 L 95 55"
                    stroke={color}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 45 L 20 50 L 25 45 Z"
                    fill={color}
                />
                <path
                    d="M90 60 L 98 58 L 95 50 Z"
                    fill={color}
                />
                <circle cx="20" cy="50" r="7" fill={color} />
            </svg>

            <Typography
                component="h1"
                variant="h4"
                sx={{ fontWeight: 'bold', letterSpacing: '1px' }}
            >
                TripMate
            </Typography>
        </Box>
    );
};

export default Logo;