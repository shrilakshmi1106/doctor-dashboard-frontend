// src/components/layout/Footer.jsx
import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#f0f4f8', // Set the light blue background color
        color: '#5a6472', // Set the default text color for links
        py: 6,
        px: 4,
        mt: 'auto'
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Logo and Text */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ color: '#343a40', letterSpacing: '0.1em' }} gutterBottom>
            LOGO
          </Typography>
        </Grid>

        {/* Resources Links */}
        <Grid item xs={6} sm={3} md={2}>
          <Typography variant="subtitle1" sx={{ color: '#343a40', fontWeight: 'bold' }} gutterBottom>
            Resources
          </Typography>
          <Link href="#" color="inherit" display="block" underline="hover">About</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Testimonials</Link>
          <Link href="#" color="inherit" display="block" underline="hover">FAQ</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Contact</Link>
        </Grid>

        {/* Company Links */}
        <Grid item xs={6} sm={3} md={2}>
          <Typography variant="subtitle1" sx={{ color: '#343a40', fontWeight: 'bold' }} gutterBottom>
            Company
          </Typography>
          <Link href="#" color="inherit" display="block" underline="hover">Privacy Policy</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Terms</Link>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" sx={{ color: '#343a40', fontWeight: 'bold' }} gutterBottom>
            Contact
          </Typography>
          {/* Added icons next to contact info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PhoneOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">+91 36442556555</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MailOutlineIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">mail@preschedule@gmail.com</Typography>
          </Box>
        </Grid>
      </Grid>
      
      {/* Bottom Bar with Socials and Copyright */}
      <Box 
        sx={{ 
          pt: 4, 
          mt: 4, 
          borderTop: '1px solid #e0e7ef', // Lighter border color
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Box>
          <IconButton href="#" color="inherit"><LinkedInIcon /></IconButton>
          <IconButton href="#" color="inherit"><InstagramIcon /></IconButton>
          <IconButton href="#" color="inherit"><FacebookIcon /></IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: { xs: 2, sm: 0 } }}>
          Copyright @2025
        </Typography>
      </Box>
    </Box>
  );
}