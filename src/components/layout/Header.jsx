// src/components/layout/Header.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function Header({ onProfileClick }) {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        color: "black",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.08)",
        padding: "0 24px",
        zIndex: 1300,
      }}
    >
      <Toolbar disableGutters>
        {/* Logo with Gradient Text */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontWeight: 450,
            letterSpacing: ".1rem",
            textDecoration: "none",
            background: "linear-gradient(90deg, #673ab7, #009688)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          PreSchedule
        </Typography>

        {/* Spacer to push icons to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Action Icons and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <SearchOutlinedIcon />
          </IconButton>

          <IconButton color="inherit">
            <NotificationsNoneOutlinedIcon />
          </IconButton>

          {/* Clickable Profile Avatar */}
          <Avatar
            sx={{
              bgcolor: "#e0e0e0",
              color: "#616161",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 6px rgba(0,0,0,0.15)",
              },
            }}
            onClick={onProfileClick}
          >
            D
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
