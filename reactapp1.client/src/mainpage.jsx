// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/MainPage.css';

function MainPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7136/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ felhasznalonev: username, jelszo: password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username);
                navigate("/mainpage2");
            } else {
                const error = await response.text();
                setErrorMessage(error);
            }
        } catch (error) {
            setErrorMessage('Hálózati hiba történt: ' + error.message);
        }
    };

    const goToRegistration = () => {
        navigate('/registration');
    };

    return (
        <div className="main-page">
            <h1>Bejelentkezés</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Felhasználónév</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Jelszó</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit" className="login-btn">Bejelentkezés</button>
                <button type="button" className="register-btn" onClick={goToRegistration}>
                    Regisztráció
                </button>
            </form>
        </div>
    );
}

export default MainPage;
