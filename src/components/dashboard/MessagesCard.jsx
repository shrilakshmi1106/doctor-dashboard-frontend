import React from 'react';
import { Paper, Typography, Avatar, Box, Link } from '@mui/material';

// Placeholder data to match the image
const messages = [
  {
    name: 'Arya Singh',
    avatar: 'https://i.pravatar.cc/150?u=arya', // Placeholder avatar
    message: "Hi doctor, I've been feeling really restless ...",
    time: '1hr ago',
    unread: true,
  },
  {
    name: 'Rahul Sharma',
    avatar: 'https://i.pravatar.cc/150?u=rahul', // Placeholder avatar
    message: 'Doctor, I feel I should ...',
    time: '3hr ago',
    unread: false,
  },
];

// A sub-component for rendering a single message preview
const MessagePreview = ({ name, avatar, message, time, unread }) => {
  // Use a different background color for unread messages
  const bgColor = unread ? 'grey.100' : 'blue.50';

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        bgcolor: bgColor,
      }}
    >
      <Avatar src={avatar} alt={name} />
      <Box flexGrow={1}>
        <Typography variant="body1" fontWeight="medium" color="text.primary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message}
          <Link href="#" underline="hover" sx={{ ml: 0.5 }}>
            view more
          </Link>
        </Typography>
      </Box>
      <Typography variant="body2" color="primary.main" flexShrink={0}>
        {time}
      </Typography>
    </Box>
  );
};


// The main MessagesCard component
export default function MessagesCard() {
  return (
    // Main card container using Paper
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        fontFamily: 'sans-serif', // Assuming a base font
        fontWeight: '400'
      }}
    >
      
      {/* Card Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
  variant="h6"
  color="#333333"
  gutterBottom
  sx={{ fontFamily: 'Albert Sans, sans-serif', fontWeight: 400 }}
>
  Messages
</Typography>
        <Link href="#" underline="hover" variant="body1" color="text.secondary">
          See all
        </Link>
      </Box>

      {/* List of messages */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {messages.map((msg, index) => (
          <MessagePreview
            key={index}
            name={msg.name}
            avatar={msg.avatar}
            message={msg.message}
            time={msg.time}
            unread={msg.unread}
          />
        ))}
      </Box>
    </Paper>
  );
}