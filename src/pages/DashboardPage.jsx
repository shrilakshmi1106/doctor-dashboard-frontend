import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import UpcomingAppointments from "../components/UpcomingAppointments";
import ActivePatientsCard from "../components/dashboard/ActivePatientsCard";
import StressCard from "../components/dashboard/StressCard";
import ReportsCard from "../components/dashboard/ReportsCard";
import RecentPatientsCard from "../components/dashboard/RecentPatientsCard";
import PatientDistributionCard from "../components/dashboard/PatientDistributionCard";
import MessagesCard from "../components/dashboard/MessagesCard";

export default function DashboardPage() {
  const [userProfile] = useState({
    name: "Dr. Rohit",
    avatar: "https://i.pravatar.cc/40?img=12",
  });

  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  const handleBellClick = async () => {
    try {
      const response = await fetch("/api/notifications/latest");
      const data = await response.json();

      if (data.length > 0) {
        setCurrentNotification(data[0]);
      } else {
        setCurrentNotification({
          id: 1,
          message: "Sneha Iyer missed her 9:30 AM appointment.",
        });
      }
      setShowNotification(true);
    } catch (error) {
      console.error("Notification fetch error:", error);
      setCurrentNotification({
        id: 1,
        message: "Sneha Iyer missed her 9:30 AM appointment.",
      });
      setShowNotification(true);
    }
  };

  const closeNotification = () => setShowNotification(false);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f8f9fa",
        fontFamily: "Albert Sans, sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* ---------- TOP BAR ---------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2.5,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            background: "linear-gradient(135deg, #a855f7, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          PreSchedule
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleBellClick} sx={{ color: "#6b7280" }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>

          <IconButton sx={{ color: "#6b7280" }}>
            <SearchOutlinedIcon />
          </IconButton>

          <Box
            component="img"
            src={userProfile.avatar}
            alt="profile"
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid #e5e7eb",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>

      {/* ---------- NOTIFICATION BANNER ---------- */}
      {showNotification && (
        <Box
          sx={{
            position: "absolute",
            top: "70px",
            right: "50px",
            zIndex: 1000,
          }}
        >
          <Paper
            sx={{
              borderRadius: "20px",
              p: 1.5,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #d1d5db",
              display: "flex",
              alignItems: "center",
              gap: 2,
              minWidth: "400px",
            }}
          >
            <Typography sx={{ flex: 1, fontSize: "16px", color: "#374151" }}>
              {currentNotification
                ? currentNotification.message
                : "Sneha Iyer missed her 9:30 AM appointment."}
            </Typography>
            <Typography
              sx={{
                fontSize: "22px",
                color: "#9ca3af",
                cursor: "pointer",
                lineHeight: 1,
              }}
              onClick={closeNotification}
            >
              ×
            </Typography>
          </Paper>
        </Box>
      )}

      {/* ---------- DASHBOARD GRID ---------- */}
      <Box
        sx={{
          flexGrow: 1,
          display: "grid",
          gap: 3,
          px: 3,
          pb: 5,
          alignItems: "stretch",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(12, 1fr)",
          },
        }}
      >
        {/* Row 1 */}
        <Box sx={{ gridColumn: { md: "span 4" } }}>
          <ActivePatientsCard />
        </Box>
        <Box sx={{ gridColumn: { md: "span 4" } }}>
          <StressCard />
        </Box>
        <Box sx={{ gridColumn: { md: "span 4" } }}>
          <ReportsCard />
        </Box>

        {/* Row 2 */}
        <Box
          sx={{
            gridColumn: { md: "span 5", lg: "span 4" },
            aspectRatio: "1 / 1",
          }}
        >
          <Paper
            sx={{
              p: 2,
              borderRadius: "16px",
              bgcolor: "white",
              height: "100%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              background:
                "linear-gradient(135deg, #ffffff 60%, rgba(219, 234, 254, 0.5) 100%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 400, color: "#040507ff" }}
              >
                Upcoming Appointments
              </Typography>
              <MuiLink
                component={Link}
                to="/appointments"
                underline="none"
                sx={{
                  fontWeight: 400,
                  color: "primary.main",
                  fontSize: "0.875rem",
                }}
              >
                See all
              </MuiLink>
            </Box>
            <UpcomingAppointments />
          </Paper>
        </Box>

        <Box sx={{ gridColumn: { md: "span 7", lg: "span 8" } }}>
          <RecentPatientsCard />
        </Box>

        {/* Row 3 */}
        <Box sx={{ gridColumn: { md: "span 5", lg: "span 4" } }}>
          <PatientDistributionCard />
        </Box>
        <Box sx={{ gridColumn: { md: "span 7", lg: "span 8" } }}>
          <MessagesCard />
        </Box>
      </Box>
    </Box>
  );
}
