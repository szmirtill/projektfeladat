import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/MainPage2.css';

function MainPage2() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]); // Termékek állapot

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate('/');
        }

        // 🔹 Termékek lekérése RESTful API-ból
        fetch('https://localhost:7136/api/termekek')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Hiba történt a termékek betöltésekor.');
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error('Hiba:', error));

    }, [navigate]);

    return (
        <div className="mainpage2-container">
            <header className="header">
                <nav>
                    <ul>
                        <li><a href="#about">Rólunk</a></li>
                        <li><a href="#stores">Üzleteink</a></li>
                        <li><a href="#services">Szolgáltatásaink</a></li>
                    </ul>
                </nav>
                <div className="user-menu">
                    <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {username} ▼
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="#cart">🛒 Kosár</a>
                            <a href="#edit">🔧 Adatok módosítása</a>
                            <button className="logout-btn">🚪 Kijelentkezés</button>
                        </div>
                    )}
                </div>
            </header>

            <div className="content">
                <p className="intro-text">Fedezd fel a Valai Pékség friss pékáruit!</p>
                <div className="main-layout">
                    <aside className="sidebar">
                        <h2>Kategóriák</h2>
                        <ul>
                            <li><input type="checkbox" /> Helyben Sütött</li>
                            <li><input type="checkbox" /> Pogácsa</li>
                            <li><input type="checkbox" /> Kalács</li>
                            <li><input type="checkbox" /> Napi Friss</li>
                            <li><input type="checkbox" /> Péksütemények</li>
                            <li><input type="checkbox" /> Kiflik És Zsemlék</li>
                            <li><input type="checkbox" /> Szendvicsalap</li>
                            <li><input type="checkbox" /> Kenyerek</li>
                        </ul>
                    </aside>
                    <div className="product-list">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="product-card">
                                    <img src={product.image} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>{product.price} Ft</p>
                                    <button className="buy-button">Vásárlás</button>
                                </div>
                            ))
                        ) : (
                            <p>Betöltés...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage2;
