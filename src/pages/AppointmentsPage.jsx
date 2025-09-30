import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, TextField, Select, MenuItem,
    FormControl, Button, Tabs, Tab,
    Card, CardContent, Avatar,
} from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Event as EventIcon,
    Add as AddIcon,
    Person as PersonIcon,
} from '@mui/icons-material';

// Assuming Header and Footer are imported from a components folder
import Header from '../components/layout/Header'; 
import Footer from '../components/layout/Footer';

// --- Global Constants & Mock Data ---
const CUSTOM_BLUE = " #39a6e1ff ";
const HOVER_BLUE = " #3f7ad0 ";

const mockAppointments = [
    {
        id: 1,
        name: 'Jessi Singh',
        age: 32,
        gender: 'Male',
        condition: 'Bipolar',
        riskStatus: 'Critical',
        riskColor: '#f44336', // Red
        time: '9:30 am',
        date: '19/09/25',
        location: 'Pune',
        contactStatus: 'Active',
        appointmentStatus: 'Upcoming',
    },
    {
        id: 2,
        name: 'Ravya Gupta',
        age: 25,
        gender: 'Female',
        condition: 'Depression',
        riskStatus: 'Moderate',
        riskColor: '#ffeb3b', // Yellow
        time: '9:30 am',
        date: '19/09/25',
        location: 'Pune',
        contactStatus: 'Active',
        appointmentStatus: 'Upcoming',
    },
    {
        id: 3,
        name: 'Ramesh Shet',
        age: 29,
        gender: 'Male',
        condition: 'BPD',
        riskStatus: 'At-Risk',
        riskColor: '#ff9800', 
        time: '9:30 am',
        date: '19/09/25',
        location: 'Pune',
        contactStatus: 'Active',
        appointmentStatus: 'Upcoming',
    },
    {
        id: 4,
        name: 'John Wick',
        age: 40,
        gender: 'Male',
        condition: 'BPD',
        riskStatus: 'Moderate',
        riskColor: '#ffeb3b', 
        time: '9:30 am',
        date: '19/09/25',
        location: 'Delhi',
        contactStatus: 'Active',
        appointmentStatus: 'Upcoming',
    }
];

const conditions = ['Bipolar Disorder', 'PTSD', 'Depression', 'BPD', 'Anxiety', 'ADHD'];
const appointmentStatuses = ['Upcoming', 'Past', 'Completed'];
const locations = ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];
const contactStatuses = ['Active', 'At-Risk', 'Pending', 'Inactive'];

// --- Reusable Component Styles ---

const filterHeaderStyle = {
    mb: 1,
    fontWeight: 500,
    fontSize: '0.9rem',
    color: '#333'
};

const inputBaseStyle = {
    borderRadius: '6px',
    height: '40px',
    fontSize: '0.9rem',
};

const detailTextStyle = {
    fontSize: '0.85rem',
};

const flexCenter = {
    display: "flex", 
    alignItems: "center", 
    whiteSpace: 'nowrap'
};

// --- Reusable Components ---

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`appointment-tabpanel-${index}`}
            aria-labelledby={`appointment-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const CustomDetail = ({ icon: Icon, text, color }) => (
    <Box sx={flexCenter}>
        {Icon && <Icon sx={{ fontSize: 16, mr: 0.5, color: color || "#666" }} />}
        <Typography 
            variant="body2" 
            sx={{ 
                ...detailTextStyle, 
                color: color || 'text.secondary', 
                fontWeight: color ? 600 : 400 
            }}
        >
            {text}
        </Typography>
    </Box>
);

const CustomSelectField = ({ label, value, onChange, options }) => (
    <Box>
        <Typography variant="body2" sx={filterHeaderStyle}>
            {label}
        </Typography>
        <FormControl variant="outlined" fullWidth size="small">
          <Select
            value={value}
            onChange={onChange}
            displayEmpty
            sx={{
                ...inputBaseStyle,
                color: value ? 'text.primary' : 'text.secondary',
            }}
          >
            {/* Disabled MenuItem acts as the placeholder */}
            <MenuItem value="" disabled>
              Select {label}
            </MenuItem>
            {/* 'Select' option for resetting the filter (Value is an empty string for reset) */}
            <MenuItem value="">
              Select
            </MenuItem>
            {options.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
    </Box>
);

const CustomTextField = ({ label, value, onChange }) => (
    <Box>
        <Typography variant="body2" sx={filterHeaderStyle}>
            {label}
        </Typography>
        <TextField
            value={value}
            onChange={onChange}
            // KEY CHANGE: Placeholder is 'Age'
            placeholder={label === 'Age Range' ? 'Age' : label} 
            fullWidth
            size="small"
            sx={{
                '& .MuiOutlinedInput-root': inputBaseStyle
            }}
        />
    </Box>
);

function AppointmentCard({ appointment }) {
    const { name, age, gender, condition, riskStatus, riskColor, time, date } = appointment;
    const isProfilePic = appointment.profilePic;

    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: "8px",
                minHeight: 180,
                boxShadow: "0px 0.5px 4px 0px rgba(111, 111, 111, 0.1)",
                border: "1px solid #f0f0f0",
                "&:hover": {
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.08)",
                },
            }}
        >
            <CardContent sx={{ 
                p: 2.5, 
                "&:last-child": { pb: 2.5 },
                display: 'flex',
                alignItems: 'center',
            }}>
                
                {/* === LEFT COLUMN: Avatar + Name + Age (Stacked) === */}
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: 'column',
                    alignItems: "center", 
                    mr: 3, 
                    width: 100,
                    flexShrink: 0
                }}>
                    <Avatar
                        src={isProfilePic ? appointment.profilePic : ''}
                        sx={{
                            width: 60,
                            height: 60,
                            mb: 1,
                            bgcolor: isProfilePic ? 'transparent' : CUSTOM_BLUE,
                        }}
                    >
                        {!isProfilePic && <PersonIcon sx={{fontSize: 32, color: 'white'}} />}
                    </Avatar>
                    
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "1rem", lineHeight: 1.2, textAlign: 'center' }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{fontSize: '0.8rem', textAlign: 'center'}}>
                        {age}, {gender}
                    </Typography>
                </Box>

                {/* === RIGHT COLUMN: Details + Button (Stacked) */}
                <Box sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1.5 
                }}>
                    
                    {/* Details Row (Condition, Risk, Time, Date) */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Condition */}
                        <CustomDetail icon={AddIcon} text={condition} color="#333" />

                        {/* Risk (Dot + Text) - Styled inline for the dot */}
                        <Box sx={flexCenter}>
                            <Box
                                sx={{
                                    width: 8, height: 8, borderRadius: "50%",
                                    bgcolor: riskColor, mr: 0.5, flexShrink: 0
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ color: riskColor, fontWeight: 600, ...detailTextStyle }}
                            >
                                {riskStatus}
                            </Typography>
                        </Box>
                        
                        {/* Time */}
                        <CustomDetail icon={AccessTimeIcon} text={time} />

                        {/* Date */}
                        <CustomDetail icon={EventIcon} text={date} />
                    </Box>
                    
                    {/* View Profile Button */}
                   <Button
                        variant="contained"
                        sx={{
                            width: "50%",   
                            alignSelf: "flex-start", 
                            borderRadius: "6px",
                            textTransform: "none",
                            py: 1.2,
                            fontWeight: 500,
                            fontSize: "0.9rem",
                            boxShadow: "none",
                            background: CUSTOM_BLUE,
                            color: "#fff",
                            "&:hover": {
                                background: HOVER_BLUE,
                            },
                        }}
                        >
                        View Profile
                        </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

// --- Main Page Component ---

export default function AppointmentsPage() {
    const [tabValue, setTabValue] = useState(0);
    
    // Set initial filter state to empty string for all select fields
    const initialFilters = {
        condition: '',
        ageRange: '',
        appointmentStatus: '',
        location: '',
        contactStatus: ''
    };
    
    const [filters, setFilters] = useState(initialFilters);
    const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);
    
    // Filter Logic
    useEffect(() => {
        let filtered = [...mockAppointments];
        
        // 1. Filter by current tab status (primary filter)
        const currentTabStatus = appointmentStatuses[tabValue];
        filtered = filtered.filter(app => app.appointmentStatus === currentTabStatus);

        // 2. Apply secondary filters
        if (filters.condition) {
            filtered = filtered.filter(app =>
                app.condition.toLowerCase() === filters.condition.toLowerCase()
            );
        }
        if (filters.ageRange) {
             const range = filters.ageRange.toLowerCase();
             
             const [minAge, maxAge] = range.includes('+')
                ? [parseInt(range.replace('+', '').trim()), Infinity]
                : range.split('-').map(s => parseInt(s.trim()));
            
            if (!isNaN(minAge)) {
              filtered = filtered.filter(app => app.age >= minAge && (isNaN(maxAge) || maxAge === Infinity || app.age <= maxAge));
            }
        }
        if (filters.location) {
            filtered = filtered.filter(app => app.location === filters.location);
        }
        if (filters.contactStatus) {
            filtered = filtered.filter(app => app.contactStatus === filters.contactStatus);
        }
        
        setFilteredAppointments(filtered);
    }, [filters, tabValue]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        // Reset filters when changing tabs, using the reusable initialFilters object
        setFilters(initialFilters);
    };

    const handleFilterChange = (field) => (event) => {
        setFilters(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    // Explicitly re-running the filter logic (useEffect watches filters, so this triggers it)
    const handleApplyFilters = () => {
        setFilters({...filters}); 
    };

    const handleResetFilters = () => {
        setFilters(initialFilters);
    };

    // --- JSX Rendering ---
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: '#f8f8fa',
                fontFamily: 'Albert Sans, sans-serif',
                fontWeight: 400,
            }}
        >
            <Header />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    
                    {/* Filters Sidebar */}
                    <Box sx={{ width: 340, flexShrink: 0 }}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: '16px',
                                boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.1)',
                                bgcolor: 'white',
                                height: 'fit-content'
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 3,
                                    fontWeight: 600,
                                    fontSize: '1.2rem',
                                    color: '#333'
                                }}
                            >
                                Filters
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                
                                <CustomSelectField
                                    label="Condition"
                                    value={filters.condition}
                                    onChange={handleFilterChange('condition')}
                                    options={conditions}
                                />

                                <CustomTextField
                                    label="Age Range"
                                    value={filters.ageRange}
                                    onChange={handleFilterChange('ageRange')}
                                />
                                
                                <CustomSelectField
                                    label="Appointment Status"
                                    value={filters.appointmentStatus}
                                    onChange={handleFilterChange('appointmentStatus')}
                                    options={appointmentStatuses}
                                />

                                <CustomSelectField
                                    label="Location"
                                    value={filters.location}
                                    onChange={handleFilterChange('location')}
                                    options={locations}
                                />

                                <CustomSelectField
                                    label="Contact Status"
                                    value={filters.contactStatus}
                                    onChange={handleFilterChange('contactStatus')}
                                    options={contactStatuses}
                                />

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleApplyFilters}
                                        sx={{
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            height: '48px',
                                            boxShadow: 'none',
                                            background: CUSTOM_BLUE, 
                                            color: '#fff',
                                            fontWeight: 500,
                                            '&:hover': {
                                                background: HOVER_BLUE,
                                            }
                                        }}
                                    >
                                        Apply
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleResetFilters}
                                        sx={{
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            height: '48px',
                                            borderColor: '#999',
                                            color: '#555',
                                            fontWeight: 500,
                                            '&:hover': {
                                                borderColor: '#555',
                                            }
                                        }}
                                    >
                                        Reset
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                    {/* Main Content (tabs + appointment cards) */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Paper
                            sx={{
                                borderRadius: '16px',
                                boxShadow: '0px 0.5px 9px 0px rgba(111, 111, 111, 0.1)',
                                bgcolor: 'white',
                                overflow: 'hidden'
                            }}
                        >
                            
                            {/* Tabs Section */}
                            <Box sx={{ borderBottom: 1, borderColor: '#eee', p: '0 24px' }}>
                                <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    sx={{
                                        '& .MuiTab-root': {
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            fontSize: '0.95rem',
                                            px: 2,
                                            py: 1.5,
                                        },
                                        '& .Mui-selected': {
                                            color: '#4991f8 !important',
                                        },
                                        '& .MuiTabs-indicator': {
                                            height: '3px',
                                            background: '#4991f8'
                                        },
                                    }}
                                >
                                    <Tab label="Upcoming Appointments" />
                                    <Tab label="Past Appointments" />
                                    <Tab label="Completed Appointments" />
                                </Tabs>
                            </Box>

                            {/* Tab Content */}
                            <TabPanel value={tabValue} index={0}>
                                {filteredAppointments.length > 0 ? (
                                    <Box sx={{ p: 1.5 }}> 
                                        {filteredAppointments.map(appt => (
                                            <AppointmentCard key={appt.id} appointment={appt} />
                                        ))}
                                    </Box>
                                ) : (
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <Typography color="text.secondary" variant="h6">
                                            No {appointmentStatuses[tabValue].toLowerCase()} appointments found.
                                        </Typography>
                                    </Box>
                                )}
                            </TabPanel>

                            {/* Other Tab Panels (simplified for presentation) */}
                            <TabPanel value={tabValue} index={1}>
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography color="text.secondary" variant="h6">
                                        No past appointments found.
                                    </Typography>
                                </Box>
                            </TabPanel>

                            <TabPanel value={tabValue} index={2}>
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography color="text.secondary" variant="h6">
                                        No completed appointments found.
                                    </Typography>
                                </Box>
                            </TabPanel>
                        </Paper>
                    </Box>
                </Box>
            </Box>

            <Footer /> 
        </Box>
    );
}