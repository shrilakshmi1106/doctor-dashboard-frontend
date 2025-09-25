// src/components/dashboard/StressCard.jsx
import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import CircularProgress from './CircularProgress';

export default function StressCard() {
  const currentPatients = 20;
  const totalPatients = 100;
  const trendPercentage = 2.8;
  const isPositiveTrend = true;
  const stressPercentage = Math.round((currentPatients / totalPatients) * 100);

  return (
    <Paper 
      sx={{ 
        p: 3, 
        borderRadius: '16px',
        height: '100%',
        boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '14px',
              fontWeight: 500,
              color: '#64748b',
              lineHeight: 1.2
            }}
          >
            Patients Showing Stress
          </Typography>
          
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: '32px',
              fontWeight: 700,
              color: '#1e293b',
              margin: '8px 0',
              lineHeight: 1
            }}
          >
            {currentPatients}/{totalPatients}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1.5 }}>
            <Chip
              icon={
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ marginLeft: '4px' }}>
                  <path 
                    d="M1 6L3.5 3.5L6 5L11 1" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M8 1H11V4" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label={`${trendPercentage}%`}
              size="small"
              sx={{
                backgroundColor: isPositiveTrend ? '#dcfce7' : '#fef2f2',
                color: isPositiveTrend ? '#16a34a' : '#dc2626',
                fontSize: '12px',
                fontWeight: 600,
                height: '24px',
                width: 'fit-content',
                '& .MuiChip-icon': {
                  color: 'inherit',
                  fontSize: '12px'
                }
              }}
            />
            <Typography 
              variant="caption" 
              sx={{ 
                fontSize: '12px',
                color: '#94a3b8',
                fontWeight: 400
              }}
            >
              From last week
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress 
            percentage={stressPercentage} 
            color="#ef4444"
            size={80}
            strokeWidth={8}
          />
        </Box>
      </Box>
    </Paper>
  );
}