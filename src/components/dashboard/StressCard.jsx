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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, height: '100%' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '16px',
                fontWeight: 500,
                color: '#64748b',
                lineHeight: 1.2,
                mb: 2
              }}
            >
              Patients Showing Stress
            </Typography>
            
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: '28px',
                fontWeight: 400,
                color: '#1e293b',
                lineHeight: 1,
                mt: 3,
                mb: 2
              }}
            >
              {currentPatients}/{totalPatients}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-start' }}>
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
              size="medium"
              sx={{
                backgroundColor: isPositiveTrend ? '#dcfce7' : '#fef2f2',
                color: isPositiveTrend ? '#16a34a' : '#dc2626',
                fontSize: '14px',
                fontWeight: 600,
                height: '32px',
                minWidth: '60px',
                borderRadius: '8px',
                '& .MuiChip-icon': {
                  color: 'inherit',
                  fontSize: '14px'
                }
              }}
            />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <CircularProgress 
            percentage={stressPercentage} 
            color="#ef4444"
            size={100}
            strokeWidth={10}
          />
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '14px',
              color: '#94a3b8',
              fontWeight: 400,
              mt: 1
            }}
          >
            From last week
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}