// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/MainPage2.css';

function MainPage2() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate('/');
        }

        fetchProducts();
    }, [navigate]);

    const fetchProducts = () => {
        let url = "https://localhost:7136/api/termekek";
        if (selectedCategory) {
            url += `?kategoriaId=${selectedCategory}`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Hiba történt a termékek betöltésekor.');
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.error('Hiba:', error));
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleFilter = () => {
        fetchProducts();
    };

    const addToCart = (termek) => {
        const mennyiseg = parseInt(prompt(`Hány darabot szeretnél rendelni a(z) ${termek.nev}-ből?`), 10);
        if (isNaN(mennyiseg) || mennyiseg <= 0) {
            alert("Érvénytelen mennyiség!");
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === termek.id);
        if (existingItem) {
            existingItem.mennyiseg += mennyiseg;
        } else {
            cart.push({ ...termek, mennyiseg });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Hozzáadva a kosárhoz!");
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        alert("Sikeres kijelentkezés!");
        navigate("/");
    };

    return (
        <div className="mainpage2-container">
            <header className="header">
                <nav>
                    <ul>
                        <li><a href="/pekseg">Főoldal</a></li>
                        <li><a href="/about">Rólunk</a></li>
                        <li><a href="/stores">Üzleteink</a></li>
                        <li><a href="/services">Szolgáltatásaink</a></li>
                    </ul>
                </nav>
                <div className="user-menu">
                    <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {username} ▼
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="/cart">Kosár</a>
                            <a href="/orders">Rendeléseim</a>
                            <a href="/profile">Adatok módosítása</a>
                            <button className="logout-btn" onClick={handleLogout}>Kijelentkezés</button>
                        </div>
                    )}
                </div>
            </header>

            <div className="content">
                <p className="intro-text">Fedezd fel a Valai Pékség friss pékáruit! Friss és ropogós!</p>
                <div className="main-layout">
                    <aside className="sidebar">
                        <h2>Kategóriák</h2>
                        <ul>
                            {[
                                { id: 1, name: "Helyben Sütött" },
                                { id: 2, name: "Pogácsa" },
                                { id: 3, name: "Kalács" },
                                { id: 4, name: "Napi Friss" },
                                { id: 5, name: "Péksütemények" },
                                { id: 6, name: "Kiflik és Zsemlék" },
                                { id: 7, name: "Szendvicsalap" },
                                { id: 8, name: "Kenyerek" }
                            ].map((category) => (
                                <li key={category.id}>
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === category.id}
                                        onChange={() => handleCategoryChange(category.id)}
                                    />
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                        <button className="filter-button" onClick={handleFilter}>Szűrés</button>
                    </aside>
                    <div className="product-list">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="product-card">
                                    <h3>{product.nev}</h3>
                                    <p>{product.ar} Ft</p>
                                    <button className="buy-button" onClick={() => addToCart(product)}>Kosárba</button>
                                </div>
                            ))
                        ) : (
                            <p>Nincs találat.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage2;
