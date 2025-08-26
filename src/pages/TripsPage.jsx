import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardActions, CircularProgress, IconButton, Grow } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import * as firestoreService from '../services/firestoreService';
import AddTripModal from '../components/AddTripModal.jsx';
import ConfirmationModal from '../components/ui/ConfirmationModal.jsx';
import FlightIcon from '@mui/icons-material/Flight';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const currencies = [
  { value: 'USD', label: '$' }, { value: 'EUR', label: '€' },
  { value: 'JPY', label: '¥' }, { value: 'GBP', label: '£' },
  { value: 'INR', label: '₹' },
];

const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find(c => c.value === currencyCode);
    return currency ? currency.label : '$';
}

export default function TripsPage() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTrip, setCurrentTrip] = useState(null);
    const [tripToDelete, setTripToDelete] = useState(null);

    const fetchTrips = async () => {
        if (currentUser) {
            setIsLoading(true);
            const userTrips = await firestoreService.getTrips(currentUser.uid);
            setTrips(userTrips);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, [currentUser]);

    const handleOpenModal = (trip = null) => {
        setCurrentTrip(trip);
        setIsModalOpen(true);
    };

    const handleSaveTrip = async (tripData) => {
        if (!currentUser) return;
        setIsModalOpen(false);
        try {
            if (tripData.id) {
                await firestoreService.updateTrip(currentUser.uid, tripData.id, tripData);
            } else {
                await firestoreService.createTrip(currentUser.uid, tripData);
            }
            await fetchTrips();
        } catch (error) {
            console.error("Failed to save trip:", error);
        }
    };

    const handleDeleteRequest = (trip) => {
        setTripToDelete(trip);
    };

    const confirmDelete = async () => {
        if (tripToDelete) {
            try {
                await firestoreService.deleteTrip(currentUser.uid, tripToDelete.id);
                setTrips(prev => prev.filter(t => t.id !== tripToDelete.id));
                setTripToDelete(null);
            } catch (error) {
                console.error("Failed to delete trip:", error);
            }
        }
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FlightTakeoffIcon sx={{ fontSize: '2.5rem', color: 'primary.main' }} />
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        sx={{
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #673ab7 30%, #f50057 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        My Trips
                    </Typography>
                </Box>
                <Button variant="contained" disableElevation startIcon={<AddCircleOutlineIcon />} onClick={() => handleOpenModal()}>Add New Trip</Button>
            </Box>

            {trips.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <FlightIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                    <Typography variant="h6" color="text.secondary" mt={2}>No trips planned yet.</Typography>
                    <Typography color="text.secondary">Click "Add New Trip" to start your next adventure!</Typography>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {trips.map((trip, index) => (
                        <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 300 * (index + 1) }} key={trip.id}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ 
                                    minHeight: 250,
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    color: 'white',
                                    borderRadius: '20px',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    // === FIX STARTS HERE ===
                                    background: 'linear-gradient(135deg, #673ab7 0%, #f50057 100%)',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 20px 40px -10px rgba(103, 58, 183, 0.5)',
                                    },
                                    // === FIX ENDS HERE ===
                                }}>
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Box>
                                                <Typography variant="h4" component="h2" fontWeight="bold">{trip.name}</Typography>
                                                <Typography variant="body1" sx={{ opacity: 0.8 }}>{trip.startDate} to {trip.endDate}</Typography>
                                            </Box>
                                            <Box>
                                                <IconButton size="small" sx={{ color: 'white', backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => handleOpenModal(trip)}><EditIcon /></IconButton>
                                                <IconButton size="small" sx={{ color: 'white', backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255,255,255,0.1)', ml: 1 }} onClick={() => handleDeleteRequest(trip)}><DeleteIcon /></IconButton>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ p: 3, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ fontWeight: 500, opacity: 0.9 }}>Budget: {getCurrencySymbol(trip.currency)}{trip.budget}</Typography>
                                        <Button size="small" variant="contained" sx={{ backgroundColor: 'white', color: 'primary.main', '&:hover': { backgroundColor: '#f0f0f0' } }} onClick={() => navigate(`/trip/${trip.id}/itinerary`)}>View Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grow>
                    ))}
                </Grid>
            )}

            {isModalOpen && <AddTripModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveTrip} trip={currentTrip} />}
            {tripToDelete && <ConfirmationModal open={!!tripToDelete} onClose={() => setTripToDelete(null)} onConfirm={confirmDelete} title="Confirm Deletion" message={`Are you sure you want to delete the trip "${tripToDelete.name}"? This action cannot be undone.`} />}
        </Box>
    );
}
