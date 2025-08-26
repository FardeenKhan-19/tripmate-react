import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

export default function ItineraryForm({ item, onSave, onClose }) {
  const [formData, setFormData] = useState({
    event: '',
    date: null,
    time: null,
    notes: ''
  });

  const isEditMode = Boolean(item && item.id);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        event: item.event,
        date: item.date ? dayjs(item.date) : null,
        time: item.time ? dayjs(`1970-01-01T${item.time}`) : null,
        notes: item.notes || ''
      });
    } else {
      setFormData({ event: '', date: null, time: null, notes: '' });
    }
  }, [item, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setFormData(prev => ({ ...prev, date: newDate }));
  };
  
  const handleTimeChange = (newTime) => {
    setFormData(prev => ({ ...prev, time: newTime }));
  };

  // === FIX STARTS HERE ===
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pehle data ko format karein
    const dataToSave = {
        event: formData.event,
        notes: formData.notes,
        date: formData.date ? formData.date.format('YYYY-MM-DD') : '',
        time: formData.time ? formData.time.format('HH:mm') : '',
    };

    // Agar edit mode hai, tabhi ID add karein
    if (isEditMode) {
        dataToSave.id = item.id;
    }

    onSave(dataToSave);
    onClose();
  };
  // === FIX ENDS HERE ===

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit, sx: { borderRadius: '20px', p: 2 } }}>
      <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.5rem' }}>
        {isEditMode ? 'Edit Itinerary Item' : 'Add Itinerary Item'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              required
              name="event"
              label="Event"
              fullWidth
              variant="outlined"
              value={formData.event}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TimePicker
              label="Time"
              value={formData.time}
              onChange={handleTimeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Notes (Optional)"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" disableElevation>{isEditMode ? 'Save Changes' : 'Add Item'}</Button>
      </DialogActions>
    </Dialog>
  );
}
