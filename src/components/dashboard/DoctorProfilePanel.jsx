import React, { useState } from 'react';
import { ChevronRight, X, Bell, LogOut, Settings, User } from 'lucide-react';

const DoctorProfilePanel = ({ onClose, onNavigate, currentView, onLogout }) => {
  const [formData, setFormData] = useState({
    fullName: 'Dr. Aisha Verma',
    specialization: 'Pediatrics',
    dateOfBirth: '12th March 1985',
    gender: 'Female',
    phoneNumber: '9876543210',
    email: 'draishaverma@gmail.com',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '••••••••',
    newPassword: '',
    confirmPassword: '',
  });

  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');
  const [fontSize, setFontSize] = useState('Medium');
  const [dataSync, setDataSync] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: true,
    marketing: false,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.panel}>
        {/* MENU VIEW */}
        {currentView === 'menu' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileCard}>
              <img src="https://i.pravatar.cc/80?img=12" alt="Profile" style={styles.profileImage} />
              <div>
                <h2 style={styles.userName}>{formData.fullName}</h2>
                <p style={styles.specialization}>{formData.specialization}</p>
              </div>
            </div>
            <nav style={styles.menuList}>
              <button onClick={() => onNavigate('profile')} style={styles.menuItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <User size={20} />
                  <span>My profile</span>
                </div>
                <ChevronRight size={20} />
              </button>
              <button onClick={() => onNavigate('settings')} style={styles.menuItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Settings size={20} />
                  <span>Settings</span>
                </div>
                <ChevronRight size={20} />
              </button>
              <button onClick={() => onNavigate('notifications')} style={styles.menuItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Bell size={20} />
                  <span>Notifications</span>
                </div>
                <ChevronRight size={20} />
              </button>
              <button onClick={() => onNavigate('logout')} style={{ ...styles.menuItem, color: '#595959ff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <LogOut size={20} />
                  <span>Logout</span>
                </div>
                <ChevronRight size={20} />
              </button>
            </nav>
          </>
        )}

        {/* PROFILE VIEW */}
        {currentView === 'profile' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('menu')} style={styles.backButton}>
                ← Back
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <h2 style={styles.profileTitle}>My Profile</h2>
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Profile"
                style={styles.largeProfileImage}
              />
              <div style={styles.formGroup}>
                <label style={styles.label}>Full name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date of birth</label>
                <input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  style={styles.input}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone number</label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email ID</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={styles.input}
                />
              </div>
              <button style={styles.saveButton}>Save</button>
            </div>
          </>
        )}

        {/* SETTINGS VIEW */}
        {currentView === 'settings' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('menu')} style={styles.backButton}>
                ← Settings
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.settingsContent}>
              <div style={styles.settingsSection}>
                <h3 style={styles.sectionTitle}>Account</h3>
                <button onClick={() => onNavigate('changePassword')} style={styles.settingsItem}>
                  <span style={styles.settingsText}>Change password</span>
                  <ChevronRight size={18} />
                </button>
                <button onClick={() => onNavigate('language')} style={styles.settingsItem}>
                  <span style={styles.settingsText}>Preferred language</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              <div style={styles.settingsSection}>
                <h3 style={styles.sectionTitle}>App Preferences</h3>
                <button onClick={() => onNavigate('theme')} style={styles.settingsItem}>
                  <span style={styles.settingsText}>Theme</span>
                  <ChevronRight size={18} />
                </button>
                <button onClick={() => onNavigate('fontSize')} style={styles.settingsItem}>
                  <span style={styles.settingsText}>Font size & accessibility</span>
                  <ChevronRight size={18} />
                </button>
                <button onClick={() => onNavigate('dataSync')} style={styles.settingsItem}>
                  <span style={styles.settingsText}>Data sync</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              <div style={styles.settingsSection}>
                <h3 style={styles.sectionTitle}>Privacy & Security</h3>
                <button onClick={() => onNavigate('password')} style={styles.settingsItem}>
                  <span style={styles.settingsText}>Password</span>
                  <ChevronRight size={18} />
                </button>
                <button onClick={() => onNavigate('dataSharing')} style={styles.settingsItem}>
                  <span style={styles.settingsText}>Data sharing permissions</span>
                  <ChevronRight size={18} />
                </button>
                <button onClick={() => onNavigate('exportData')} style={styles.settingsItem}>
                  <span style={styles.settingsText}>Export data</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* CHANGE PASSWORD */}
        {currentView === 'changePassword' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('settings')} style={styles.backButton}>
                ← Change password
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Current Password</label>
                <input 
                  type="password" 
                  value={passwordData.currentPassword} 
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)} 
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password" 
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)} 
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm new password" 
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)} 
                  style={styles.input}
                />
              </div>
              <button style={styles.saveButton}>Save Password</button>
            </div>
          </>
        )}

        {/* LANGUAGE */}
        {currentView === 'language' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('settings')} style={styles.backButton}>
                ← Preferred language
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.input}>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Hindi</option>
                </select>
              </div>
              <button style={styles.saveButton}>Save Language</button>
            </div>
          </>
        )}

        {/* THEME */}
        {currentView === 'theme' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('settings')} style={styles.backButton}>
                ← Theme
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} style={styles.input}>
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
              <button style={styles.saveButton}>Save Theme</button>
            </div>
          </>
        )}

        {/* FONT SIZE */}
        {currentView === 'fontSize' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('settings')} style={styles.backButton}>
                ← Font size & accessibility
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Font Size</label>
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} style={styles.input}>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>Extra Large</option>
                </select>
              </div>
              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked style={styles.checkbox} />
                  <span style={styles.checkboxText}>High Contrast Mode</span>
                </label>
              </div>
              <button style={styles.saveButton}>Save Settings</button>
            </div>
          </>
        )}

        {/* DATA SYNC */}
        {currentView === 'dataSync' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('settings')} style={styles.backButton}>
                ← Data sync
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={dataSync} 
                    onChange={() => setDataSync(!dataSync)} 
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>Auto-sync data</span>
                </label>
              </div>
              <p style={styles.helperText}>Automatically sync your data across devices</p>
              <button style={styles.saveButton}>Save</button>
            </div>
          </>
        )}

        {/* PASSWORD INFO */}
        {currentView === 'password' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('settings')} style={styles.backButton}>
                ← Password
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <p style={styles.helperText}>Last changed: 30 days ago</p>
              <button 
                onClick={() => onNavigate('changePassword')} 
                style={styles.saveButton}
              >
                Change Password
              </button>
            </div>
          </>
        )}

        {/* DATA SHARING */}
        {currentView === 'dataSharing' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('settings')} style={styles.backButton}>
                ← Data sharing permissions
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked style={styles.checkbox} />
                  <span style={styles.checkboxText}>Share with healthcare providers</span>
                </label>
              </div>
              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" style={styles.checkbox} />
                  <span style={styles.checkboxText}>Share with patients</span>
                </label>
              </div>
              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" style={styles.checkbox} />
                  <span style={styles.checkboxText}>Share analytics data</span>
                </label>
              </div>
              <button style={styles.saveButton}>Save Permissions</button>
            </div>
          </>
        )}

        {/* EXPORT DATA */}
        {currentView === 'exportData' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('settings')} style={styles.backButton}>
                ← Export data
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <p style={styles.helperText}>Download all your professional data in a portable format</p>
              <button style={styles.saveButton}>Export Data (CSV)</button>
              <button style={{...styles.saveButton, backgroundColor: '#e2e8f0', color: '#2d3748', marginTop: '12px'}}>
                Export Data (PDF)
              </button>
            </div>
          </>
        )}

        {/* NOTIFICATIONS */}
        {currentView === 'notifications' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('menu')} style={styles.backButton}>
                ← Notifications
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.profileContent}>
              <div style={{...styles.checkboxGroup, paddingBottom: '16px', borderBottom: '1px solid #e2e8f0'}}>
                <label style={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={notifications.email} 
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})} 
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>Email Notifications</span>
                </label>
              </div>
              <div style={{...styles.checkboxGroup, paddingBottom: '16px', borderBottom: '1px solid #e2e8f0'}}>
                <label style={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={notifications.push} 
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})} 
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>Push Notifications</span>
                </label>
              </div>
              <div style={{...styles.checkboxGroup, paddingBottom: '16px', borderBottom: '1px solid #e2e8f0'}}>
                <label style={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={notifications.sms} 
                    onChange={(e) => setNotifications({...notifications, sms: e.target.checked})} 
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>SMS Alerts</span>
                </label>
              </div>
              <div style={{...styles.checkboxGroup, paddingBottom: '16px', borderBottom: '1px solid #e2e8f0'}}>
                <label style={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={notifications.marketing} 
                    onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})} 
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>Marketing Communications</span>
                </label>
              </div>
            </div>
          </>
        )}

        {/* LOGOUT */}
        {currentView === 'logout' && (
          <>
            <div style={styles.panelHeader}>
              <button onClick={() => onNavigate('menu')} style={styles.backButton}>
                ← Logout
              </button>
              <button onClick={onClose} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.logoutContent}>
              <h3 style={styles.logoutTitle}>Are you sure you want to logout?</h3>
              <p style={styles.logoutText}>You will be signed out of your account and returned to the login page.</p>
              <button 
                onClick={onLogout} 
                style={styles.confirmButton}
              >
                Confirm Logout
              </button>
              <button 
                onClick={() => onNavigate('menu')} 
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  panel: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '320px',
    height: '100vh',
    backgroundColor: '#fff',
    zIndex: 1000,
    overflowY: 'auto',
    boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.15)',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #e2e8f0',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    color: '#4a5568',
  },
  backButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
  },
  profileCard: {
    padding: '20px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderBottom: '1px solid #e2e8f0',
  },
  profileImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0,
  },
  userName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    margin: 0,
  },
  specialization: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#718096',
    marginTop: '4px',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 16px',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    color: '#4a5568',
    fontSize: '15px',
    fontWeight: '500',
    justifyContent: 'space-between',
  },
  profileContent: {
    padding: '20px',
  },
  profileTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '10px',
  },
  largeProfileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '24px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #cbd5e0',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  saveButton: {
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  settingsContent: {
    padding: '16px 0',
  },
  settingsSection: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    paddingLeft: '16px',
  },
  settingsItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    color: '#4a5568',
  },
  settingsText: {
    fontSize: '14px',
    fontWeight: '500',
  },
  checkboxGroup: {
    marginBottom: '16px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  checkboxText: {
    fontSize: '14px',
    color: '#4a5568',
  },
  helperText: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '20px',
  },
  logoutContent: {
    padding: '40px 20px',
    textAlign: 'center',
  },
  logoutTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '12px',
  },
  logoutText: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '24px',
  },
  confirmButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: '2px solid #3b82f6',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '12px',
  },
  cancelButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#fff',
    color: '#4a5568',
    border: '2px solid #cbd5e0',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default DoctorProfilePanel;