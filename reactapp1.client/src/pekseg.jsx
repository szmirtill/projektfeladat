// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Style/Pekseg.css";

const Pekseg = () => {
    return (
        <div className="pekseg-container">
            <header className="header">
                <nav>
                    <ul>
                        <li><a href="/about">Rólunk</a></li>
                        <li><a href="/mainpage3">Termékeink</a></li>
                        <li><a href="/stores">Üzleteink</a></li>
                        <li><a href="/services">Szolgáltatásaink</a></li>
                        <li><a href="/mainpage">Bejelentkezés</a></li>
                        <li><a href="/registration">Regisztráció</a></li>
                    </ul>
                </nav>
            </header>
            <div className="image-section">
                <div className="text-container">
                    <h1 className="text-overlay">Valai Pékség</h1>
                    <h2 className="subtitle-overlay">Kérsz egy kis fánkot?</h2>
                </div>
                <img src="/img/banner.jpg" className="banner-img" alt="Banner" />
            </div>
            <div className="layout-container">
                <article className="kedvcsinalo">
                    <div className="kedvcsinalo-content">
                        <h2>Fedezd fel kínálatunkat!</h2>
                        <img src="/img/kedvcsinalo.jpg" alt="Kedvcsináló kép" />
                        <p>Frissen sült kenyerek, és sok más finomság vár rád. Nézz körül most, és találj rá a kedvenc ízeidre! Biztos lehetsz benne, hogy kiváló minőségű pékárut találsz!</p>
                        <a href="/mainpage2" className="btn">Tovább</a>
                    </div>
                </article>
                
                <article className="szolgaltatasok">
                    <h2>Szolgáltatásaink</h2>
                    <img src="/img/szolgaltatasok.jpg" alt="Szolgáltatások kép" />
                    <p>Bankkártya elfogadó hely, ingyenes wifi használat, lehetőséget biztosítunk arra, hogy a kívánt árucikket személyesen vagy telefonon előrendeljék, ízlése szerint válogathat széles péksütemény választékunkból!</p>
                    <a href="#services" className="btn">Tovább</a>
                </article>
                <article id="rolunk">
                    <h2>Rólunk</h2>
                    <img src="/img/rolunk.jpg" alt="Rólunk kép" />
                    <p>Fedezd fel a legjobb házi készítésű kenyereket és péksüteményeket nálunk! Minden termékünk friss, helyben sütött, és a legjobb alapanyagokból készül.</p>
                    <a href="/about" className="btn">Tovább</a>
                </article>
            </div>
            
            <footer className="pekseg-footer">
                <p>&copy; 2025 Pékség</p>
                <h2>Kapcsolat</h2>
                <p>Elérhetőség: +36-30-123-4567</p>
            </footer>
        </div>
    );
};

export default Pekseg;
