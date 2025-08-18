// ===============================================================
// src/pages/DashboardLayout.jsx
// ===============================================================
// A basic skeleton for your main dashboard layout.

import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    // You will build out the sidebar and header here
    return (
        <div>
            <h1>Dashboard</h1>
            <p>This is the main application layout.</p>
            {/* The <Outlet> will render the child pages (Overview, Itinerary, etc.) */}
            <Outlet />
        </div>
    );
};

export default DashboardLayout;