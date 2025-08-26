import React from 'react';
import { Typography, Box } from '@mui/material';

// Aapka original logo SVG
const LogoIcon = (props) => (
    <Box sx={{ display: 'inline-block', mb: 2 }}>
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 21.35L11.55 21.74C7.41 18.22 4 15.36 4 11.5C4 7.36 7.36 4 11.5 4C13.36 4 15.14 4.78 16.42 6.08L17.92 4.58C16.03 2.69 13.86 1.5 11.5 1.5C6.25 1.5 2 5.75 2 11.5C2 16.62 6.17 20.13 10.45 23.15L12 24.5L13.55 23.15C14.04 22.73 14.5 22.33 14.93 21.95L12 19.5V13.5L19.5 6L12 21.35Z" fill="#673ab7"/>
               <path d="M22 2L11 13" stroke="#673ab7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#673ab7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
       </Box>
);

export default function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LogoIcon />
      <Typography variant="h5" noWrap component="div" fontWeight="bold">
        TripMate
      </Typography>
    </Box>
  );
}
