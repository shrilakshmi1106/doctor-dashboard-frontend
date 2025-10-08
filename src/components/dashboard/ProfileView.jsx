import React from "react";

export default function ProfileView({ patient, onBack }) {
  if (!patient) return null;

  return (
    <div className="page center-page">
      <div className="profile-card">
        <h2>Patient Profile</h2>
        <img className="avatar-lg" src={patient.avatar} alt={patient.name} />
        <h3>{patient.name}</h3>
        <p className="muted">{patient.condition}</p>
        <p className="muted">More profile details go here...</p>
        <div style={{ marginTop: 16 }}>
          <button className="btn primary" onClick={onBack}>Back to Patients</button>
        </div>
      </div>
    </div>
  );
}
