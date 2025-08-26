import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const SummaryCard = ({ title, value, icon, color }) => {
    return (
        <Card elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 3, height: '100%' }}>
            <Box sx={{
                p: 2.5,
                mr: 2,
                backgroundColor: color || 'primary.main',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 3
            }}>
                {icon}
            </Box>
            <Box>
                <Typography color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" component="div" fontWeight="bold">
                    {value}
                </Typography>
            </Box>
        </Card>
    );
};

export default SummaryCard;