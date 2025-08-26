import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Grid,
    InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const categories = ['Food', 'Transport', 'Lodging', 'Entertainment', 'Shopping', 'Other'];
const currencies = [
  { value: 'USD', label: '$' }, { value: 'EUR', label: '€' },
  { value: 'JPY', label: '¥' }, { value: 'GBP', label: '£' },
  { value: 'INR', label: '₹' },
];

const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find(c => c.value === currencyCode);
    return currency ? currency.label : '$';
}

export default function ExpenseForm({ expense, onSave, onClose, tripCurrency }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Other',
    date: null
  });

  const isEditMode = Boolean(expense && expense.id);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        description: expense.description,
        amount: expense.amount.toString(),
        category: expense.category,
        date: expense.date ? dayjs(expense.date) : null
      });
    } else {
      setFormData({ description: '', amount: '', category: 'Other', date: null });
    }
  }, [expense, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setFormData(prev => ({ ...prev, date: newDate }));
  };

  // === FIX STARTS HERE ===
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSave = {
        description: formData.description,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date ? formData.date.format('YYYY-MM-DD') : '',
    };

    if (isEditMode) {
        dataToSave.id = expense.id;
    }
    
    onSave(dataToSave);
    onClose();
  };
  // === FIX ENDS HERE ===

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit, sx: { borderRadius: '20px', p: 2 } }}>
      <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.5rem' }}>
        {isEditMode ? 'Edit Expense' : 'Add New Expense'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField autoFocus required name="description" label="Description" fullWidth value={formData.description} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              name="amount"
              label="Amount"
              type="number"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">{getCurrencySymbol(tripCurrency)}</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField required name="category" select label="Category" fullWidth value={formData.category} onChange={handleChange}>
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <DatePicker label="Date" value={formData.date} onChange={handleDateChange} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" disableElevation>{isEditMode ? 'Save Changes' : 'Add Expense'}</Button>
      </DialogActions>
    </Dialog>
  );
}
