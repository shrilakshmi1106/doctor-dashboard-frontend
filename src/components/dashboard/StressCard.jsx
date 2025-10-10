import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function StressCard() {
  const [metricsData, setMetricsData] = useState({
    current: 0,
    total: 100,
    growthPercentage: 0,
    isLoading: true,
  });

  // Fetch data dynamically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/patients/stress');
        const data = await response.json();

        setMetricsData({
          current: data.current || 20,
          total: data.total || 100,
          growthPercentage: data.growthPercentage || 2.8,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setMetricsData({
          current: 20,
          total: 100,
          growthPercentage: 2.8,
          isLoading: false,
        });
      }
    };
    fetchData();
  }, []);

  const stressPercentage =
    metricsData.total > 0
      ? Math.round((metricsData.current / metricsData.total) * 100)
      : 0;

  const trendColor = '#dc2626'; // Red for stress increase
  const trendBgColor = '#fef2f2'; // Light red background

  if (metricsData.isLoading) {
    return (
      <Paper sx={{ p: 2, borderRadius: '16px', height: '200px' }}>
        Loading...
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: '16px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)',
      }}
    >
      {/* Top: Title */}
      <Typography
        variant="h6"
        color="#333333"
        gutterBottom
        sx={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
      >
        Patients Showing Stress
      </Typography>

      {/* Middle: Count + Circular Progress */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 400 }}>
          {metricsData.current}/{metricsData.total}
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
            value={stressPercentage}
            size={80}
            thickness={4}
            sx={{ color: '#ef4444', position: 'absolute', left: 0 }}
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
            <Typography variant="h6" sx={{ fontWeight: 400, color: '#ef4444' }}>
              {`${stressPercentage}%`}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bottom: Trend */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', bgcolor: trendBgColor, p: '4px 8px', borderRadius: '8px' }}>
          <TrendingUpIcon sx={{ color: trendColor, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: trendColor, fontWeight: 400 }}>
            {metricsData.growthPercentage}%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          From last week
        </Typography>
      </Box>
    </Paper>
  );
}
