// src/components/layout/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function Header() {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'white', 
        color: 'black', 
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
        padding: '0 24px' 
      }}
    >
      <Toolbar disableGutters>
        {/* Logo with UPDATED Gradient Text */}
        <Typography 
          variant="h5" 
          noWrap 
          component="a" 
          href="/"
          sx={{
            mr: 2,
            fontWeight: 450,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            // UPDATED: New gradient to match the image
            background: 'linear-gradient(90deg, #673ab7, #009688)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          PreSchedule
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <Avatar sx={{ bgcolor: '#e0e0e0', color: '#616161' }}>D</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}