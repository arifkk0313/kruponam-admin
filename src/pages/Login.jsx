import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const correctUsername = 'admin';
        const correctPassword = '321123321';

        if (username === correctUsername && password === correctPassword) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 2); // Set expiration for 2 days

            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('expirationDate', expirationDate);

            onLogin(); // Notify the parent component
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
