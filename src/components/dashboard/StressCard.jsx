// src/components/dashboard/StressCard.jsx
import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CircularProgress from '@mui/material/CircularProgress';

export default function StressCard() {
  const percentage = 20;
  return (
    <Paper 
      sx={{ 
        p: 2, 
        borderRadius: '16px', // Rounded border
        height: '100%',
        display: 'flex', // Ensure content is centered for placeholder
        alignItems: 'center', 
        justifyContent: 'center',
        // ADDED: Custom shadow
        boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)' 
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Stress Card
      </Typography>
    </Paper>
  );
}