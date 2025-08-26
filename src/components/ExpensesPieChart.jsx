import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

const ExpensesPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">No Expense Data</Typography>
            <Typography variant="body2" color="text.secondary">Add some expenses to see the chart.</Typography>
        </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%', width :'350%' ,display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" sx={{ mb: 1, textAlign: 'center', flexShrink: 0 }}>
            Expenses by Category
        </Typography>
        <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
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
                    <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    </Paper>
  );
};

export default ExpensesPieChart;