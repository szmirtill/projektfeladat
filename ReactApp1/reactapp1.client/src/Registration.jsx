// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Style/Registration.css';

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Email mező hozzáadása
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setErrorMessage('A jelszavak nem egyeznek!');
            setSuccessMessage('');
            return;
        }
    
        try {
            const response = await fetch('https://localhost:7136/api/account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    felhasznalonev: username,
                    email: email,
                    jelszo: password,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
    
                if (data.username) {
                    localStorage.setItem('username', data.username); // Felhasználónév mentése
                } else {
                    localStorage.setItem('username', username); // Ha a backend nem küldi vissza, a megadott nevet mentjük
                }
    
                console.log(`Sikeresen regisztráltál! Felhasználó ID: ${data.userId}`);
                setTimeout(() => {
                    navigate("/mainpage");
                }, 500);
    
                setErrorMessage('');
            } else {
                const error = await response.text();
                setErrorMessage(error);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Hálózati hiba történt: ' + error.message);
            setSuccessMessage('');
        }
    };
    

    return (
        <div className="registration-page">
            <h1>Regisztráció</h1>
            <form onSubmit={handleRegistration}>
                <div>
                    <label>Felhasználónév</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Jelszó</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Jelszó megerősítése</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit">Regisztráció</button>
            </form>
        </div>
    );
}

export default Registration;
