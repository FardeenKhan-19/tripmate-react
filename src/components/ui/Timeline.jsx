import React from 'react';
import { Box, Typography, Paper, IconButton, Grow, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MuseumIcon from '@mui/icons-material/Museum';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import dayjs from 'dayjs';

const getIconForEvent = (event) => {
  const lowerEvent = event.toLowerCase();
  if (lowerEvent.includes('flight') || lowerEvent.includes('airport')) return <FlightIcon color="primary" />;
  if (lowerEvent.includes('hotel') || lowerEvent.includes('check-in')) return <HotelIcon color="primary" />;
  if (lowerEvent.includes('dinner') || lowerEvent.includes('lunch') || lowerEvent.includes('breakfast') || lowerEvent.includes('restaurant')) return <RestaurantIcon color="primary" />;
  if (lowerEvent.includes('museum') || lowerEvent.includes('louvre')) return <MuseumIcon color="primary" />;
  return <LocalActivityIcon color="primary" />;
};

function TimelineItem({ item, onEdit, onDelete, isLast }) {
  return (
    <Box sx={{ display: 'flex', position: 'relative', pb: isLast ? 0 : 4 }}>
      {!isLast && (
        <Box
          sx={{
            position: 'absolute',
            top: '24px',
            left: '22px',
            width: '4px',
            height: 'calc(100% - 10px)',
            backgroundColor: 'primary.light',
            borderRadius: '2px',
          }}
        />
      )}
      <Box sx={{ mr: 2, zIndex: 1 }}>
        <Box
          sx={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid',
            borderColor: 'primary.light',
          }}
        >
          {getIconForEvent(item.event)}
        </Box>
      </Box>
      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          flexGrow: 1,
          position: 'relative',
          borderRadius: '16px',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: (theme) => `0 8px 25px ${theme.palette.primary.light}33`
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {item.time}
            </Typography>
            <Typography variant="h6" component="h3" fontWeight="600" gutterBottom>
              {item.event}
            </Typography>
            {item.notes && <Typography variant="body2">{item.notes}</Typography>}
          </Box>
          <Box>
            <IconButton size="small" onClick={() => onEdit(item)}><EditIcon fontSize="small" /></IconButton>
            <IconButton size="small" onClick={() => onDelete(item)} color="error"><DeleteIcon fontSize="small" /></IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default function Timeline({ items, onEdit, onDelete, tripStartDate }) {
  const groupedByDate = items.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // === FIX STARTS HERE ===
  // Dates ko sort karein
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));
  // === FIX ENDS HERE ===

  if (!items || items.length === 0) {
    return (
      <Typography sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
        No itinerary items yet. Add one to get started!
      </Typography>
    );
  }

  return (
    <Box>
      {sortedDates.map((date, dayIndex) => {
        const dayItems = groupedByDate[date];
        const dayNumber = dayjs(date).diff(dayjs(tripStartDate), 'day') + 1;

        return (
          <Box key={date} sx={{ mb: 4 }}>
            <Divider sx={{ mb: 2 }}>
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                Day {dayNumber} ({dayjs(date).format('MMM DD, YYYY')})
              </Typography>
            </Divider>
            {dayItems.map((item, itemIndex) => (
              <Grow in={true} {...{ timeout: 300 * (itemIndex + 1) }} key={item.id}>
                <div>
                  <TimelineItem
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isLast={itemIndex === dayItems.length - 1}
                  />
                </div>
              </Grow>
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
