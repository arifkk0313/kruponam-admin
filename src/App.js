import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
import ScanQr from './pages/ScanQr';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check authentication status and expiration
    const authStatus = localStorage.getItem('isAuthenticated');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const storedUserRole = localStorage.getItem('userRole');

    if (authStatus && expirationDate > new Date()) {
      setIsAuthenticated(true);
      setUserRole(storedUserRole);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userRole');
    }
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          {userRole === 'admin' && (
            <Route path="/" element={<Main />} />
          )}
          {userRole === 'scanQrOnly' && (
            <Route path="/" element={<ScanQr />} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </BrowserRouter>
  );
}

export default App;