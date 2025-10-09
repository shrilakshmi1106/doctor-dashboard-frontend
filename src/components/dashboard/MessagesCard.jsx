// src/components/dashboard/MessagesCard.jsx
import React from "react";
import { Paper, Typography, Avatar, Box, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

export default function MessagesCard() {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: "16px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Messages
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "primary.main", cursor: "pointer" }}
        >
          View more
        </Typography>
      </Box>

      {/* Chat Section */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "linear-gradient(180deg, #fafafa, #f0f4ff)",
          p: 2,
          borderRadius: 2,
          mb: 2,
        }}
      >
        {/* Doctor Info */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
          <Typography fontWeight={500}>Doctor</Typography>
        </Box>

        {/* Patient Message */}
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <Box
            sx={{
              display: "inline-block",
              bgcolor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              p: 1.5,
              maxWidth: "70%",
              boxShadow: 1,
            }}
          >
            <Typography variant="body2" color="text.primary">
              Hi doctor, I’ve been sleeping only 3–4 hours and feel restless with
              racing thoughts.
            </Typography>
          </Box>
        </Box>

        {/* Doctor Reply */}
        <Box mb={1}>
          <Box
            sx={{
              display: "inline-block",
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "12px",
              p: 1.5,
              maxWidth: "70%",
              boxShadow: 1,
            }}
          >
            <Typography variant="body2">
              Thanks for telling me. These may be early manic symptoms. Any mood
              or energy changes?
            </Typography>
          </Box>
        </Box>

        {/* Timestamp */}
        <Typography variant="caption" color="primary.main">
          1hr ago
        </Typography>
      </Box>

      {/* Input Area */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "9999px",
          px: 1,
          py: 0.5,
          bgcolor: "#fafafa",
        }}
      >
        <IconButton size="small">
          <AddCircleOutlineIcon color="action" />
        </IconButton>
        <TextField
          variant="standard"
          placeholder="Type a message..."
          fullWidth
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: "0.9rem", px: 1 },
          }}
        />
        <IconButton size="small">
          <CameraAltOutlinedIcon color="action" />
        </IconButton>
        <IconButton size="small">
          <SendOutlinedIcon sx={{ color: "primary.main" }} />
        </IconButton>
      </Box>
    </Paper>
  );
}