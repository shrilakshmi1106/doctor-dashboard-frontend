// src/components/UpcomingAppointments.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const mockAppointments = [
  { date: '2025-09-02' }, { date: '2025-09-06' }, { date: '2025-09-11' },
  { date: '2025-09-13' }, { date: '2025-09-17' }, { date: '2025-09-24' },
  { date: '2025-09-27' }, { date: '2025-09-30' },
];

const findAppointmentForDay = (day) => {
  const dateStr = day.format('YYYY-MM-DD');
  return mockAppointments.find(app => app.date === dateStr);
};

function CustomDay(props) {
  const { day, outsideCurrentMonth, isToday, ...other } = props;
  
  const hasAppointment = !outsideCurrentMonth && !!findAppointmentForDay(day);

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
    dayStyles = { ...dayStyles, backgroundColor: 'white', border: '1px solid #ccc', color: '#333' };
  } else if (hasAppointment) {
    dayStyles = { ...dayStyles, backgroundColor: '#81d4fa', color: 'white' };
  } else {
    dayStyles = { ...dayStyles, backgroundColor: '#f0f0f0', color: '#333' };
  }

  return <PickersDay {...other} day={day} sx={dayStyles} />;
}

export default function UpcomingAppointments() {
  const [currentMonth, setCurrentMonth] = React.useState(dayjs('2025-09-21'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={currentMonth}
        onMonthChange={(newMonth) => setCurrentMonth(newMonth)}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        slots={{
          day: CustomDay,
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
          // UPDATED: This is the definitive fix for the date spacing
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
  );
}