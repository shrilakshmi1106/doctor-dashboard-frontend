// src/components/dashboard/StressCard.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Using the same icon
import CircularProgress from '@mui/material/CircularProgress'; // Using the standard MUI component

export default function StressCard() {
  const currentPatients = 20;
  const totalPatients = 100;
  const trendPercentage = 2.8;
  const stressPercentage = Math.round((currentPatients / totalPatients) * 100);

  // NOTE: For a stress card, a positive trend might be bad, so we'll use red.
  const trendColor = '#dc2626'; // Red for stress increase
  const trendBgColor = '#fef2f2'; // Light red background

  return (
    <Paper 
      sx={{ 
        p: 2, 
        borderRadius: '16px',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)' 
      }}
    >
      {/* --- TOP SECTION: Title --- */}
      <Typography
        variant="h6"
        color="#333333"
        gutterBottom
        sx={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
      >
        Patients showing stress
      </Typography>

      {/* --- MIDDLE SECTION: Count and Progress Circle --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: '400' }}>
          {currentPatients}/{totalPatients}
        </Typography>

        {/* This is the circular progress structure from ActivePatientsCard */}
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={80}
            thickness={4}
            sx={{ color: '#e0e0e0' }}
          />
          <CircularProgress
            variant="determinate"
            value={stressPercentage}
            size={80}
            thickness={4}
            sx={{
              color: '#ef4444', // Red color for stress
              position: 'absolute',
              left: 0,
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: '400', color: '#ef4444' }}>
              {`${stressPercentage}%`}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* --- BOTTOM SECTION: Trend Info --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* This is the trend display from ActivePatientsCard */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            bgcolor: trendBgColor,
            p: '4px 8px',
            borderRadius: '8px',
          }}
        >
          <TrendingUpIcon sx={{ color: trendColor, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: trendColor, fontWeight: '400' }}>
            {trendPercentage}%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          From last week
        </Typography>
      </Box>
    </Paper>
  );
}