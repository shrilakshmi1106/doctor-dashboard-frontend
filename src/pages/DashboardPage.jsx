// src/pages/DashboardPage.jsx
import React from 'react';
import { Box, Typography, Paper, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header'; 
import Footer from '../components/layout/Footer';
import UpcomingAppointments from '../components/UpcomingAppointments';

// Import all the card components
import ActivePatientsCard from '../components/dashboard/ActivePatientsCard';
import StressCard from '../components/dashboard/StressCard';
import ReportsCard from '../components/dashboard/ReportsCard';
import RecentPatientsCard from '../components/dashboard/RecentPatientsCard';
import PatientDistributionCard from '../components/dashboard/PatientDistributionCard';
import MessagesCard from '../components/dashboard/MessagesCard';


export default function DashboardPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Header />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3, 
            fontWeight: 400,
            color: '#111'
          }}
        >
          Welcome back, Dr. Rohit
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(12, 1fr)',
            },
          }}
        >
          {/* Row 1 */}
          <Box sx={{ gridColumn: { md: 'span 4' } }}>
            <ActivePatientsCard />
          </Box>
          <Box sx={{ gridColumn: { md: 'span 4' } }}>
            <StressCard />
          </Box>
          <Box sx={{ gridColumn: { md: 'span 4' } }}>
            <ReportsCard />
          </Box>

          {/* Row 2 */}
          {/* UPDATED: Added aspectRatio to make this container a square */}
          <Box sx={{ gridColumn: { md: 'span 5', lg: 'span 4' }, aspectRatio: '1 / 1' }}>
             <Paper 
                sx={{ 
                    p: '16px', 
                    borderRadius: '16px', 
                    bgcolor: 'white', 
                    height: '100%',
                    boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)' 
                }}
             >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: '400' }}>
                  Upcoming Appointments
                </Typography>
                <MuiLink 
                  component={Link} 
                  to="/appointments" 
                  underline="none" 
                  sx={{ fontWeight: '400', color: 'primary.main', fontSize: '0.875rem' }}
                >
                  See all
                </MuiLink>
              </Box>
              <UpcomingAppointments />
            </Paper>
          </Box>
          <Box sx={{ gridColumn: { md: 'span 7', lg: 'span 8' } }}>
            <RecentPatientsCard />
          </Box>
          
          {/* Row 3 */}
          <Box sx={{ gridColumn: { md: 'span 5', lg: 'span 4' } }}>
            <PatientDistributionCard />
          </Box>
          <Box sx={{ gridColumn: { md: 'span 7', lg: 'span 8' } }}>
            <MessagesCard />
          </Box>
        </Box>
      </Box>
      
      <Footer />
    </Box>
  );
};