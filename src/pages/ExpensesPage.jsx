import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Typography, Grid, Paper, CircularProgress, LinearProgress, Grow } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useParams } from 'react-router-dom';
import * as firestoreService from '../services/firestoreService';
import { useAuth } from '../hooks/useAuth.js';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ConfirmationModal from '../components/ui/ConfirmationModal.jsx';
import ExpensesPieChart from '../components/ExpensesPieChart.jsx';
import ExpenseItem from '../components/ui/ExpenseItem.jsx';
import AlertDialog from '../components/ui/AlertDialog.jsx';

const currencies = [
  { value: 'USD', label: '$' }, { value: 'EUR', label: '€' },
  { value: 'JPY', label: '¥' }, { value: 'GBP', label: '£' },
  { value: 'INR', label: '₹' },
];

const getCurrencySymbol = (currencyCode) => currencies.find(c => c.value === currencyCode)?.label || '$';

export default function ExpensesPage() {
  const { tripId } = useParams();
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [overBudgetAlert, setOverBudgetAlert] = useState(false);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    if (currentUser && tripId) {
      const unsubscribeExpenses = firestoreService.getExpensesStream(
        currentUser.uid, tripId, setExpenses, 
        (err) => console.error(err)
      );

      const fetchTripDetails = async () => {
        const details = await firestoreService.getTripDetails(currentUser.uid, tripId);
        setTripDetails(details);
        setIsLoading(false);
      };
      
      fetchTripDetails();

      return () => unsubscribeExpenses();
    }
  }, [currentUser, tripId]);

  const { totalSpent, chartData, budgetProgress } = useMemo(() => {
    const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    const progress = tripDetails && tripDetails.budget > 0 ? (total / tripDetails.budget) * 100 : 0;
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
      return acc;
    }, {});
    const data = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    return { totalSpent: total, chartData: data, budgetProgress: progress };
  }, [expenses, tripDetails]);

  // === FIX STARTS HERE ===
  const handleSave = async (expenseData) => {
    const expenseDate = new Date(expenseData.date);
    const startDate = new Date(tripDetails.startDate);
    const endDate = new Date(tripDetails.endDate);
    endDate.setDate(endDate.getDate() + 1);

    if (expenseDate < startDate || expenseDate > endDate) {
      setDateError(true);
      return;
    }

    try {
      const isEditMode = Boolean(expenseData.id);
      await firestoreService.saveExpense(currentUser.uid, tripId, expenseData);
      setIsModalOpen(false);

      // Naya total aapse calculate karein
      let newTotal;
      if (isEditMode) {
        // Edit ke liye: purana amount hatayein aur naya add karein
        const oldAmount = currentExpense ? Number(currentExpense.amount) : 0;
        newTotal = totalSpent - oldAmount + Number(expenseData.amount);
      } else {
        // Add ke liye: sirf naya amount add karein
        newTotal = totalSpent + Number(expenseData.amount);
      }

      // Ab aapse check karein ki budget over hua ya nahi
      if (tripDetails && newTotal > tripDetails.budget) {
        // Alert ko sirf tabhi dikhayein jab pehle se nahi dikh raha ho
        if (!overBudgetAlert) {
            setOverBudgetAlert(true);
        }
      }

    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };
  // === FIX ENDS HERE ===

  const handleOpenModal = (expense = null) => {
    setCurrentExpense(expense || { description: '', amount: '', category: 'Other', date: '' });
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (expense) => setExpenseToDelete(expense);

  const confirmDelete = async () => {
    if (expenseToDelete) {
      try {
        await firestoreService.deleteExpense(currentUser.uid, tripId, expenseToDelete.id);
        setExpenseToDelete(null);
      } catch (error) {
        console.error("Error deleting expense:", error);
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
            <AccountBalanceWalletIcon sx={{ fontSize: '2.5rem', color: 'primary.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #673ab7 30%, #f50057 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Trip Expenses
            </Typography>
        </Box>
        <Button variant="contained" disableElevation startIcon={<AddCircleOutlineIcon />} onClick={() => handleOpenModal()}>Add Expense</Button>
      </Box>

      {tripDetails && (
        <Grow in={true}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Budget Overview</Typography>
              <Typography variant="h6" color={budgetProgress > 100 ? 'error' : 'textPrimary'}>
                {`${getCurrencySymbol(tripDetails.currency)}${totalSpent.toFixed(2)} / ${getCurrencySymbol(tripDetails.currency)}${Number(tripDetails.budget).toFixed(2)}`}
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={budgetProgress > 100 ? 100 : budgetProgress} color={budgetProgress > 100 ? "error" : "primary"} sx={{ height: 12, borderRadius: 6 }} />
          </Paper>
        </Grow>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}><Paper sx={{ p: 2, height: '450px', overflowY: 'auto', borderRadius: '20px' }}>
            {expenses.map((exp, index) => (
              <Grow in={true} {...{ timeout: 300 * (index + 1) }} key={exp.id}><Box><ExpenseItem expense={exp} tripCurrency={tripDetails?.currency} onEdit={() => handleOpenModal(exp)} onDelete={() => handleDeleteRequest(exp)} /></Box></Grow>
            )) }
        </Paper></Grid>
        <Grid item xs={12} md={7}><Paper sx={{ p: 3, height: '100%', borderRadius: '20px' }}>
            <Typography variant="h6" mb={2} fontWeight="600">Expenses by Category</Typography>
            <ExpensesPieChart data={chartData} />
        </Paper></Grid>
      </Grid>

      {isModalOpen && <ExpenseForm expense={currentExpense} onSave={handleSave} onClose={() => setIsModalOpen(false)} tripCurrency={tripDetails?.currency} />}
      {expenseToDelete && <ConfirmationModal open={!!expenseToDelete} onClose={() => setExpenseToDelete(null)} onConfirm={confirmDelete} title="Confirm Deletion" message={`Delete "${expenseToDelete.description}"?`} />}
      <AlertDialog open={overBudgetAlert} onClose={() => setOverBudgetAlert(false)} title="Budget Exceeded" message="You have gone over your budget for this trip." />
      <AlertDialog open={dateError} onClose={() => setDateError(false)} title="Invalid Date" message={`Please select a date between ${tripDetails?.startDate} and ${tripDetails?.endDate}.`} />
    </Box>
  );
}
