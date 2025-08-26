import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function AlertDialog({ open, onClose, title, message }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '1rem'
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <WarningAmberIcon color="warning" sx={{ fontSize: '3rem', mb: 1 }} />
        <Typography variant="h5" fontWeight="bold">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: '16px 24px' }}>
        <Button onClick={onClose} variant="contained" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
