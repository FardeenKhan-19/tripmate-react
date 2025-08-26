import React from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, Button, CircularProgress } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventIcon from '@mui/icons-material/Event';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useAuth } from '../hooks/useAuth.js';
import Logo from '../components/Logo.jsx';

const drawerWidth = 240;

export default function DashboardLayout() {
  const auth = useAuth();
  const currentUser = auth ? auth.currentUser : null;
  const logout = auth ? auth.logout : () => {};
  const location = useLocation();

  const pathParts = location.pathname.split('/');
  const tripId = pathParts[1] === 'trip' ? pathParts[2] : null;

  if (!auth || auth.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const menuItems = [
    { text: 'Overview', path: '/overview', icon: <DashboardIcon /> },
    { text: 'Trips', path: '/trips', icon: <FlightTakeoffIcon /> },
  ];

  const tripMenuItems = tripId ? [
    { text: 'Itinerary', path: `/trip/${tripId}/itinerary`, icon: <EventIcon /> },
    { text: 'Expenses', path: `/trip/${tripId}/expenses`, icon: <MonetizationOnIcon /> },
  ] : [];

  const drawer = (
    <div>
      <Toolbar />
      <List sx={{ p: 2 }}>
        {[...menuItems, ...tripMenuItems].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: '8px',
                marginBottom: '8px',
                '&.active': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Toolbar>
          <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {currentUser ? currentUser.email : ''}
            </Typography>
            <Button variant="contained" disableElevation onClick={logout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box', 
            borderRight: 'none',
            // === SIDEBAR STYLING CHANGES START HERE ===
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Glassy background
            backdropFilter: 'blur(10px)', // Blur effect
            // === SIDEBAR STYLING CHANGES END HERE ===
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          minHeight: '100vh',
          p: 3,
          backgroundImage: `linear-gradient(to bottom right, rgba(246, 250, 252, 1), rgba(246, 246, 247, 0.8), rgba(240, 232, 237, 0.8)) ,url('https://i.pinimg.com/736x/b8/f8/fa/b8f8fa8d2eaa6518253f301eadac06b0.jpg?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
