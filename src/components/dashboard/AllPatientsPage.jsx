import React, { useMemo } from "react";

// 🔍 Search icon inline
function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="icon">
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export default function AllPatientsPage({
  patients,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  filters,
  onFilterChange,
  importantPatients,
  onToggleImportant,
  onBack,
  onViewProfile,
}) {
  // 🔹 Filtering
  const filtered = useMemo(() => {
    return patients.filter((p) => {
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return false;
      if (filters.condition && p.condition !== filters.condition) return false;
      if (filters.ageGroup && p.ageGroup !== filters.ageGroup) return false;
      if (filters.appointmentStatus && p.appointmentStatus !== filters.appointmentStatus) return false;
      if (filters.gender && p.gender !== filters.gender) return false;
      if (filters.status && p.status !== filters.status) return false;
      return true;
    });
  }, [patients, filters, searchTerm]);

  // 🔹 Sorting
  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sortBy === "Most Active") {
      copy.sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));
      copy.forEach((p, idx) => (p.isTop = idx < 3));
      return copy;
    }
    copy.forEach((p) => (p.isTop = false));
    if (sortBy === "Critical") return copy.sort((a, b) => (b.status === "critical") - (a.status === "critical"));
    if (sortBy === "Caution") return copy.sort((a, b) => (b.status === "caution") - (a.status === "caution"));
    if (sortBy === "Stable") return copy.sort((a, b) => (b.status === "stable") - (a.status === "stable"));
    if (sortBy === "Recent Patients") return copy.sort((a, b) => b.id - a.id);
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }, [filtered, sortBy]);

  // 🔹 Reset filters handler
  const handleReset = () => {
    onFilterChange({
      condition: "",
      ageGroup: "",
      appointmentStatus: "",
      gender: "",
      status: "",
    });
    onSearchChange("");
    onSortChange("Most Active");
  };

  return (
    <div className="page all-page">
      {/* 🔝 Topbar */}
      <header className="topbar">
        <div className="brand">PreSchedule</div>
        <div className="top-actions">
          <button className="icon-btn" title="Notifications">
            <img src="/icons/bell.png" alt="Notifications" className="icon-img" />
          </button>
          <button className="icon-btn" title="Search">
            <img src="/icons/search.png" alt="Search" className="icon-img" />
          </button>
          <img src="/icons/profile.png" alt="Profile" className="profile-avatar" />
        </div>
      </header>

      <div className="content">
        {/* Sidebar Filters */}
        <aside className="sidebar">
          <div className="sidebar-inner">
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="link-btn small" onClick={onBack}>
                ← Back
              </button>
            </div>

            <div className="filter-group">
              <label>Condition</label>
              <select
                value={filters.condition}
                onChange={(e) => onFilterChange({ ...filters, condition: e.target.value })}
              >
                <option value="">All</option>
                <option value="Bipolar">Bipolar</option>
                <option value="Depression">Depression</option>
                <option value="OCD">OCD</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Age group</label>
              <select
                value={filters.ageGroup}
                onChange={(e) => onFilterChange({ ...filters, ageGroup: e.target.value })}
              >
                <option value="">All</option>
                <option value="1-18">1-18</option>
                <option value="18-25">18-25</option>
                <option value="25-35">25-35</option>
                <option value="35-45">35-45</option>
                <option value="45+">45+</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Appointment Status</label>
              <select
                value={filters.appointmentStatus}
                onChange={(e) => onFilterChange({ ...filters, appointmentStatus: e.target.value })}
              >
                <option value="">All</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Gender</label>
              <select
                value={filters.gender}
                onChange={(e) => onFilterChange({ ...filters, gender: e.target.value })}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              >
                <option value="">All</option>
                <option value="stable">Stable</option>
                <option value="caution">Caution</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Apply & Reset */}
            <div className="sidebar-actions">
              <button className="btn primary" onClick={() => {}}>
                Apply
              </button>
              <button className="btn outline" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="main-area">
          <div className="search-row">
            <div className="search-input">
              <IconSearch />
              <input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            <div className="sort-row">
              <span className="muted">Sort by</span>
              <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                <option>Most Active</option>
                <option>Critical</option>
                <option>Caution</option>
                <option>Stable</option>
                <option>Recent Patients</option>
                <option>Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Patient Cards */}
          <div className="cards-list">
            {sorted.map((patient) => (
              <div className="patient-card v2" key={patient.id}>
                <div className="card-left">
                  <img className="avatar-md" src={patient.avatar} alt={patient.name} />
                  <div className="card-info">
                    <div className="patient-name">{patient.name}</div>
                    <div className="muted">{patient.title}</div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="bookmark-col">
                    <button className="icon-btn" onClick={() => onToggleImportant(patient.id)}>
                      {importantPatients[patient.id] ? (
                        <img src="/icons/bookmark-filled.png" alt="Important" className="icon-img" />
                      ) : (
                        <img src="/icons/bookmark.png" alt="Bookmark" className="icon-img" />
                      )}
                    </button>
                    {patient.isTop && <div className="top-label">TOP</div>}
                  </div>

                  <div className="meta-row">
                    <div className="meta-item"><img src="/icons/location.png" alt="Location" className="meta-icon" />{patient.location}</div>
                    <div className="meta-item"><img src="/icons/experience.png" alt="Experience" className="meta-icon" />{patient.experience}</div>
                    <div className="meta-item"><img src="/icons/phone.png" alt="Phone" className="meta-icon" />{patient.phone}</div>
                  </div>

                  <button className="btn primary" onClick={() => onViewProfile(patient)}>
                    View Medical Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
