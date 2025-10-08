import React from "react";

export default function RecentPatients({ onSeeAll, onViewProfile, patients }) {
  const getStatusColor = (status) => {
    if (status === "critical") return "dot-red";
    if (status === "caution") return "dot-yellow";
    if (status === "stable") return "dot-green";
    return "dot-gray";
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="recent-header">
        <h2>Recent Patients</h2>
        <button className="link-btn" onClick={onSeeAll}>
          See all
        </button>
      </div>

      <div className="recent-table" style={{ flex: 1 }}>
        {patients.map((p) => (
          <div key={p.id} className="recent-row">
            {/* Name + Avatar */}
            <div className="col-name">
              <img className="avatar-sm" src={p.avatar} alt={p.name} />
              <span>{p.name}</span>
            </div>

            {/* Disease */}
            <div className="col-disease">{p.condition}</div>

            {/* View profile */}
            <div className="col-action">
              <button className="link-btn" onClick={() => onViewProfile(p)}>
                View profile
              </button>
            </div>

            {/* Criticalness Indicator */}
            <div className="col-status">
              <span className={`status-dot ${getStatusColor(p.status)}`}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}