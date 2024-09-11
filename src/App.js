import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
// import Login from './components/Login'; // Import the Login component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status and expiration
    const authStatus = localStorage.getItem('isAuthenticated');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (authStatus && expirationDate > new Date()) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('expirationDate');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </BrowserRouter>
  );
}

export default App;
