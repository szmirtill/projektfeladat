/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/MainPage.css';

function MainPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
                localStorage.setItem('username', data.username); // Felhasználónév mentése
                setIsLoggedIn(true);
                setErrorMessage('');
    
                setTimeout(() => {
                    navigate("/mainpage");
                }, 500); // Késleltetett átirányítás
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
            {isLoggedIn ? (
                <div className="welcome-message">
                    <h1>Üdvözlünk, {username}!</h1>
                    <p>Bejelentkeztél a rendszerbe.</p>
                </div>
            ) : (
                <div className="login-form">
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
                                placeholder="Add meg a felhasználóneved"
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
                                placeholder="Add meg a jelszavad"
                            />
                        </div>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button type="submit">Bejelentkezés</button>
                    </form>
                    <button onClick={goToRegistration} className="register-btn">
                        Regisztráció
                    </button>
                </div>
            )}
        </div>
    );
}

export default MainPage;
