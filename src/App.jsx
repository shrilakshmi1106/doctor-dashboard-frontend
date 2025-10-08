// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import theme from "./theme";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";

import RecentPatients from "./components/dashboard/RecentPatients";
import AllPatientsPage from "./components/dashboard/AllPatientsPage";
import ProfileView from "./components/dashboard/ProfileView";

import { recentPatientsData, allPatientsData } from "./data";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/patients" element={<PatientsManager />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;