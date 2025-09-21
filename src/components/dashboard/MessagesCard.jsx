// src/components/dashboard/MessagesCard.jsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

export default function MessagesCard() {
  return (
    <Paper 
      sx={{ 
        p: 2, 
        borderRadius: '16px', // Rounded border
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        // ADDED: Custom shadow
        boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)' 
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Messages Card
      </Typography>
    </Paper>
  );
}