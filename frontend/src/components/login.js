import React, { useState } from 'react';
import {Navigate} from "react-router-dom";



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem('token', token);
                setResponse(response);

                console.log('Anmeldung erfolgreich', response);
            } else {
                console.log('Anmeldung fehlgeschlagen');
            }
        } catch (error) {
            console.error('Fehler bei der API-Anfrage:', error);
        }
    };

    return (
        <div>
            <div className="login-container">
                {response && (<Navigate to='/table' replace={true}></Navigate>)}
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Enter</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
