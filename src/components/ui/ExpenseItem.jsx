import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const currencies = [
  { value: 'USD', label: '$' }, { value: 'EUR', label: '€' },
  { value: 'JPY', label: '¥' }, { value: 'GBP', label: '£' },
  { value: 'INR', label: '₹' },
];

const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find(c => c.value === currencyCode);
    return currency ? currency.label : '$';
}

export default function ExpenseItem({ expense, onEdit, onDelete, tripCurrency }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1.5,
        mb: 1,
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        backgroundColor: '#fff',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transform: 'scale(1.02)'
        },
        transition: 'transform 0.2s'
      }}
    >
      <Box>
        <Typography variant="body1" fontWeight="500">
          {getCurrencySymbol(tripCurrency)}{Number(expense.amount).toFixed(2)} - {expense.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {expense.category} on {expense.date}
        </Typography>
      </Box>
      <Box>
        <IconButton size="small" onClick={onEdit} color="secondary">
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={onDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
