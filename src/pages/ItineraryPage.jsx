import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useParams } from 'react-router-dom';
import * as firestoreService from '../services/firestoreService';
import { useAuth } from '../hooks/useAuth.js';
import ItineraryForm from '../components/ItineraryForm.jsx';
import Timeline from '../components/ui/Timeline.jsx';
import ConfirmationModal from '../components/ui/ConfirmationModal.jsx';
import AlertDialog from '../components/ui/AlertDialog.jsx'; // Alert ke liye

export default function ItineraryPage() {
  const { tripId } = useParams();
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [tripDetails, setTripDetails] = useState(null); // Trip details ke liye state
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [dateError, setDateError] = useState(false); // Date error ke liye state

  useEffect(() => {
    if (currentUser && tripId) {
      const unsubscribe = firestoreService.getItineraryItemsStream(
        currentUser.uid, tripId,
        (itineraryItems) => {
          const sortedItems = [...itineraryItems].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
          setItems(sortedItems);
        },
        (error) => console.error("Error fetching itinerary:", error)
      );
      
      const fetchTripDetails = async () => {
        const details = await firestoreService.getTripDetails(currentUser.uid, tripId);
        setTripDetails(details);
        setIsLoading(false);
      };
      fetchTripDetails();

      return () => unsubscribe();
    }
  }, [currentUser, tripId]);

  const handleOpenModal = (item = null) => {
    setCurrentItem(item || { event: '', date: '', time: '', notes: '' });
    setIsModalOpen(true);
  };

  const handleSaveItem = async (itemData) => {
    // Date validation logic
    const itemDate = new Date(itemData.date);
    const startDate = new Date(tripDetails.startDate);
    const endDate = new Date(tripDetails.endDate);

    if (itemDate < startDate || itemDate > endDate) {
      setDateError(true);
      return; // Save hone se rokein
    }

    try {
      await firestoreService.saveItineraryItem(currentUser.uid, tripId, itemData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving itinerary item:", error);
    }
  };

  const handleDeleteRequest = (item) => setItemToDelete(item);

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await firestoreService.deleteItineraryItem(currentUser.uid, tripId, itemToDelete.id);
        setItemToDelete(null);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EventNoteIcon sx={{ fontSize: '2.5rem', color: 'primary.main' }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #673ab7 30%, #f50057 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Trip Itinerary
                </Typography>
            </Box>
            <Button variant="contained" disableElevation startIcon={<AddCircleOutlineIcon />} onClick={() => handleOpenModal()}>Add Item</Button>
        </Box>
        {items.length === 0 ? (
            <Box sx={{ textAlign: 'center', mt: 8 }}><Typography color="text.secondary">No itinerary items yet.</Typography></Box>
        ) : (
            <Timeline items={items} onEdit={handleOpenModal} onDelete={handleDeleteRequest} />
        )}
        {isModalOpen && <ItineraryForm item={currentItem} onSave={handleSaveItem} onClose={() => setIsModalOpen(false)} />}
        {itemToDelete && <ConfirmationModal open={!!itemToDelete} onClose={() => setItemToDelete(null)} onConfirm={confirmDelete} title="Confirm Deletion" message={`Delete "${itemToDelete.event}"?`} />}
        <AlertDialog open={dateError} onClose={() => setDateError(false)} title="Invalid Date" message={`Please select a date between ${tripDetails?.startDate} and ${tripDetails?.endDate}.`} />
    </Box>
  );
}
