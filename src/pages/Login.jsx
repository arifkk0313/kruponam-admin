import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === '098890098') {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 2); // Set expiration for 2 days

            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('userRole', 'scanQrOnly');
            localStorage.setItem('expirationDate', expirationDate);

            onLogin('scanQrOnly'); // Notify the parent component with the role
        } else if (username === 'admin' && password === '321123321') {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 2);

            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('userRole', 'admin');
            localStorage.setItem('expirationDate', expirationDate);

            onLogin('admin'); // Notify the parent component with the role
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;