// src/components/UpcomingAppointments.jsx
import React, { useState } from 'react';
import { 
  Box, Typography, Popover, IconButton, Button, TextField 
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const mockAppointments = [
  { id: 1, date: '2025-09-02', name: 'Yash Mule', time: '11:30 am', dateDisplay: '2 sept, 2025' },
  { id: 2, date: '2025-09-02', name: 'Diya Raina', time: '2:00 pm', dateDisplay: '2 sept, 2025' },
  { id: 3, date: '2025-09-02', name: 'Aryan Patil', time: '6:00 pm', dateDisplay: '2 sept, 2025' },
  { id: 4, date: '2025-09-06', name: 'Vikram Singh', time: '2:30 PM', dateDisplay: '6 sept, 2025' },
  { id: 5, date: '2025-09-18', name: 'Ramesh Shastri', time: '5:30 PM', dateDisplay: '18 sept, 2025' },
  { id: 6, date: '2025-09-15', name: 'Shrinidhi Bhat', time: '12:30 PM', dateDisplay: '15 sept, 2025' },
];

const findAppointmentsForDay = (day) => {
  const dateStr = day.format('YYYY-MM-DD');
  return mockAppointments.filter(app => app.date === dateStr);
};

function CustomDay(props) {
  const { day, outsideCurrentMonth, isToday, onAppointmentClick, ...other } = props;
  const appointments = findAppointmentsForDay(day);
  const hasAppointments = !outsideCurrentMonth && appointments.length > 0;

let dayStyles = {
  width: 30,
  height: 30,
  borderRadius: '50%',
  fontSize: '0.875rem',
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};


  if (outsideCurrentMonth) {
    dayStyles = { ...dayStyles, color: '#ccc', backgroundColor: 'transparent' };
  } else if (isToday) {
    dayStyles = { ...dayStyles, backgroundColor: '#3f51b5', color: 'white' };
  } else if (hasAppointments) {
    dayStyles = { ...dayStyles, backgroundColor: '#bbdefb', color: '#212121' };
  } else {
    dayStyles = { ...dayStyles, backgroundColor: '#f0f0f0', color: '#212121' };
  }

  const handleClick = (event) => {
    if (hasAppointments) {
      onAppointmentClick(event, appointments);
    }
  };

  return <PickersDay {...other} day={day} sx={dayStyles} onClick={handleClick} />;
}

export default function UpcomingAppointments() {
  const [currentMonth, setCurrentMonth] = useState(dayjs('2025-09-21'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [appointmentsForDay, setAppointmentsForDay] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ name: '', time: '', dateDisplay: '' });

  const handleDayClick = (event, appointments) => {
    setAnchorEl(event.currentTarget);
    setAppointmentsForDay(appointments);
    setCurrentIndex(0);
    setEditMode(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAppointmentsForDay([]);
    setCurrentIndex(0);
    setEditMode(false);
  };

  const handlePrev = () => {
    if (appointmentsForDay.length <= 1) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : appointmentsForDay.length - 1));
    setEditMode(false);
  };

  const handleNext = () => {
    if (appointmentsForDay.length <= 1) return;
    setCurrentIndex((prev) => (prev < appointmentsForDay.length - 1 ? prev + 1 : 0));
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
    const current = appointmentsForDay[currentIndex];
    setEditedData({ ...current });
  };

  const handleSave = () => {
    if (editMode) {
      console.log("Updated:", editedData);
      appointmentsForDay[currentIndex] = editedData; // update in mock
    } else {
      console.log("Saved appointment:", appointmentsForDay[currentIndex]);
    }
    setEditMode(false);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'appointment-popover' : undefined;
  const selectedAppointment = appointmentsForDay[currentIndex];

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={currentMonth}
          onMonthChange={(newMonth) => setCurrentMonth(newMonth)}
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          slots={{ day: CustomDay }}
          slotProps={{
            day: { onAppointmentClick: handleDayClick },
          }}
          sx={{
            width: '95%', '& .MuiDayCalendar-weekDayLabel': { 
            flex: 1, 
            textAlign: 'center',
            fontWeight: '400', 
            color: 'black', 
            fontSize: '0.950rem', },
            '& .MuiDayCalendar-weekContainer': {
              justifyContent: 'space-between',
            },
            '& .MuiPickersCalendarHeader-root': {
              padding: '4px 8px',
            },
            '& .MuiPickersCalendarHeader-labelContainer': {
              order: -1,
              fontSize: '1rem',
              fontWeight: 400,
            },
          }}
        />
      </LocalizationProvider>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '12px',
            boxShadow: '0px 6px 24px rgba(0,0,0,0.12)',
            minWidth: '220px',
            maxWidth: '260px',
            p: 1.5,
            position: 'relative',
            overflow: 'visible',
          },
        }}
      >
        {selectedAppointment && (
          <>
            {/* Left arrow */}
            {appointmentsForDay.length > 1 && (
              <IconButton
                onClick={handlePrev}
                size="small"
                sx={{
                  position: 'absolute',
                  left: -22,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}

            {/* Content */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {editMode ? (
                  <TextField
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    size="small"
                  />
                ) : (
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Name- {selectedAppointment.name}
                  </Typography>
                )}
                <IconButton size="small" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                <AccessTimeIcon fontSize="small" />
                {editMode ? (
                  <TextField
                    value={editedData.time}
                    onChange={(e) => setEditedData({ ...editedData, time: e.target.value })}
                    size="small"
                  />
                ) : (
                  <Typography variant="body2">{selectedAppointment.time}</Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                <EventIcon fontSize="small" />
                {editMode ? (
                  <TextField
                    value={editedData.dateDisplay}
                    onChange={(e) => setEditedData({ ...editedData, dateDisplay: e.target.value })}
                    size="small"
                  />
                ) : (
                  <Typography variant="body2">{selectedAppointment.dateDisplay}</Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                <Button variant="contained" onClick={handleSave} size="small">
                  Save
                </Button>
                {!editMode && (
                  <Button variant="outlined" onClick={handleEdit} size="small">
                    Edit
                  </Button>
                )}
              </Box>
            </Box>

            {/* Right arrow */}
            {appointmentsForDay.length > 1 && (
              <IconButton
                onClick={handleNext}
                size="small"
                sx={{
                  position: 'absolute',
                  right: -22,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            )}
          </>
        )}
      </Popover>
    </>
  );
}
