// src/components/dashboard/ActivePatientsCard.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CircularProgress from '@mui/material/CircularProgress';

export default function ActivePatientsCard() {
  const percentage = 70;
  return (
    <Paper 
      sx={{ 
        p: 2, 
        borderRadius: '16px', // Rounded border
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        // ADDED: Custom shadow
        boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)' 
      }}
    >
      <Typography variant="body1" color="text.secondary">
        Active Patients
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: '400' }}>
          70/100
        </Typography>

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
            value={percentage}
            size={80}
            thickness={4}
            sx={{
              color: '#1976d2',
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
            <Typography variant="h6" component="div" color="primary.main" sx={{ fontWeight: '400' }}>
              {`${percentage}%`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            bgcolor: '#e8f5e9',
            p: '4px 8px',
            borderRadius: '8px',
          }}
        >
          <TrendingUpIcon sx={{ color: '#4caf50', mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: '400' }}>
            6.7%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          From last week
        </Typography>
      </Box>
    </Paper>
  );
}