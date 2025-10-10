import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';

export default function ReportsCard() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)',
        fontFamily: 'Albert Sans, sans-serif',
      }}
    >
      {/* Top Content */}
      <Box>
        <Typography
          variant="h6"
          color="#333333"
          gutterBottom
          sx={{ fontWeight: 400 }}
        >
          New Reports
        </Typography>
        <Typography variant="h5" color="#333333" sx={{ fontWeight: 400 }}>
          <Typography
            component="span"
            variant="h4"
            color="#333333"
            sx={{ fontWeight: 400 }}
          >
            5
          </Typography>{' '}
          new pending reports
        </Typography>
      </Box>

      {/* Bottom Button */}
      <Button
        variant="contained"
        sx={{
          mt: 3,
          borderRadius: '24px',
          textTransform: 'none',
          fontWeight: 500,
          width: '100%',
          fontFamily: 'Albert Sans, sans-serif',
          backgroundColor: '#1488DB',
          '&:hover': { backgroundColor: '#1488DB' },
        }}
      >
        Check Reports
      </Button>
    </Paper>
  );
}
