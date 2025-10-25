// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Container, Box } from "@mui/material";

import theme from "./theme";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import DoctorProfilePanel from "./components/dashboard/DoctorProfilePanel";
import Header from "./components/layout/Header.jsx";

import RecentPatients from "./components/dashboard/RecentPatients";
import AllPatientsPage from "./components/dashboard/AllPatientsPage";
import ProfileView from "./components/dashboard/ProfileView";
import PatientDistributionCard from "./components/dashboard/PatientDistributionCard";
import { recentPatientsData, allPatientsData } from "./data";

// --- PatientsManager Component ---
function PatientsManager() {
  const location = useLocation();
  const [view, setView] = useState(location.state?.view || "recent");
  const [selected, setSelected] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Most Active");
  const [filters, setFilters] = useState({
    condition: "",
    ageGroup: "",
    appointmentStatus: "",
    gender: "",
    status: "",
  });
  const [importantPatients, setImportantPatients] = useState({});

  // Update view when navigation state changes
  useEffect(() => {
    if (location.state?.view) {
      setView(location.state.view);
    }
  }, [location.state]);

  const toggleImportant = (id) => {
    setImportantPatients((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSeeAll = () => setView("all");
  const handleViewProfile = (p) => {
    setSelected(p);
    setView("profile");
  };
  const handleBack = () => {
    setSelected(null);
    setView("recent");
  };

  return (
    <div className="app-root">
      {view === "recent" && (
        <div className="center-wrapper">
          <RecentPatients
            patients={recentPatientsData}
            onSeeAll={handleSeeAll}
            onViewProfile={handleViewProfile}
          />
        </div>
      )}

      {view === "all" && (
        <AllPatientsPage
          patients={allPatientsData}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filters={filters}
          onFilterChange={setFilters}
          importantPatients={importantPatients}
          onToggleImportant={toggleImportant}
          onBack={handleBack}
          onViewProfile={handleViewProfile}
        />
      )}

      {view === "profile" && selected && (
        <ProfileView patient={selected} onBack={handleBack} />
      )}
    </div>
  );
}

// --- Main App Component ---
function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentView, setCurrentView] = useState("menu");
  const [notification, setNotification] = useState("");

  // --- Panel Controls ---
  const handleClose = () => setIsPanelOpen(false);
  const handleNavigate = (view) => setCurrentView(view);

  const handleLogout = () => {
    setIsPanelOpen(false);
    setNotification("Doctor logged out successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <CssBaseline />
        <Router>
          {/* Header always visible */}
          <Header onProfileClick={() => setIsPanelOpen(true)} />

          {/* Notification Toast */}
          {notification && (
            <div
              style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                padding: "16px 24px",
                backgroundColor: "#10b981",
                color: "#fff",
                borderRadius: "6px",
                zIndex: 2000,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {notification}
            </div>
          )}

          {/* Doctor Profile Panel */}
          {isPanelOpen && (
            <DoctorProfilePanel
              onClose={handleClose}
              onNavigate={handleNavigate}
              currentView={currentView}
              onLogout={handleLogout}
            />
          )}

          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/patients" element={<PatientsManager />} />
            {/* New Route for Patient Distribution Card */}
            <Route
              path="/patient-distribution"
              element={
                <Container sx={{ mt: 5 }}>
                  <Box sx={{ width: 500 }}>
                    <PatientDistributionCard />
                  </Box>
                </Container>
              }
            />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
