import React, { useState } from 'react';
import Dashboard from './Dashboard'; // Import the Dashboard component
import PendingList from './PendingList';
import SuccessList from './SuccessList';
import ScanQr from './ScanQr';
import BankDetails from './BankDetails';

const AdminPanel = () => {
    const [activePage, setActivePage] = useState('Dashboard'); // Set default page
    const [isSidebarVisible, setSidebarVisible] = useState(true); // State for sidebar visibility

    const renderContent = () => {
        switch (activePage) {
            case 'Dashboard':
                return <Dashboard />;
            case 'PendingList':
                return <PendingList />;
            case 'SuccessList':
                return <SuccessList />;
            case 'ScanQr':
                return <ScanQr />;
            case 'bankDetails':
                return <BankDetails />;
            default:
                return <Dashboard />;
        }
    };

    const handleNavClick = (page) => {
        setActivePage(page);
        // Hide sidebar on mobile when an item is selected
        if (window.innerWidth <= 768) {
            setSidebarVisible(false);
        }
    };

    const handleToggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#121212',
        height: '100vh',
        position: 'fixed',
        padding: '20px',
        color: '#ffffff',
        display: isSidebarVisible ? 'block' : 'none', // Conditional rendering
        transition: 'transform 0.3s ease',
        transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
        zIndex: 1000,
    };

    const mainContentStyle = {
        marginLeft: isSidebarVisible ? '270px' : '20px', // Adjust margin when sidebar is hidden
        padding: '20px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        transition: 'margin-left 0.3s ease', // Smooth transition when sidebar is toggled
    };

    const navItemStyle = {
        padding: '10px 15px',
        margin: '10px 0',
        cursor: 'pointer',
        backgroundColor: '#282828',
        borderRadius: '4px',
        color: '#ffffff',
        textAlign: 'center',
    };

    const toggleButtonStyle = {
        display: 'none',
        position: 'fixed',
        top: '20px',
        left: '20px',
        backgroundColor: '#1DB954',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        zIndex: 1100,
    };

    // Show toggle button on mobile
    if (window.innerWidth <= 768) {
        toggleButtonStyle.display = 'block';
    }

    return (
        <div>
            {/* Toggle Sidebar Button */}
            <button onClick={handleToggleSidebar} style={toggleButtonStyle}>
                {isSidebarVisible ? '☰' : '✖'}
            </button>

            {/* Sidebar */}
            <div style={sidebarStyle}>
                <h2>Admin Panel</h2>
                <div onClick={() => handleNavClick('Dashboard')} style={navItemStyle}>
                    Dashboard
                </div>
                <div onClick={() => handleNavClick('PendingList')} style={navItemStyle}>
                    Pending List
                </div>
                <div onClick={() => handleNavClick('SuccessList')} style={navItemStyle}>
                    Success List
                </div>
                <div onClick={() => handleNavClick('ScanQr')} style={navItemStyle}>
                    Scan QR
                </div>
                <div onClick={() => handleNavClick('bankDetails')} style={navItemStyle}>
                    BankDetails
                </div>
            </div>

            {/* Main Content */}
            <div style={mainContentStyle}>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPanel;
