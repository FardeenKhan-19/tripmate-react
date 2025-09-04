import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

// Hum yahan 'currencySymbol' ko as a prop le rahe hain.
// Default value '₹' set kar di hai taaki agar prop na mile toh error na aaye.
export default function ExpensesPieChart({ data, currencySymbol = '₹' }) {
    if (!data || data.length === 0) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography color="text.secondary">
                    Add some expenses to see the chart.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', height: '100%', minHeight: 300 , minWidth: 800 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius="80%"
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {/* YAHAN HUMNE '$' KI JAGAH DYNAMIC 'currencySymbol' PROP USE KIYA HAI */}
                    <Tooltip formatter={(value) => `${currencySymbol}${value.toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
}