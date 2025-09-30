// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import theme from './theme';
import DashboardPage from './pages/DashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* UPDATED: Set adapterLocale to a simple string "en" */}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;