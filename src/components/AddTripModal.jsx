import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Common currencies
const currencies = [
  { value: 'USD', label: '$', name: 'US Dollar' },
  { value: 'EUR', label: '€', name: 'Euro' },
  { value: 'JPY', label: '¥', name: 'Japanese Yen' },
  { value: 'GBP', label: '£', name: 'British Pound' },
  { value: 'INR', label: '₹', name: 'Indian Rupee' },
];

export default function AddTripModal({ open, onClose, onSave, trip }) {
    const [formData, setFormData] = useState({
        name: '',
        budget: '',
        startDate: null,
        endDate: null,
        currency: 'USD', // Default currency
    });

    const isEditMode = Boolean(trip && trip.id);

    useEffect(() => {
        if (isEditMode) {
            setFormData({
                name: trip.name,
                budget: trip.budget.toString(),
                startDate: dayjs(trip.startDate),
                endDate: dayjs(trip.endDate),
                currency: trip.currency || 'USD',
            });
        } else {
            setFormData({ name: '', budget: '', startDate: null, endDate: null, currency: 'USD' });
        }
    }, [trip, isEditMode, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name, newDate) => {
        setFormData(prev => ({ ...prev, [name]: newDate }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, budget, startDate, endDate, currency } = formData;
        if (!name || !startDate || !endDate || !budget) return;
        
        const tripData = {
            name,
            budget: Number(budget),
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            currency,
        };

        if (isEditMode) {
            onSave({ ...tripData, id: trip.id });
        } else {
            onSave(tripData);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit, sx:{ borderRadius: '20px', p: 2 } }}>
            <DialogTitle>{isEditMode ? 'Edit Trip' : 'Create a New Trip'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField autoFocus required name="name" label="Trip Name" fullWidth value={formData.name} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField required name="budget" label="Budget" type="number" fullWidth value={formData.budget} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="currency" select label="Currency" fullWidth value={formData.currency} onChange={handleChange}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label} ({option.name})
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker label="Start Date" value={formData.startDate} onChange={(d) => handleDateChange('startDate', d)} />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker label="End Date" value={formData.endDate} onChange={(d) => handleDateChange('endDate', d)} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">{isEditMode ? 'Save Changes' : 'Create Trip'}</Button>
            </DialogActions>
        </Dialog>
    );
}
