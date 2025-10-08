// src/components/dashboard/RecentPatientsCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import RecentPatients from "./RecentPatients";
import ProfileView from "./ProfileView";
import { recentPatientsData } from "../../data";

export default function RecentPatientsCard() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleSeeAll = () => {
    navigate('/patients', { state: { view: 'all' } });
  };

  const handleViewProfile = (patient) => {
    setSelectedPatient(patient);
    setShowProfile(true);
  };

  const handleBackFromProfile = () => {
    setSelectedPatient(null);
    setShowProfile(false);
  };

  if (showProfile && selectedPatient) {
    return <ProfileView patient={selectedPatient} onBack={handleBackFromProfile} />;
  }

  return (
    <Paper 
      sx={{ 
        p: '16px', 
        borderRadius: '16px', 
        bgcolor: 'white', 
        height: '100%',
        boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <RecentPatients
        patients={recentPatientsData}
        onSeeAll={handleSeeAll}
        onViewProfile={handleViewProfile}
      />
    </Paper>
  );
}