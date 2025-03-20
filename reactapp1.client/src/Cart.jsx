// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import './Style/Cart.css';

function Cart() {
    const [cart, setCart] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                console.error("Hibás JSON formátum a localStorage-ben!", error);
            }
        }

        const storedUser = localStorage.getItem('userId');
        if (storedUser) {
            setUserId(parseInt(storedUser, 10));
        }
    }, []);

    const handleDelete = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleModify = (id) => {
        const newQuantity = parseInt(prompt("Adja meg az új mennyiséget:"), 10);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            const updatedCart = cart.map(item =>
                item.id === id ? { ...item, mennyiseg: newQuantity } : item
            );
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            alert("Érvénytelen mennyiség!");
        }
    };

    const handlePurchase = async () => {
        if (!userId) {
            alert("Be kell jelentkezni a vásárláshoz!");
            return;
        }

        if (cart.length === 0) {
            alert("A kosár üres!");
            return;
        }

        const orderData = {
            vevo_id: userId,
            Termekek: cart.map(item => ({
                TermekId: item.id,
                Mennyiseg: item.mennyiseg,
                Ar: item.ar
            }))
        };

        try {
            const response = await fetch("https://localhost:7136/api/rendeles/mentes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert("Sikeres vásárlás! A rendelési előzmények frissültek.");
                localStorage.removeItem('cart');
                setCart([]);
            } else {
                alert("Hiba történt a rendelés során.");
            }
        } catch (error) {
            console.error("Hálózati hiba:", error);
            alert("Nem sikerült csatlakozni a szerverhez.");
        }
    };

    return (
        <div className="cart-container">
            <h2>🛒 Kosaram</h2>
            {cart.length === 0 ? (
                <p>A kosár üres.</p>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Termék neve</th>
                                <th>Mennyiség</th>
                                <th>Ár (Ft)</th>
                                <th>Törlés</th>
                                <th>Módosítás</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.nev}</td>
                                    <td>{item.mennyiseg}</td>
                                    <td>{item.ar}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)} className="edit-btn">Törlés</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleModify(item.id)} className="delete-btn">Módosítás</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Összesen: {cart.reduce((total, item) => total + item.ar * item.mennyiseg, 0)} Ft</h3>
                    <button className="buy-button" onClick={handlePurchase}>Vásárlás</button>
                </div>
            )}
        </div>
    );
}

export default Cart;
