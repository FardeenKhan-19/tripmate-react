import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, Fade, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useAuth } from '../hooks/useAuth.js';
import * as firestoreService from '../services/firestoreService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import dayjs from 'dayjs';

// Icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventIcon from '@mui/icons-material/Event';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';

const SummaryCard = ({ title, value, icon, color, delay }) => (
    <Fade in={true} timeout={delay}>
        <Paper 
            sx={{ 
                p: 3, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '150px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-8px)',
                }
            }}
        >
            <Box sx={{ color: color, fontSize: '3.5rem', mb: 2 }}>{icon}</Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography color="text.secondary">{title}</Typography>
                <Typography variant="h4" fontWeight="bold">{value}</Typography>
            </Box>
        </Paper>
    </Fade>
);

const currencies = [
    { value: 'USD', label: '$' }, { value: 'EUR', label: '€' },
    { value: 'JPY', label: '¥' }, { value: 'GBP', label: '£' },
    { value: 'INR', label: '₹' },
];

const getCurrencySymbol = (currencyCode) => currencies.find(c => c.value === currencyCode)?.label || '$';

export default function DashboardOverviewPage() {
    const { currentUser } = useAuth();
    const [summaryData, setSummaryData] = useState({ totalTrips: 0, upcomingEvents: 0 });
    const [totalBudgetUSD, setTotalBudgetUSD] = useState(0);
    const [totalExpensesUSD, setTotalExpensesUSD] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [exchangeRates, setExchangeRates] = useState(null);
    
    // === FIX START: localStorage se initial value lena ===
    const [displayCurrency, setDisplayCurrency] = useState(() => {
        return localStorage.getItem('preferredCurrency') || 'INR';
    });
    // === FIX END ===

    // === FIX START: Currency change ko localStorage mein save karna ===
    useEffect(() => {
        localStorage.setItem('preferredCurrency', displayCurrency);
    }, [displayCurrency]);
    // === FIX END ===

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await response.json();
                setExchangeRates(data.rates);
            } catch (error) {
                console.error("Could not fetch exchange rates.", error);
            }
        };
        fetchRates();
    }, []);

    useEffect(() => {
        if (currentUser && exchangeRates) {
            const fetchAllData = async () => {
                try {
                    const userTrips = await firestoreService.getTrips(currentUser.uid);
                    
                    let upcomingEventsCount = 0;
                    let budgetInUSD = 0;
                    let expensesInUSD = 0;
                    const today = dayjs().startOf('day');

                    for (const trip of userTrips) {
                        const budgetRate = exchangeRates[trip.currency] ? 1 / exchangeRates[trip.currency] : 1;
                        budgetInUSD += (Number(trip.budget) || 0) * budgetRate;

                        const expensesRef = collection(db, 'users', currentUser.uid, 'trips', trip.id, 'expenses');
                        const expensesSnapshot = await getDocs(expensesRef);
                        expensesSnapshot.forEach(doc => {
                            expensesInUSD += (Number(doc.data().amount) || 0) * budgetRate;
                        });

                        const itineraryRef = collection(db, 'users', currentUser.uid, 'trips', trip.id, 'itinerary');
                        const itinerarySnapshot = await getDocs(itineraryRef);
                        itinerarySnapshot.forEach(doc => {
                            if (dayjs(doc.data().date).isAfter(today)) upcomingEventsCount++;
                        });
                    }

                    setSummaryData({ totalTrips: userTrips.length, upcomingEvents: upcomingEventsCount });
                    setTotalBudgetUSD(budgetInUSD);
                    setTotalExpensesUSD(expensesInUSD);

                } catch (error) {
                    console.error("Failed to fetch dashboard data:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAllData();
        }
    }, [currentUser, exchangeRates]);

    const convertedBudget = useMemo(() => {
        if (!exchangeRates) return '0.00';
        const rate = exchangeRates[displayCurrency] || 1;
        return (totalBudgetUSD * rate).toFixed(2);
    }, [totalBudgetUSD, displayCurrency, exchangeRates]);

    const convertedExpenses = useMemo(() => {
        if (!exchangeRates) return '0.00';
        const rate = exchangeRates[displayCurrency] || 1;
        return (totalExpensesUSD * rate).toFixed(2);
    }, [totalExpensesUSD, displayCurrency, exchangeRates]);

    const currencySymbol = getCurrencySymbol(displayCurrency);

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <DashboardIcon sx={{ fontSize: '2.5rem', color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #673ab7 30%, #f50057 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Welcome Back!
                        </Typography>
                        <Typography color="text.secondary">Here's a summary of your travel plans.</Typography>
                    </Box>
                </Box>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 150, '& .MuiFilledInput-root': { backgroundColor: 'rgba(255,255,255,0.7)' } }}>
                    <InputLabel id="currency-select-label">Display Currency</InputLabel>
                    <Select labelId="currency-select-label" value={displayCurrency} label="Display Currency" onChange={(e) => setDisplayCurrency(e.target.value)} sx={{ borderRadius: '12px' }}>
                        {currencies.map(c => <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}><SummaryCard title="Total Trips" value={summaryData.totalTrips} icon={<FlightTakeoffIcon fontSize="inherit" />} color="#03a9f4" delay={300} /></Grid>
                <Grid item xs={12} sm={6}><SummaryCard title="Upcoming Events" value={summaryData.upcomingEvents} icon={<EventIcon fontSize="inherit" />} color="#ff9800" delay={500} /></Grid>
                <Grid item xs={12} sm={6}><SummaryCard title="Total Budget" value={`${currencySymbol}${convertedBudget}`} icon={<AccountBalanceWalletIcon fontSize="inherit" />} color="#4caf50" delay={700} /></Grid>
                <Grid item xs={12} sm={6}><SummaryCard title="Total Expenses" value={`${currencySymbol}${convertedExpenses}`} icon={<MonetizationOnIcon fontSize="inherit" />} color="#f44336" delay={900} /></Grid>
            </Grid>
        </Box>
    );
}