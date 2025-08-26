import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Box
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Humne 'export default' ka istemal kiya hai
export default function ConfirmationModal({ open, onClose, onConfirm, title, message }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '1rem',
          minWidth: '320px',
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', p: 2 }}>
        <WarningAmberIcon color="error" sx={{ fontSize: '3.5rem', mb: 1 }} />
        <Typography variant="h5" fontWeight="bold">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: '16px 24px', gap: 1 }}>
        <Button onClick={onClose} variant="outlined" fullWidth>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" autoFocus fullWidth>
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
