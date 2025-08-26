// src/components/TimelineItem.jsx (Final Corrected Layout)

import React from 'react';
import {
    TimelineItem as MuiTimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from '@mui/lab';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MuseumIcon from '@mui/icons-material/Museum';

const getIconForEvent = (event) => {
    const lowerEvent = event.toLowerCase(); 
    if (lowerEvent.includes('flight') || lowerEvent.includes('airport')) return <FlightIcon />;
    if (lowerEvent.includes('hotel') || lowerEvent.includes('stay')) return <HotelIcon />;
    if (lowerEvent.includes('dinner') || lowerEvent.includes('lunch') || lowerEvent.includes('restaurant')) return <RestaurantIcon />;
    return <MuseumIcon />;
};

export const TimelineItem = ({ item, onEdit, onDelete, isLast }) => {
    return (
        <MuiTimelineItem>
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                {item.date}
                <br />
                {item.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                <TimelineDot color="primary" variant="outlined">
                    {getIconForEvent(item.event)}
                </TimelineDot>
                {!isLast && <TimelineConnector sx={{ bgcolor: 'primary.main' }} />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h1">
                            {item.event}
                        </Typography>
                        <Box>
                            <IconButton onClick={() => onEdit(item)} color="secondary" size="small"><EditIcon /></IconButton>
                            <IconButton onClick={() => onDelete(item.id)} color="error" size="small"><DeleteIcon /></IconButton>
                        </Box>
                    </Box>
                    <Typography>{item.notes}</Typography>
                </Paper>
            </TimelineContent>
        </MuiTimelineItem>
    );
};
