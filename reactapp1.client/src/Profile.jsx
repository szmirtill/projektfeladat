import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/Profile.css';

function Profile() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            navigate('/');
        } else {
            setUserId(storedUserId);
            setUsername(localStorage.getItem('username'));

            fetch(`https://localhost:7136/api/account/${storedUserId}`)
                .then(response => response.json())
                .then(data => {
                    setEmail(data.email);
                })
                .catch(error => console.error("Hiba történt az adatok betöltésekor:", error));
        }
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            setMessage('A jelszavak nem egyeznek!');
            return;
        }

        const updateData = {
            userId: parseInt(userId, 10),
            email: email,
            jelszo: newPassword ? newPassword : null
        };

        try {
            const response = await fetch('https://localhost:7136/api/account/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                setMessage('Sikeres módosítás!');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setMessage('Hiba történt a módosítás során.');
            }
        } catch (error) {
            setMessage('Hálózati hiba történt: ' + error.message);
        }
    };

    return (
        <div className="profile-page">
            <h1>Profil módosítása</h1>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Felhasználónév</label>
                    <input type="text" value={username} disabled />
                </div>
                <div className="form-group">
                    <label>Új e-mail</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Új jelszó (ha módosítani szeretnéd)</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Jelszó megerősítése</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {message && <p className="message">{message}</p>}
                <button type="submit">Módosítás</button>
            </form>
        </div>
    );
}

export default Profile;
