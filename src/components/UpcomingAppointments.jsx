// src/components/UpcomingAppointments.jsx
import React, { useState } from 'react';
import { Box, Typography, Popover, IconButton, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Re-added necessary icons for the popover
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';

const mockAppointments = [
  { id: 1, date: '2025-09-02', name: 'Yash Mule', time: '11:30 am', dateDisplay: '2 sept, 2025' },
  { id: 2, date: '2025-09-06', name: 'Vikram Singh', time: '2:30 PM', dateDisplay: '6 sept, 2025' },
  { id: 3, date: '2025-09-11', name: 'Priya Patel', time: '11:15 AM', dateDisplay: '11 sept, 2025' },
  { id: 4, date: '2025-09-13', name: 'Rohan Mehta', time: '4:00 PM', dateDisplay: '13 sept, 2025' },
  { id: 5, date: '2025-09-17', name: 'Sunita Rao', time: '9:45 AM', dateDisplay: '17 sept, 2025' },
  { id: 6, date: '2025-09-24', name: 'Amit Kumar', time: '3:00 PM', dateDisplay: '24 sept, 2025' },
  { id: 7, date: '2025-09-27', name: 'Deepika Das', time: '1:00 PM', dateDisplay: '27 sept, 2025' },
  { id: 8, date: '2025-09-30', name: 'Karan Verma', time: '5:30 PM', dateDisplay: '30 sept, 2025' },
];

const findAppointmentForDay = (day) => {
  const dateStr = day.format('YYYY-MM-DD');
  return mockAppointments.find(app => app.date === dateStr);
};

function CustomDay(props) {
  const { day, outsideCurrentMonth, isToday, onAppointmentClick, ...other } = props;
  
  const appointment = findAppointmentForDay(day);
  const hasAppointment = !outsideCurrentMonth && !!appointment;

  let dayStyles = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    fontSize: '0.875rem',
    fontWeight: 400,
  };

  if (outsideCurrentMonth) {
    dayStyles = { ...dayStyles, color: '#ccc', backgroundColor: 'transparent' };
  } else if (isToday) {
    dayStyles = { ...dayStyles, backgroundColor: '#3f51b5', color: 'white' };
  } else if (hasAppointment) {
    dayStyles = { ...dayStyles, backgroundColor: '#bbdefb', color: '#212121' };
  } else {
    dayStyles = { ...dayStyles, backgroundColor: '#f0f0f0', color: '#212121' };
  }

  // Re-added the click handler
  const handleClick = (event) => {
    if (hasAppointment) {
      onAppointmentClick(event, appointment);
    }
  };

  return <PickersDay {...other} day={day} sx={dayStyles} onClick={handleClick} />;
}

export default function UpcomingAppointments() {
  const [currentMonth, setCurrentMonth] = useState(dayjs('2025-09-21'));
  // Re-added state management for the popover
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Re-added click handlers for opening and closing the popover
  const handleDayClick = (event, appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'appointment-popover' : undefined;

  return (
    // We need a fragment <> to return multiple components (Calendar and Popover)
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={currentMonth}
          onMonthChange={(newMonth) => setCurrentMonth(newMonth)}
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          slots={{
            day: CustomDay,
          }}
          // Re-added slotProps to pass the click handler down to CustomDay
          slotProps={{
            day: {
              onAppointmentClick: handleDayClick,
            },
          }}
          sx={{
            width: '100%',
            '& .MuiDayCalendar-weekDayLabel': {
              flex: 1,
              textAlign: 'center',
              fontWeight: '400',
              color: 'black',
              fontSize: '0.875rem',
            },
            '& .MuiDayCalendar-weekContainer': {
              justifyContent: 'space-between',
            },
            '& .MuiPickersCalendarHeader-root': {
              padding: '8px 12px',
            },
            '& .MuiPickersCalendarHeader-labelContainer': {
              order: -1,
              fontSize: '1rem',
              fontWeight: 400,
            },
          }}
        />
      </LocalizationProvider>
      
      {/* Re-added the Popover component */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
            '& .MuiPopover-paper': { 
                borderRadius: '16px', 
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
                minWidth: '250px',
                p: 2, 
            }
        }}
      >
        {selectedAppointment && (
          <Box>
            <IconButton 
              aria-label="close" 
              onClick={handleClose} 
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
              Name- {selectedAppointment.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1" color="text.secondary">
                {selectedAppointment.time}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1" color="text.secondary">
                {selectedAppointment.dateDisplay}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid #eee' }}>
              <Button variant="contained" onClick={handleClose} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                Save
              </Button>
              <Button variant="outlined" onClick={handleClose} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                Edit
              </Button>
            </Box>
          </Box>
        )}
      </Popover>
    </>
  );
}